#!/bin/bash
# deploy_commands.sh - Script para desplegar la aplicación en el entorno remoto

# Parámetros configurables
DEPLOYMENT_ENV=${1:-dev}  # Por defecto 'dev' si no se especifica
REMOTE_DIR="/home/ubuntu/v30"
K8S_TEMP_DIR="$REMOTE_DIR/k8s-temp"
MANIFEST_FILE=""

# Buscar el manifiesto en varias ubicaciones posibles
echo "Buscando manifiesto Kubernetes..."

# Lista de posibles ubicaciones del manifiesto, en orden de preferencia
POSSIBLE_LOCATIONS=(
  "$K8S_TEMP_DIR/vucem-microfrontends.yaml"
  "$K8S_TEMP_DIR/k8s-$DEPLOYMENT_ENV/vucem-microfrontends.yaml"
  "$REMOTE_DIR/k8s-$DEPLOYMENT_ENV/vucem-microfrontends.yaml"
  "$REMOTE_DIR/k8s/vucem-microfrontends.yaml"
  "$K8S_TEMP_DIR/vucem-microfrontends-$DEPLOYMENT_ENV.yaml"
)

# Mostrar todas las ubicaciones que se van a buscar
echo "Posibles ubicaciones del manifiesto:"
for location in "${POSSIBLE_LOCATIONS[@]}"; do
  echo "- $location"
done

# Buscar el manifiesto en las ubicaciones posibles
for location in "${POSSIBLE_LOCATIONS[@]}"; do
  if [ -f "$location" ]; then
    MANIFEST_FILE="$location"
    echo "Manifiesto encontrado en: $MANIFEST_FILE"
    break
  fi
done

# Si no se encontró, imprimir el contenido del directorio para depurar
if [ -z "$MANIFEST_FILE" ]; then
  echo "No se encontró el manifiesto en las ubicaciones predefinidas."
  echo "Contenido de $K8S_TEMP_DIR:"
  ls -la "$K8S_TEMP_DIR"
  
  # Buscar más exhaustivamente
  echo "Buscando manifiestos en todas las ubicaciones posibles..."
  FOUND_FILES=$(find "$REMOTE_DIR" -name "vucem-microfrontends*.yaml" 2>/dev/null)
  
  if [ -n "$FOUND_FILES" ]; then
    echo "Se encontraron posibles manifiestos de Kubernetes:"
    echo "$FOUND_FILES"
    
    # Intentar usar el primer archivo encontrado
    FIRST_FILE=$(echo "$FOUND_FILES" | head -1)
    echo "Intentando usar: $FIRST_FILE"
    MANIFEST_FILE="$FIRST_FILE"
    
    # Verificar que sea un archivo válido de Kubernetes
    if grep -q "apiVersion" "$MANIFEST_FILE" && grep -q "kind" "$MANIFEST_FILE"; then
      echo "El archivo parece ser un manifiesto de Kubernetes válido. Procediendo con el despliegue."
    else
      echo "El archivo encontrado no parece ser un manifiesto de Kubernetes válido."
      exit 1
    fi
  else
    echo "No se encontraron archivos de manifiesto en todo el directorio."
    exit 1
  fi
fi

# Mostrar información sobre el manifiesto
echo "Utilizando manifiesto: $MANIFEST_FILE"
if [ -f "$MANIFEST_FILE" ]; then
  echo "El archivo existe y su tamaño es: $(du -h "$MANIFEST_FILE" | cut -f1)"
  echo "Primeras líneas del manifiesto:"
  head -10 "$MANIFEST_FILE"
else
  echo "ADVERTENCIA: A pesar de la verificación previa, el archivo no existe."
  exit 1
fi

# Crear directorio para logs de despliegue
LOG_DIR="$REMOTE_DIR/deployment-logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/deploy-$DEPLOYMENT_ENV-$(date +%Y%m%d-%H%M%S).log"

# Función para mostrar mensajes de ayuda
show_help() {
  echo "Uso: $0 [ENTORNO]"
  echo ""
  echo "ENTORNO puede ser:"
  echo "  dev       (predeterminado)"
  echo "  staging"
  echo "  prod"
  echo ""
  echo "Ejemplo: $0 staging"
  exit 0
}

# Procesar opciones
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  show_help
fi

# Validar el entorno
if [[ "$DEPLOYMENT_ENV" != "dev" && "$DEPLOYMENT_ENV" != "staging" && "$DEPLOYMENT_ENV" != "prod" ]]; then
  echo "Error: Entorno no válido. Debe ser 'dev', 'staging' o 'prod'."
  show_help
fi

echo "=== Iniciando despliegue en entorno: $DEPLOYMENT_ENV ==="

# Navegación al directorio de trabajo
echo "Cambiando al directorio: $REMOTE_DIR"
cd $REMOTE_DIR || { echo "Error: No se pudo cambiar al directorio $REMOTE_DIR"; exit 1; }

# Crear directorios necesarios
echo "Creando directorio temporal para manifiestos..."
mkdir -p "$K8S_TEMP_DIR"

# Verificar namespace de Kubernetes
echo "Verificando namespace vucem-$DEPLOYMENT_ENV..."
microk8s kubectl get namespace vucem-$DEPLOYMENT_ENV >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Creando namespace vucem-$DEPLOYMENT_ENV..."
  microk8s kubectl create namespace vucem-$DEPLOYMENT_ENV
fi

# Verificar secreto de registro de imágenes
echo "Verificando secreto para pull de imágenes..."
microk8s kubectl get secret vucem30registrykey -n vucem-$DEPLOYMENT_ENV >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Creando secreto vucem30registrykey en el namespace vucem-$DEPLOYMENT_ENV..."
  microk8s kubectl create secret docker-registry vucem30registrykey \
    --docker-server=ghcr.io \
    --docker-username=vucem30-dev \
    --docker-password=${GITHUB_TOKEN} \
    --docker-email=admin@vucem.com \
    -n vucem-$DEPLOYMENT_ENV
  
  if [ $? -ne 0 ]; then
    echo "ADVERTENCIA: No se pudo crear el secreto automáticamente."
    echo "El despliegue podría fallar. Cree el secreto manualmente con:"
    echo "kubectl create secret docker-registry vucem30registrykey \\"
    echo "  --docker-server=ghcr.io \\"
    echo "  --docker-username=USUARIO \\"
    echo "  --docker-password=TOKEN \\"
    echo "  --docker-email=EMAIL \\"
    echo "  -n vucem-$DEPLOYMENT_ENV"
  else
    echo "Secreto creado correctamente."
  fi
fi

# Verificar si encontramos el manifiesto
if [ -z "$MANIFEST_FILE" ]; then
  echo "Error: No se pudo encontrar el archivo de manifiesto vucem-microfrontends.yaml"
  echo "Ubicaciones buscadas:"
  echo "- $K8S_TEMP_DIR/vucem-microfrontends.yaml"
  echo "- $K8S_TEMP_DIR/k8s-$DEPLOYMENT_ENV/vucem-microfrontends.yaml"
  echo "- $REMOTE_DIR/k8s-$DEPLOYMENT_ENV/vucem-microfrontends.yaml"
  
  # Buscar posibles manifiestos en otras ubicaciones
  echo "Buscando manifiestos en otras ubicaciones..."
  find "$REMOTE_DIR" -name "vucem-microfrontends.yaml" 2>/dev/null
  
  exit 1
fi

# Crear una copia temporal del manifiesto para procesarlo
TMP_MANIFEST="$K8S_TEMP_DIR/tmp-manifest-$DEPLOYMENT_ENV.yaml"
cp "$MANIFEST_FILE" "$TMP_MANIFEST"

# Reemplazar variables del entorno en el manifiesto
sed -i "s/\${ENV}/$DEPLOYMENT_ENV/g" "$TMP_MANIFEST"
sed -i "s/\${REGISTRY}/ghcr.io\/vucem30-dev\/frontend/g" "$TMP_MANIFEST"
sed -i "s/\${TAG}/$DEPLOYMENT_ENV/g" "$TMP_MANIFEST"
sed -i "s/\${REPLICAS}/1/g" "$TMP_MANIFEST"
sed -i "s/\${MIN_REPLICAS}/1/g" "$TMP_MANIFEST"
sed -i "s/\${MAX_REPLICAS}/3/g" "$TMP_MANIFEST"

# Eliminar la anotación conflictiva del Ingress
sed -i '/kubernetes.io\/ingress.class/d' "$TMP_MANIFEST"

# Aplicar manifiesto con validación previa
echo "Validando manifiesto Kubernetes desde: $TMP_MANIFEST" | tee -a "$LOG_FILE"
microk8s kubectl apply --validate=true --dry-run=client -f "$TMP_MANIFEST" | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
  echo "Error: Falló la validación del manifiesto Kubernetes." | tee -a "$LOG_FILE"
  exit 1
fi

# Aplicar manifiesto
echo "Aplicando manifiesto Kubernetes desde: $TMP_MANIFEST" | tee -a "$LOG_FILE"
microk8s kubectl apply -f "$TMP_MANIFEST" | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
  echo "Error: Falló la aplicación del manifiesto Kubernetes." | tee -a "$LOG_FILE"
  exit 1
fi

# Reiniciar despliegue para aplicar cambios
echo "Reiniciando deployment vucem-microfrontends-$DEPLOYMENT_ENV..." | tee -a "$LOG_FILE"
microk8s kubectl rollout restart deployment vucem-microfrontends-$DEPLOYMENT_ENV -n vucem-$DEPLOYMENT_ENV | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
  echo "Error: Falló el reinicio del deployment." | tee -a "$LOG_FILE"
  exit 1
fi

# Verificar estado del despliegue
echo "=== Verificando estado del despliegue ===" | tee -a "$LOG_FILE"
echo "Pods en el namespace vucem-$DEPLOYMENT_ENV:" | tee -a "$LOG_FILE"
microk8s kubectl get pods -n vucem-$DEPLOYMENT_ENV | grep vucem-microfrontends | tee -a "$LOG_FILE"

echo "Información del deployment:" | tee -a "$LOG_FILE"
microk8s kubectl get deployment vucem-microfrontends-$DEPLOYMENT_ENV -n vucem-$DEPLOYMENT_ENV | tee -a "$LOG_FILE"

# Verificar los servicios
echo "Información de servicios:" | tee -a "$LOG_FILE"
microk8s kubectl get services -n vucem-$DEPLOYMENT_ENV | grep -v kubernetes | tee -a "$LOG_FILE"

# Verificar ingress
echo "Información de ingress:" | tee -a "$LOG_FILE"
microk8s kubectl get ingress -n vucem-$DEPLOYMENT_ENV | tee -a "$LOG_FILE"

# Esperar a que el despliegue esté disponible
echo "Esperando a que el despliegue esté disponible..." | tee -a "$LOG_FILE"
microk8s kubectl rollout status deployment/vucem-microfrontends-$DEPLOYMENT_ENV -n vucem-$DEPLOYMENT_ENV --timeout=180s | tee -a "$LOG_FILE"

# Verificar readiness/liveness de los pods
echo "Verificando estado de readiness/liveness de los pods:" | tee -a "$LOG_FILE"
POD_NAMES=$(microk8s kubectl get pods -n vucem-$DEPLOYMENT_ENV -l app=vucem-microfrontends -o name | head -1)
if [ -n "$POD_NAMES" ]; then
  microk8s kubectl describe $POD_NAMES -n vucem-$DEPLOYMENT_ENV | grep -A 5 "Readiness\|Liveness" | tee -a "$LOG_FILE"
fi

echo "=== Despliegue completado ===" | tee -a "$LOG_FILE"
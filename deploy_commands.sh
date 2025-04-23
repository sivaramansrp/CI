#!/bin/bash
# deploy_commands.sh - Script para desplegar la aplicación en el entorno remoto

# Parámetros configurables
DEPLOYMENT_ENV=${1:-dev}  # Por defecto 'dev' si no se especifica
REMOTE_DIR="/home/ubuntu/v30"
K8S_TEMP_DIR="$REMOTE_DIR/k8s-temp"

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
  echo "ADVERTENCIA: El secreto vucem30registrykey no existe en el namespace vucem-$DEPLOYMENT_ENV."
  echo "El despliegue podría fallar. Cree el secreto con:"
  echo "kubectl create secret docker-registry vucem30registrykey \\"
  echo "  --docker-server=ghcr.io \\"
  echo "  --docker-username=USUARIO \\"
  echo "  --docker-password=TOKEN \\"
  echo "  --docker-email=EMAIL \\"
  echo "  -n vucem-$DEPLOYMENT_ENV"
fi

# Aplicar manifiesto
echo "Aplicando manifiesto Kubernetes..."
microk8s kubectl apply -f "$K8S_TEMP_DIR/vucem-microfrontends.yaml"
if [ $? -ne 0 ]; then
  echo "Error: Falló la aplicación del manifiesto Kubernetes."
  exit 1
fi

# Reiniciar despliegue para aplicar cambios
echo "Reiniciando deployment vucem-microfrontends-$DEPLOYMENT_ENV..."
microk8s kubectl rollout restart deployment vucem-microfrontends-$DEPLOYMENT_ENV -n vucem-$DEPLOYMENT_ENV
if [ $? -ne 0 ]; then
  echo "Error: Falló el reinicio del deployment."
  exit 1
fi

# Verificar estado del despliegue
echo "=== Verificando estado del despliegue ==="
echo "Pods en el namespace vucem-$DEPLOYMENT_ENV:"
microk8s kubectl get pods -n vucem-$DEPLOYMENT_ENV | grep vucem-microfrontends

echo "Información del deployment:"
microk8s kubectl get deployment vucem-microfrontends-$DEPLOYMENT_ENV -n vucem-$DEPLOYMENT_ENV

# Esperar a que el despliegue esté disponible (opcional)
echo "Esperando a que el despliegue esté disponible..."
microk8s kubectl rollout status deployment/vucem-microfrontends-$DEPLOYMENT_ENV -n vucem-$DEPLOYMENT_ENV --timeout=120s

echo "=== Despliegue completado ==="
#!/bin/bash

# Este script actualiza el archivo deploy_commands.sh original con los parches necesarios
# para solucionar los problemas de despliegue

if [ ! -f "deploy_commands.sh" ]; then
  echo "ERROR: No se encontró el archivo deploy_commands.sh"
  exit 1
fi

# Crea una copia de seguridad
cp deploy_commands.sh deploy_commands.sh.bak

# Buscar líneas problemáticas
LINE_APP_MANIFEST=$(grep -n "# Aplicar manifiesto con validación previa" deploy_commands.sh | cut -d':' -f1)
LINE_APP_MANIFEST_SIMPLE=$(grep -n "# Aplicar manifiesto" deploy_commands.sh | cut -d':' -f1)

if [ -n "$LINE_APP_MANIFEST" ]; then
  echo "Insertando código para procesar el manifiesto en la línea: $LINE_APP_MANIFEST"
else
  echo "No se pudo encontrar la línea '# Aplicar manifiesto con validación previa'"
  exit 1
fi

# Modificación 1: Añadir soporte para la creación del secreto con GITHUB_TOKEN
sed -i '/microk8s kubectl get secret vucem30registrykey -n vucem-$DEPLOYMENT_ENV/,/fi/c\
microk8s kubectl get secret vucem30registrykey -n default >/dev/null 2>&1\
if [ $? -ne 0 ]; then\
  echo "Creando secreto vucem30registrykey en el namespace default..."\
  \
  # Si GITHUB_TOKEN está disponible, usarlo para crear el secreto\
  if [ -n "${GITHUB_TOKEN}" ]; then\
    microk8s kubectl create secret docker-registry vucem30registrykey \\\
      --docker-server=ghcr.io \\\
      --docker-username=vucem30-dev \\\
      --docker-password=${GITHUB_TOKEN} \\\
      --docker-email=admin@vucem.com \\\
      -n default\
    \
    if [ $? -ne 0 ]; then\
      echo "ADVERTENCIA: No se pudo crear el secreto automáticamente."\
      echo "El despliegue podría fallar. Cree el secreto con:"\
      echo "kubectl create secret docker-registry vucem30registrykey \\\\"\
      echo "  --docker-server=ghcr.io \\\\"\
      echo "  --docker-username=USUARIO \\\\"\
      echo "  --docker-password=TOKEN \\\\"\
      echo "  --docker-email=EMAIL \\\\"\
      echo "  -n default"\
    else\
      echo "Secreto creado correctamente."\
    fi\
  else\
    echo "ADVERTENCIA: El secreto vucem30registrykey no existe en el namespace default."\
    echo "El despliegue podría fallar. Cree el secreto con:"\
    echo "kubectl create secret docker-registry vucem30registrykey \\\\"\
    echo "  --docker-server=ghcr.io \\\\"\
    echo "  --docker-username=USUARIO \\\\"\
    echo "  --docker-password=TOKEN \\\\"\
    echo "  --docker-email=EMAIL \\\\"\
    echo "  -n default"\
  fi\
fi' deploy_commands.sh

# Modificación 2: Modificar el proceso de despliegue para forzar la actualización de pods
sed -i '/^# Aplicar manifiesto con validación previa$/i\
# Crear una copia temporal del manifiesto para procesarlo\
TMP_MANIFEST="$K8S_TEMP_DIR/tmp-manifest-$DEPLOYMENT_ENV.yaml"\
cp "$MANIFEST_FILE" "$TMP_MANIFEST"\
\
# Procesar el archivo de manifiesto para actualizar las imágenes\
echo "Procesando manifiesto para asegurar la actualización de pods..."\
\
# Agregar una anotación con timestamp para forzar la actualización\
TIMESTAMP=$(date +%s)\
sed -i "s/metadata:\\n  labels:/metadata:\\n  annotations:\\n    kubernetes.io\\/change-cause: \"Deployment update $TIMESTAMP\"\\n  labels:/g" "$TMP_MANIFEST"\
\
# Eliminar la anotación conflictiva del Ingress si existe\
sed -i \'/kubernetes.io\\/ingress.class/d\' "$TMP_MANIFEST"\
\
' deploy_commands.sh

# Modificación 3: Verificar el despliegue con un rollout status
sed -i '/microk8s kubectl apply -f/a\
\
# Verificar el despliegue\
echo "Verificando estado del despliegue..."\
DEPLOYMENT_NAME="vucem-microfrontends-$DEPLOYMENT_ENV"\
\
# Verificar si existe el deployment\
if microk8s kubectl get deployment $DEPLOYMENT_NAME -n default >/dev/null 2>&1; then\
  echo "Esperando que el despliegue $DEPLOYMENT_NAME se complete..."\
  microk8s kubectl rollout status deployment/$DEPLOYMENT_NAME -n default --timeout=5m\
  \
  if [ $? -eq 0 ]; then\
    echo "Despliegue completado exitosamente."\
    # Para forzar un reinicio de pods si es necesario\
    echo "Reiniciando pods para asegurar la actualización..."\
    microk8s kubectl rollout restart deployment/$DEPLOYMENT_NAME -n default\
    microk8s kubectl rollout status deployment/$DEPLOYMENT_NAME -n default --timeout=5m\
  else\
    echo "ADVERTENCIA: El despliegue no se completó dentro del tiempo esperado."\
    echo "Verificar manualmente el estado con: kubectl get pods -n default"\
  fi\
else\
  echo "El deployment $DEPLOYMENT_NAME no existe todavía, este podría ser el despliegue inicial."\
fi\
' deploy_commands.sh

# Modificación 4: Usar el archivo temporal para el despliegue
sed -i 's/microk8s kubectl apply -f "$MANIFEST_FILE"/microk8s kubectl apply -f "$TMP_MANIFEST"/g' deploy_commands.sh
sed -i 's/microk8s kubectl apply --validate=true --dry-run=client -f "$MANIFEST_FILE"/microk8s kubectl apply --validate=true --dry-run=client -f "$TMP_MANIFEST"/g' deploy_commands.sh

# Corregir potenciales errores de sintaxis
# Buscar y arreglar código incorrecto
sed -i 's/if.*fi$/fi/g' deploy_commands.sh

echo "Script deploy_commands.sh actualizado con éxito."
echo "Se ha creado una copia de seguridad en deploy_commands.sh.bak"

# Agregar código para buscar el manifiesto Kubernetes
echo "Buscando manifiesto Kubernetes..."
echo "Posibles ubicaciones del manifiesto:"
echo "- /home/*/v30/k8s-temp/vucem-microfrontends.yaml"
echo "- /home/*/v30/k8s-temp/k8s-dev/vucem-microfrontends.yaml"
echo "- /home/*/v30/k8s-dev/vucem-microfrontends.yaml"
echo "- /home/*/v30/k8s/vucem-microfrontends.yaml"
echo "- /home/*/v30/k8s-temp/vucem-microfrontends-dev.yaml"

# Buscar el archivo de manifiesto
MANIFEST_FILE=""
for path in "/home/*/v30/k8s-temp/vucem-microfrontends.yaml" "/home/*/v30/k8s-temp/k8s-dev/vucem-microfrontends.yaml" "/home/*/v30/k8s-dev/vucem-microfrontends.yaml" "/home/*/v30/k8s/vucem-microfrontends.yaml" "/home/*/v30/k8s-temp/vucem-microfrontends-dev.yaml"; do
    files=$(find $path 2>/dev/null)
    if [ -n "$files" ]; then
        MANIFEST_FILE=$(echo "$files" | head -1)
        break
    fi
done

if [ -n "$MANIFEST_FILE" ]; then
    echo "Manifiesto encontrado en: $MANIFEST_FILE"
    echo "Utilizando manifiesto: $MANIFEST_FILE"
    
    # Verificar si el archivo existe y mostrar su tamaño
    if [ -f "$MANIFEST_FILE" ]; then
        echo "El archivo existe y su tamaño es: $(du -h "$MANIFEST_FILE" | cut -f1)"
        echo "Primeras líneas del manifiesto:"
        head -10 "$MANIFEST_FILE"
    else
        echo "ADVERTENCIA: El archivo no existe o no es accesible"
    fi
else
    echo "No se encontró ningún archivo de manifiesto en las rutas buscadas"
fi
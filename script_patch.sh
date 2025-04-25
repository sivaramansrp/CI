#!/bin/bash

# Este script actualiza el archivo deploy_commands.sh original con los parches necesarios
# para solucionar los problemas de despliegue

if [ ! -f "deploy_commands.sh" ]; then
  echo "ERROR: No se encontró el archivo deploy_commands.sh"
  exit 1
fi

# Crea una copia de seguridad
cp deploy_commands.sh deploy_commands.sh.bak

# Modificación 1: Añadir soporte para la creación del secreto con GITHUB_TOKEN
sed -i '/microk8s kubectl get secret vucem30registrykey -n vucem-$DEPLOYMENT_ENV/,/fi/c\
microk8s kubectl get secret vucem30registrykey -n vucem-$DEPLOYMENT_ENV >/dev/null 2>&1\
if [ $? -ne 0 ]; then\
  echo "Creando secreto vucem30registrykey en el namespace vucem-$DEPLOYMENT_ENV..."\
  \
  # Si GITHUB_TOKEN está disponible, usarlo para crear el secreto\
  if [ -n "${GITHUB_TOKEN}" ]; then\
    microk8s kubectl create secret docker-registry vucem30registrykey \\\
      --docker-server=ghcr.io \\\
      --docker-username=vucem30-dev \\\
      --docker-password=${GITHUB_TOKEN} \\\
      --docker-email=admin@vucem.com \\\
      -n vucem-$DEPLOYMENT_ENV\
    \
    if [ $? -ne 0 ]; then\
      echo "ADVERTENCIA: No se pudo crear el secreto automáticamente."\
      echo "El despliegue podría fallar. Cree el secreto con:"\
      echo "kubectl create secret docker-registry vucem30registrykey \\\\"\
      echo "  --docker-server=ghcr.io \\\\"\
      echo "  --docker-username=USUARIO \\\\"\
      echo "  --docker-password=TOKEN \\\\"\
      echo "  --docker-email=EMAIL \\\\"\
      echo "  -n vucem-$DEPLOYMENT_ENV"\
    else\
      echo "Secreto creado correctamente."\
    fi\
  else\
    echo "ADVERTENCIA: El secreto vucem30registrykey no existe en el namespace vucem-$DEPLOYMENT_ENV."\
    echo "El despliegue podría fallar. Cree el secreto con:"\
    echo "kubectl create secret docker-registry vucem30registrykey \\\\"\
    echo "  --docker-server=ghcr.io \\\\"\
    echo "  --docker-username=USUARIO \\\\"\
    echo "  --docker-password=TOKEN \\\\"\
    echo "  --docker-email=EMAIL \\\\"\
    echo "  -n vucem-$DEPLOYMENT_ENV"\
  fi\
fi' deploy_commands.sh

# Modificación 2: Añadir el procesamiento del manifiesto eliminando la anotación conflictiva
# Crear un nuevo bloque después de validar el archivo de manifiesto
sed -i '/Aplicar manifiesto/i\
# Crear una copia temporal del manifiesto para procesarlo\
TMP_MANIFEST="$K8S_TEMP_DIR/tmp-manifest-$DEPLOYMENT_ENV.yaml"\
cp "$MANIFEST_FILE" "$TMP_MANIFEST"\
\
# Eliminar la anotación conflictiva del Ingress\
sed -i \'/kubernetes.io\\/ingress.class/d\' "$TMP_MANIFEST"\
\
' deploy_commands.sh

# Modificación 3: Usar el archivo temporal para el despliegue
sed -i 's/microk8s kubectl apply -f "$MANIFEST_FILE"/microk8s kubectl apply -f "$TMP_MANIFEST"/g' deploy_commands.sh
sed -i 's/microk8s kubectl apply --validate=true --dry-run=client -f "$MANIFEST_FILE"/microk8s kubectl apply --validate=true --dry-run=client -f "$TMP_MANIFEST"/g' deploy_commands.sh

echo "Script deploy_commands.sh actualizado con éxito."
echo "Se ha creado una copia de seguridad en deploy_commands.sh.bak"
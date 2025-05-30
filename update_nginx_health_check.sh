#!/bin/bash

# Script para añadir o actualizar configuraciones de health check en archivos nginx.conf
# Añade soporte tanto para /health como para /health.txt mediante una expresión regular

echo "Iniciando actualización de configuraciones health check en nginx.conf..."

# Crear directorio para respaldos
BACKUP_DIR="/Users/oscarvalois/Documents/GitHub/frontend/nginx_backups_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Backups de archivos originales en: $BACKUP_DIR"

# El bloque de health check a insertar
HEALTH_CHECK_BLOCK="        # Health check para Docker y Kubernetes\n        location ~ ^\/health(\\.txt)?$ {\n            access_log off;\n            add_header Content-Type text\/plain;\n            return 200 'OK';\n        }\n"

# Encontrar todos los archivos nginx.conf
NGINX_FILES=$(find /Users/oscarvalois/Documents/GitHub/frontend -name "nginx.conf")

for file in $NGINX_FILES; do
    echo "Procesando: $file"
    
    # Verificar si el archivo ya tiene una configuración de health check
    if grep -q "location.*health" "$file"; then
        # Ya tiene alguna configuración de health check
        if grep -q "location ~ \^/health(\\.txt)?\\$" "$file" || grep -q "location = /health.txt" "$file"; then
            echo "  ✅ Ya tiene configuración compatible con health.txt"
            
            # Si tiene el patrón antiguo location = /health.txt, actualizarlo
            if grep -q "location = /health.txt" "$file"; then
                echo "  🔄 Actualizando de health.txt específico a patrón regexp"
                cp "$file" "${BACKUP_DIR}/$(basename "$file").bak"
                sed -i '' 's/location = \/health\.txt {/location ~ ^\/health(\\.txt)?$ {/' "$file"
                echo "  ✅ Actualizado a patrón regexp"
            fi
            
            # Si tiene el patrón antiguo location = /health, actualizarlo
            if grep -q "location = /health" "$file"; then
                echo "  🔄 Actualizando de health específico a patrón regexp"
                cp "$file" "${BACKUP_DIR}/$(basename "$file").bak"
                sed -i '' 's/location = \/health {/location ~ ^\/health(\\.txt)?$ {/' "$file"
                echo "  ✅ Actualizado a patrón regexp"
            fi
        else
            echo "  ⚠️ Tiene configuración de health pero con formato diferente"
        fi
    else
        # No tiene ninguna configuración de health, crearemos una copia de seguridad
        echo "  ⚠️ No tiene configuración de health"
        cp "$file" "${BACKUP_DIR}/$(basename "$file").bak"
        
        # Buscar el patrón location / { para insertar antes
        if grep -q "location / {" "$file"; then
            echo "  🔄 Insertando configuración antes de 'location / {'"
            sed -i '' "/location \/ {/i\\
${HEALTH_CHECK_BLOCK}
" "$file"
            echo "  ✅ Configuración insertada"
        # Si no hay 'location / {', buscar dónde termina el bloque server
        elif grep -q "server {" "$file"; then
            echo "  🔄 Insertando configuración dentro del bloque server"
            # Buscar el final del bloque server y insertar antes
            line_num=$(grep -n "server {" "$file" | head -1 | cut -d: -f1)
            if [ -n "$line_num" ]; then
                # Buscar la siguiente llave de cierre que pertenezca al servidor
                sed -i '' "${line_num}s/server {/server {\n${HEALTH_CHECK_BLOCK}/" "$file"
                echo "  ✅ Configuración insertada al inicio del bloque server"
            else
                echo "  ❌ No se pudo encontrar un lugar adecuado para insertar la configuración"
            fi
        else
            echo "  ❌ Estructura de archivo no reconocida, no se pueden realizar cambios"
        fi
    fi
    
    echo ""
done

echo "📋 Resumen de la operación:"
echo "  - Archivos procesados: $(echo "$NGINX_FILES" | wc -l | xargs)"
echo "  - Copias de seguridad creadas en: $BACKUP_DIR"
echo "  - Se ha agregado soporte para health check con patrón ^/health(\.txt)?$"
echo ""
echo "✅ Proceso completado"

# Crear archivo health.txt en todos los directorios src
echo "Creando archivos health.txt en todos los directorios src..."
# Lista de directorios de apps con nombres homologados
APPS=(
  "aga"
  "agace"
  "agricultura"
  "amecafe"
  "bandejas"
  "cofepris"
  "crt"
  "dashboard"
  "funcionario"
  "inah" 
  "inbal"
  "login"
  "profepa"
  "se"
  "sedena"
  "semarnat"
  "sener"
  "stps"
)

# Crear health.txt para cada app con el nombre correcto
for app in "${APPS[@]}"; do
    app_dir="/Users/oscarvalois/Documents/GitHub/frontend/apps/${app}/"
    health_file="${app_dir}src/health.txt"
    mkdir -p "$(dirname "$health_file")"
    echo "OK" > "$health_file"
    echo "✅ Creado: $health_file (app homologada: ${app})"
done

echo "Todos los archivos health.txt han sido creados."
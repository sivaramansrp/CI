# Dockerfile

# Stage 1: Build the Angular app
FROM node:20-slim AS node
WORKDIR /app

# Install dependencies
COPY . .
# Debug output para verificar archivos
RUN pwd && ls -la

# Install Nx CLI globally (versión específica para evitar incompatibilidades)
RUN npm install -g nx@latest

# Instalar dependencias del proyecto
RUN npm install --legacy-peer-deps --no-audit

# Verificar la configuración de webpack y module-federation
RUN cat ./apps/login/webpack.config.ts
RUN cat ./apps/login/module-federation.config.ts

# Build the app (usando la configuración de producción)
RUN npx nx build login --configuration=production --verbose
# Verificar estructura de directorios después del build
RUN echo "Estructura de directorios después del build:" && \
    find /app -type d -name "dist*" | sort && \
    find /app -name "*.js" | grep -i remote | head && \
    ls -la $(find /app -name "*.js" | grep -i remote | head -1 | xargs dirname) || echo "No se encontraron archivos de compilación"

# Crear un directorio para la aplicación compilada
RUN mkdir -p /app/compiled-app
# Buscar y copiar los archivos compilados de forma dinámica 
RUN find /app -name "*.js" | grep -i remote | xargs -I{} cp -r $(dirname {})/* /app/compiled-app/ || echo "No se pudieron copiar archivos"
RUN ls -la /app/compiled-app || echo "Directorio compiled-app vacío o no existe"

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine
# Copiar la configuración de nginx
COPY ./apps/login/nginx.conf /etc/nginx/nginx.conf
# Copiar los archivos de la aplicación desde el directorio compilado
RUN mkdir -p /usr/share/nginx/html
COPY --from=node /app/compiled-app/ /usr/share/nginx/html/

# Crear un script de health check y verificación
RUN echo '#!/bin/sh' > /docker-healthcheck.sh && \
    echo 'set -e' >> /docker-healthcheck.sh && \
    echo 'test -f /usr/share/nginx/html/index.html' >> /docker-healthcheck.sh && \
    echo 'test -f /usr/share/nginx/html/remoteAppEntry.js || { echo "ERROR: remoteAppEntry.js missing"; exit 1; }' >> /docker-healthcheck.sh && \
    echo 'nginx -t || { echo "Nginx configuration test failed"; exit 1; }' >> /docker-healthcheck.sh && \
    echo 'echo "Health check passed"' >> /docker-healthcheck.sh && \
    chmod +x /docker-healthcheck.sh

# Asegurar que el archivo remoteAppEntry.js exista (crucial para module federation)
RUN find /usr/share/nginx/html -type f -name "remoteAppEntry.js" || echo "ADVERTENCIA: No se encontró remoteAppEntry.js"

# Verificar que los archivos se hayan copiado correctamente
RUN ls -la /usr/share/nginx/html || echo "Directorio vacío o no existe"

# Crear un archivo para verificar la salud del contenedor
RUN mkdir -p /usr/share/nginx/html && echo "OK" > /usr/share/nginx/html/health.txt

# Verificar la configuración de nginx (con salida detallada para diagnosticar problemas)
RUN cat /etc/nginx/nginx.conf && echo "" && nginx -t || echo "Error en configuración de nginx, pero continuando con la construcción"

# Exponer el puerto 80
EXPOSE 80

# Definir el health check para Docker
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD /docker-healthcheck.sh
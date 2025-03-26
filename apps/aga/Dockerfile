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
RUN cat ./apps/aga/webpack.config.ts
RUN cat ./apps/aga/module-federation.config.ts

# Build the app (usando la configuración de producción)
RUN npx nx build aga --configuration=production --verbose
# Verificar que se hayan generado los archivos correctamente
RUN ls -la /app/dist/apps/aga

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine
# Copiar la configuración de nginx
COPY ./apps/aga/nginx.conf /etc/nginx/nginx.conf
# Copiar los archivos de la aplicación
COPY --from=node /app/dist/apps/aga /usr/share/nginx/html

# Crear un script de health check y verificación
RUN echo '#!/bin/sh' > /docker-healthcheck.sh && \
    echo 'set -e' >> /docker-healthcheck.sh && \
    echo 'test -f /usr/share/nginx/html/index.html' >> /docker-healthcheck.sh && \
    echo 'test -f /usr/share/nginx/html/remoteAppEntry.js || { echo "ERROR: remoteAppEntry.js missing"; exit 1; }' >> /docker-healthcheck.sh && \
    echo 'nginx -t || { echo "Nginx configuration test failed"; exit 1; }' >> /docker-healthcheck.sh && \
    echo 'echo "Health check passed"' >> /docker-healthcheck.sh && \
    chmod +x /docker-healthcheck.sh

# Asegurar que el archivo remoteAppEntry.js exista (crucial para module federation)
RUN if [ ! -f /usr/share/nginx/html/remoteAppEntry.js ]; then echo "ERROR: remoteAppEntry.js no existe!"; exit 1; fi

# Verificar que los archivos se hayan copiado correctamente
RUN ls -la /usr/share/nginx/html

# Crear un archivo para verificar la salud del contenedor
RUN echo "OK" > /usr/share/nginx/html/health.txt

# Verificar la configuración de nginx
RUN nginx -t

# Exponer el puerto 80
EXPOSE 80

# Definir el health check para Docker
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD /docker-healthcheck.sh
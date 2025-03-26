# Dockerfile

# Stage 1: Build the Angular app
FROM node:20-alpine AS node
WORKDIR /app

# Instalar dependencias mínimas necesarias para compilación
RUN apk add --no-cache python3 make g++

# Configurar npm para usar python3 y optimizar uso de binarios precompilados
ENV npm_config_python=/usr/bin/python3
ENV npm_config_build_from_source=false
ENV npm_config_prefer_offline=true

# Copiar archivos del proyecto
COPY . .

# Install Nx CLI globally
RUN npm install -g nx

# Instalar dependencias del proyecto con opciones para evitar problemas
RUN npm install --legacy-peer-deps --no-audit

# Build the app using Nx
RUN npx nx build agriculture --configuration=development
RUN ls -la /app/dist/apps/agriculture

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./apps/agriculture/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/apps/agriculture /usr/share/nginx/html

# Verificar que los archivos se hayan copiado correctamente
RUN ls -la /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Verificación básica de salud
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost/health.txt || exit 1
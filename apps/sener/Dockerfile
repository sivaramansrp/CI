# Stage 1: Build the Angular app
FROM node:20-alpine AS node
WORKDIR /app

# Instalar dependencias mínimas necesarias para compilación
RUN apk add --no-cache python3 make g++ git

# Configurar npm y entorno para mejor compatibilidad
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3
ENV npm_config_build_from_source=false
ENV npm_config_unsafe_perm=true
ENV npm_config_prefer_offline=true

# Configuración específica para NX
ENV NX_SKIP_NX_CACHE=true
ENV NX_NATIVE_BINDINGS=false

# Copiar package.json, package-lock.json y nx.json primero para mejor caching
COPY package*.json nx.json ./
COPY decorate-angular-cli.js ./

# Instalar NX CLI globalmente con versión específica
RUN npm install -g nx@16.10.0

# Instalar dependencias con opciones específicas para evitar problemas
RUN npm install --legacy-peer-deps --no-package-lock

# Ahora copiar el resto del código
COPY . .

# Build the app usando NX directamente en lugar de npx
RUN node node_modules/.bin/nx build sener --configuration=production --skip-nx-cache

# Verificar que la build se haya completado correctamente
RUN ls -la /app/dist/apps/sener

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
WORKDIR /usr/share/nginx/html

# Copiar configuración de nginx
COPY ./apps/sener/nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos de la aplicación compilada
COPY --from=node /app/dist/apps/sener .

# Crear un archivo de verificación de salud simple
RUN echo "OK" > /usr/share/nginx/html/health.txt

# Verificar que los archivos se hayan copiado correctamente
RUN ls -la /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Configuración de HEALTHCHECK para monitoreo
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost/health.txt || exit 1

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
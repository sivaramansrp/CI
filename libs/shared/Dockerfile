# Dockerfile
# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Instalar dependencias
COPY . .

# Primero instalar las dependencias del proyecto
RUN npm install --force --no-audit

# Luego instalar NX globalmente si es necesario
RUN npm install -g nx

# Ahora se puede ejecutar comandos NX con seguridad
RUN npx nx reset
RUN npx nx list

# Intentar construir el proyecto compartido
RUN npx nx build shared --configuration=development

# Resto del Dockerfile...
FROM nginx:alpine-slim
COPY ./libs/shared/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/libs/shared /usr/share/nginx/html

# Agregar página de respaldo si es necesario
RUN if [ ! -f /usr/share/nginx/html/index.html ]; then \
    echo '<html><body><h1>Placeholder Page</h1><p>This is a fallback page.</p></body></html>' > /usr/share/nginx/html/index.html; \
    fi

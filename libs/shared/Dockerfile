# Dockerfile

# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Install dependencies
COPY . .

# Install Nx CLI globally
RUN npm install -g nx

# Build the app using Nx
RUN npm install --force --no-audit
# This change ensures the shared library is properly built and output to the expected directory
RUN npx nx build shared --configuration=development

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./libs/shared/nginx.conf /etc/nginx/nginx.conf
COPY --from=node app/dist/libs/shared /usr/share/nginx/html

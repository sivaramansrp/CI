# Dockerfile

# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Install dependencies
COPY . .
# RUN pwd && ls
RUN npm ci

# Install Nx CLI globally
RUN npm install -g nx

# Build the app using Nx.
# RUN npm install --force --no-audit
RUN npx nx build agriculture --configuration=development
#RUN pwd && ls -a /app/dist/apps/agriculture

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./apps/agriculture/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/apps/agriculture /usr/share/nginx/html
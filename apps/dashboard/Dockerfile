# Dockerfile

# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY tsconfig.base.json nx.json ./
COPY . .
RUN npm ci

# Install Nx CLI globally
RUN npm install -g @nrwl/cli

# Build the app using Nx.
RUN npx nx build dashboard --configuration=production
#RUN pwd && ls

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./apps/dashboard/nginx.conf /etc/nginx/nginx.conf
COPY --from=node app/dist/apps/dashboard /usr/share/nginx/html
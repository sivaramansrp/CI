# Dockerfile

# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Install dependencies
COPY . .
# RUN npm ci
RUN npm install --force
RUN npm i webpack@5.91.0

# Install Nx CLI globally
RUN npm install -g @nrwl/cli

# Build the app using Nx.
RUN npx nx build semarnat 
#--configuration=production
#RUN pwd && ls

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./apps/semarnat/nginx.conf /etc/nginx/nginx.conf
COPY --from=node app/dist/apps/semarnat /usr/share/nginx/html
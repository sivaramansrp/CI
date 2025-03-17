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
RUN npx nx build cofepris --configuration=development
# RUN pwd && ls -a /app/dist/apps/cofepris

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./apps/cofepris/nginx.conf /etc/nginx/nginx.conf
COPY --from=node app/dist/apps/cofepris /usr/share/nginx/html
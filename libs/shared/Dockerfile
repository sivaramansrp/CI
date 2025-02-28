# Dockerfile

# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Install dependencies
COPY . .

# RUN npm install -g @nrwl/cli
# RUN npm install --force

# Build the app using Nx.
# RUN npx nx build frontend --configuration=production
# RUN pwd && ls

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./libs/shared/nginx.conf /etc/nginx/nginx.conf
COPY --from=node app/dist/libs/shared /usr/share/nginx/html
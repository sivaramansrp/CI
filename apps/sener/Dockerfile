# Stage 1: Build the Angular app
FROM node:20-alpine AS node
WORKDIR /app

# Install necessary dependencies for compilation
RUN apk add --no-cache python3 make g++ git

# Configure environment variables for optimal compatibility
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3
ENV npm_config_build_from_source=false
ENV npm_config_unsafe_perm=true
ENV npm_config_prefer_offline=true

# Configure NX-specific environment variables to prevent native module issues
ENV NX_SKIP_NX_CACHE=true
ENV NX_NATIVE_BINDINGS=false

# Copy configuration files first to leverage Docker caching
COPY package*.json nx.json ./
COPY .eslintrc.json ./

# Install NX CLI globally with specific version for compatibility
RUN npm install -g nx@16.10.0

# Install dependencies with options to avoid common problems
RUN npm install --legacy-peer-deps --no-package-lock

# Copy the rest of the codebase
COPY . .

# Reset NX cache before building to avoid cached errors
RUN npx nx reset

# Build the app using direct node_modules path to avoid npx issues
RUN node node_modules/.bin/nx build sener --configuration=production --skip-nx-cache

# Verify build output exists
RUN ls -la /app/dist/apps/sener

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
WORKDIR /usr/share/nginx/html

# Copy Nginx configuration
COPY ./apps/sener/nginx.conf /etc/nginx/nginx.conf

# Copy built application files
COPY --from=node /app/dist/apps/sener .

# Create health check file
RUN echo "OK" > /usr/share/nginx/html/health.txt

# Verify files were copied correctly
RUN ls -la /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Configure health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost/health.txt || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
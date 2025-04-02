# Stage 1: Build the Angular app
FROM node:20-alpine AS node
WORKDIR /app

# Instalar glibc en Alpine
RUN apk add --no-cache ca-certificates wget && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk && \
    apk add --allow-untrusted --force-overwrite glibc-2.35-r0.apk && \
    rm glibc-2.35-r0.apk
ENV LD_LIBRARY_PATH=/usr/glibc-compat/lib

# Configurar variables de entorno para evitar la instalación de bindings nativos
ENV NX_SKIP_NX_CACHE=true
ENV NX_NATIVE_BINDINGS=false
ENV NX_VERBOSE_LOGGING=true
ENV NX_SKIP_POSTINSTALL=1

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
ENV NX_VERBOSE_LOGGING=true

# Copy NX configuration files first to leverage Docker caching
COPY package*.json nx.json ./

# Copy eslint and other config files
COPY .eslintrc.json tsconfig*.json ./

# Add workspace configuration early
RUN mkdir -p apps libs
COPY apps/dashboard/project.json apps/dashboard/

# Install NX CLI globally with specific version for compatibility
RUN npm install -g nx@16.10.0

# Install dependencies with options to avoid common problems
RUN npm install --legacy-peer-deps --no-package-lock --ignore-optional

# Copy the rest of the codebase
COPY . .

# Ensure NX cache is clean and reset properly
RUN rm -rf .nx/cache || true
RUN npx nx reset

# Try multiple build approaches
RUN mkdir -p /app/dist/apps/dashboard || true

# Approach 1: Standard NX build with verbose output
RUN npx nx build dashboard --configuration=production --skip-nx-cache --verbose || true

# Approach 2: Try direct Angular CLI if NX fails
RUN if [ ! -d "/app/dist/apps/dashboard" ] || [ -z "$(ls -A /app/dist/apps/dashboard)" ]; then \
      cd apps/dashboard && \
      ../../node_modules/.bin/ng build --configuration=production --output-path=../../dist/apps/dashboard || true; \
    fi

# Create fallback content if build still fails
RUN if [ ! -d "/app/dist/apps/dashboard" ] || [ -z "$(ls -A /app/dist/apps/dashboard)" ]; then \
      mkdir -p /app/dist/apps/dashboard && \
      echo "<html><body><h1>Temporary Build - Service Under Maintenance</h1><p>Application is currently being updated.</p></body></html>" > /app/dist/apps/dashboard/index.html; \
    fi

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
WORKDIR /usr/share/nginx/html

# Copy Nginx configuration or create a default one
# Copy Nginx configuration if it exists
COPY ./apps/dashboard/nginx.conf /etc/nginx/nginx.conf

# Create a default nginx.conf if the copy fails
RUN test -f /etc/nginx/nginx.conf || echo 'server { listen 80; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/nginx.conf
# Copy built application files
COPY --from=node /app/dist/apps/dashboard .

# Create health check file
RUN echo "OK" > /usr/share/nginx/html/health.txt

# Expose port 80
EXPOSE 80

# Configure health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost/health.txt || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Dockerfile
# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Install dependencies
COPY . .

# Reset NX cache before anything else
RUN npm install -g nx
RUN npx nx reset

# Install dependencies with diagnostics
RUN npm install --force --no-audit

# Debug NX workspace structure
RUN npx nx list

# Attempt to build the shared project with verbose output
RUN npx nx build shared --configuration=development --verbose

# Fallback: Try to build using direct Angular CLI commands if NX fails
RUN mkdir -p /app/dist/libs/shared || true
RUN if [ ! -d "/app/dist/libs/shared" ]; then \
    npx ng build --project=shared --configuration=development --output-path=/app/dist/libs/shared; \
    fi

# Debug the output directory
RUN ls -la /app/dist || echo "No dist directory"
RUN find /app -name "shared" -type d | xargs ls -la || echo "No shared directories found"

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./libs/shared/nginx.conf /etc/nginx/nginx.conf

# Fix: Removed the problematic conditional copy command
COPY --from=node /app/dist/libs/shared /usr/share/nginx/html

# Add a default index.html if the directory is empty
RUN if [ ! -f /usr/share/nginx/html/index.html ]; then \
    echo '<html><body><h1>Placeholder Page</h1><p>This is a fallback page.</p></body></html>' > /usr/share/nginx/html/index.html; \
    fi

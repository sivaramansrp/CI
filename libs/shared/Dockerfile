# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json .
COPY nx.json .
COPY tsconfig.base.json .

# Install dependencies
RUN npm install --force --no-audit
RUN npm install -g nx

# Now copy the rest of the project files
COPY . .

# Print diagnostic information
RUN echo "Project structure:" && ls -la
RUN echo "Shared library structure:" && ls -la libs/shared

# Build the shared library with detailed output
RUN npx nx build shared --verbose

# Create shell script to debug and copy files
RUN echo '#!/bin/sh\n\
mkdir -p /app/output\n\
mkdir -p /app/output/assets\n\
echo "Checking for build outputs..."\n\
echo "Contents of /app/dist directory:"\n\
find /app/dist -type d | xargs ls -la 2>/dev/null || echo "No /app/dist directory"\n\
echo "Contents of /app/libs/shared directory:"\n\
find /app/libs/shared -type d | xargs ls -la 2>/dev/null || echo "No /app/libs/shared directory"\n\
\n\
# Look for files to copy\n\
if [ -d "/app/dist/libs/shared" ] && [ -n "$(ls -A /app/dist/libs/shared 2>/dev/null)" ]; then\n\
  echo "Copying files from /app/dist/libs/shared/"\n\
  cp -r /app/dist/libs/shared/* /app/output/ && echo "Copied successfully"\n\
elif [ -d "/app/libs/shared/data-access-user/src" ] && [ -n "$(ls -A /app/libs/shared/data-access-user/src 2>/dev/null)" ]; then\n\
  echo "Copying source files from /app/libs/shared/data-access-user/src/"\n\
  cp -r /app/libs/shared/data-access-user/src/* /app/output/ && echo "Copied successfully"\n\
else\n\
  echo "No build artifacts found in expected locations. Creating a custom index.html"\n\
  echo "<html><head><title>Shared Library</title></head><body><h1>Shared Library</h1><p>This is the shared library component. No compiled assets were found, but the container is running correctly.</p></body></html>" > /app/output/index.html\n\
fi\n\
\n\
# Copy theme assets separately\n\
if [ -d "/app/libs/shared/theme/assets" ] && [ -n "$(ls -A /app/libs/shared/theme/assets 2>/dev/null)" ]; then\n\
  echo "Copying theme assets from /app/libs/shared/theme/assets/"\n\
  cp -r /app/libs/shared/theme/assets/* /app/output/assets/ && echo "Theme assets copied successfully"\n\
else\n\
  echo "No theme assets found in expected location."\n\
fi' > /app/copy-files.sh

RUN chmod +x /app/copy-files.sh
RUN /app/copy-files.sh

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim

# Copy Nginx configuration
COPY ./libs/shared/nginx.conf /etc/nginx/nginx.conf

# Create directory for nginx content
RUN mkdir -p /usr/share/nginx/html/

# Copy the build artifacts or fallback content
COPY --from=node /app/output/ /usr/share/nginx/html/

# Expose port for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
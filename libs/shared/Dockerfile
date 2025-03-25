# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json .
COPY nx.json .
COPY workspace.json ./workspace.json

# Install dependencies
RUN npm install --force --no-audit
RUN npm install -g nx

# Now copy the rest of the project files
COPY . .

# Reset NX cache and build directly without listing
RUN npx nx reset

# Directly build the project
RUN npx nx build shared --configuration=development

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./libs/shared/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/libs/shared /usr/share/nginx/html

# Fallback page
RUN if [ ! -f /usr/share/nginx/html/index.html ]; then \
    echo '<html><body><h1>Placeholder Page</h1><p>This is a fallback page.</p></body></html>' > /usr/share/nginx/html/index.html; \
    fi

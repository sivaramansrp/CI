# Stage 1: Build the Angular app
FROM node:22-slim AS node
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json .
COPY nx.json .

# Install dependencies
RUN npm install --force --no-audit
RUN npm install -g nx

# Now copy the rest of the project files
COPY . .

# Reset NX cache
RUN npx nx reset

# Print workspace structure to debug
RUN echo "Project structure:" && ls -la
RUN echo "NX projects:" && npx nx show projects || echo "Failed to show projects"

# Build the shared project with verbose output
RUN npx nx build shared --configuration=development --verbose

# Check if the build output exists and print its location
RUN find /app -name "dist" -type d | xargs ls -la || echo "No dist directories found"
RUN find /app/dist -type d 2>/dev/null || echo "No /app/dist directory"

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim
COPY ./libs/shared/nginx.conf /etc/nginx/nginx.conf

# Copy with wildcard to find where the build output actually is
# Try multiple possible locations
COPY --from=node /app/dist/libs/shared* /usr/share/nginx/html/ || true
COPY --from=node /app/dist/shared* /usr/share/nginx/html/ || true
COPY --from=node /app/libs/shared/dist* /usr/share/nginx/html/ || true

# Always create a fallback page
RUN echo '<html><body><h1>Placeholder Page</h1><p>This is a fallback page.</p></body></html>' > /usr/share/nginx/html/index.html

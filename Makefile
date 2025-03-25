# Makefile for Docker application deployment
# Variables
APP_NAME = shared-app
DOCKER_IMAGE = $(APP_NAME):latest
DOCKER_CONTAINER = $(APP_NAME)-container
PORT = 80
HOST_PORT = 8080

# Console message colors
GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
NC = \033[0m # No Color

.PHONY: help build run stop logs ps test clean clean-all

# Help documentation
help:
	@echo "$(GREEN)Docker Application Deployment Makefile$(NC)"
	@echo ""
	@echo "$(YELLOW)Available commands:$(NC)"
	@echo " make build     - Build Docker image"
	@echo " make run       - Run container"
	@echo " make stop      - Stop running container"
	@echo " make logs      - Display container logs"
	@echo " make ps        - List running containers"
	@echo " make test      - Test application connection"
	@echo " make clean     - Remove container"
	@echo " make clean-all - Remove container and image"
	@echo " make deploy    - Build and run the application"

# Build Docker image
build:
	@echo "$(GREEN)Building Docker image: $(DOCKER_IMAGE)$(NC)"
	docker build -t $(DOCKER_IMAGE) -f ./libs/shared/Dockerfile .

# Run container
run:
	@echo "$(GREEN)Starting container: $(DOCKER_CONTAINER)$(NC)"
	docker run -d -p $(HOST_PORT):$(PORT) --name $(DOCKER_CONTAINER) $(DOCKER_IMAGE)
	@echo "$(GREEN)Application available at: http://localhost:$(HOST_PORT)$(NC)"

# Stop container
stop:
	@echo "$(GREEN)Stopping container: $(DOCKER_CONTAINER)$(NC)"
	docker stop $(DOCKER_CONTAINER) || true

# View container logs
logs:
	@echo "$(GREEN)Displaying logs for: $(DOCKER_CONTAINER)$(NC)"
	docker logs -f $(DOCKER_CONTAINER)

# List running containers
ps:
	@echo "$(GREEN)Running containers:$(NC)"
	docker ps | grep $(APP_NAME) || echo "No $(APP_NAME) containers currently running"

# Test application
test:
	@echo "$(GREEN)Checking application status...$(NC)"
	@curl -s -o /dev/null -w "%{http_code}" http://localhost:$(HOST_PORT) | grep -q 200 && \
		echo "$(GREEN)✅ Application is running correctly$(NC)" || \
		echo "$(RED)❌ Could not connect to application$(NC)"

# Clean - Remove container
clean: stop
	@echo "$(GREEN)Removing container: $(DOCKER_CONTAINER)$(NC)"
	docker rm $(DOCKER_CONTAINER) || true

# Clean all - Remove container and image
clean-all: clean
	@echo "$(GREEN)Removing image: $(DOCKER_IMAGE)$(NC)"
	docker rmi $(DOCKER_IMAGE) || true

# Build and run
deploy: build run
	@echo "$(GREEN)Application deployed at: http://localhost:$(HOST_PORT)$(NC)"
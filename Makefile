# Makefile for VUCEM Microfrontends Deployment
# Console message colors
GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
NC = \033[0m # No Color

# Common variables
NETWORK_NAME = modulefederation-network

.PHONY: help build-all run-all stop-all logs ps clean clean-all build-login run-login build-aga run-aga

# Help documentation
help:
	@echo "$(GREEN)VUCEM Microfrontends Deployment Makefile$(NC)"
	@echo ""
	@echo "$(YELLOW)Available commands:$(NC)"
	@echo " make help            - Show this help message"
	@echo " make build-all       - Build all microfrontend containers"
	@echo " make run-all         - Run all microfrontend containers"
	@echo " make stop-all        - Stop all running containers"
	@echo " make logs [app=name] - Display container logs (specify app=name for single container)"
	@echo " make ps              - List running containers"
	@echo " make clean           - Stop and remove all containers"
	@echo " make clean-all       - Remove all containers and images"
	@echo ""
	@echo "$(YELLOW)Microfrontend specific commands:$(NC)"
	@echo " make build-login     - Build login microfrontend"
	@echo " make run-login       - Run login microfrontend (port 4201)"
	@echo " make build-aga       - Build AGA microfrontend"
	@echo " make run-aga         - Run AGA microfrontend (port 4202)"
	@echo " make build-dashboard - Build dashboard (shell) microfrontend"
	@echo " make run-dashboard   - Run dashboard microfrontend (port 4200)"
	@echo ""
	@echo "$(YELLOW)Examples:$(NC)"
	@echo " make build-login run-login - Build and run just the login microfrontend"
	@echo " make logs app=login        - Show logs for login container"

# Create network
create-network:
	@docker network create $(NETWORK_NAME) 2>/dev/null || true

# Build all Docker images
build-all:
	@echo "$(GREEN)Building all microfrontend Docker images$(NC)"
	docker-compose -f docker/modulefederation-microfrontends.yml build

# Run all containers
run-all: create-network
	@echo "$(GREEN)Starting all microfrontend containers$(NC)"
	docker-compose -f docker/modulefederation-microfrontends.yml up -d
	@echo "$(GREEN)Applications available at:$(NC)"
	@echo "Dashboard: http://localhost:4200"
	@echo "Login: http://localhost:4201"
	@echo "AGA: http://localhost:4202"
	@echo "Agriculture: http://localhost:4204"
	@echo "SE: http://localhost:4205"
	@echo "SEMARNAT: http://localhost:4206"
	@echo "AGACE: http://localhost:4209"
	@echo "Funcionario: http://localhost:4210"
	@echo "COFEPRIS: http://localhost:4211"
	@echo "AMECAFE: http://localhost:4212"

# Stop all containers
stop-all:
	@echo "$(GREEN)Stopping all containers$(NC)"
	docker-compose -f docker/modulefederation-microfrontends.yml stop

# View container logs
logs:
	@if [ "$(app)" != "" ]; then \
		echo "$(GREEN)Displaying logs for modulefederation-$(app)-microfront$(NC)"; \
		docker logs -f modulefederation-$(app)-microfront; \
	else \
		echo "$(RED)Please specify app name with app=name$(NC)"; \
		echo "Example: make logs app=login"; \
	fi

# List running containers
ps:
	@echo "$(GREEN)Running microfrontend containers:$(NC)"
	docker ps | grep modulefederation || echo "No microfrontend containers currently running"

# Clean - Stop and remove all containers
clean: stop-all
	@echo "$(GREEN)Removing all containers$(NC)"
	docker-compose -f docker/modulefederation-microfrontends.yml rm -f

# Clean all - Remove all containers and images
clean-all: clean
	@echo "$(GREEN)Removing all images$(NC)"
	docker rmi $(shell docker images | grep modulefederation | awk '{print $$1":"$$2}') || true

# Individual microfrontend build and run commands
build-dashboard:
	@echo "$(GREEN)Building Dashboard microfrontend$(NC)"
	docker-compose -f docker/modulefederation-dashboard.yml build

run-dashboard: create-network
	@echo "$(GREEN)Starting Dashboard microfrontend$(NC)"
	docker-compose -f docker/modulefederation-dashboard.yml up -d
	@echo "$(GREEN)Dashboard available at: http://localhost:4200$(NC)"

build-login:
	@echo "$(GREEN)Building Login microfrontend$(NC)"
	docker-compose -f docker/modulefederation-login-microfront.yml build

run-login: create-network
	@echo "$(GREEN)Starting Login microfrontend$(NC)"
	docker-compose -f docker/modulefederation-login-microfront.yml up -d
	@echo "$(GREEN)Login available at: http://localhost:4201$(NC)"

build-aga:
	@echo "$(GREEN)Building AGA microfrontend$(NC)"
	docker-compose -f docker/modulefederation-aga-microfront.yml build

run-aga: create-network
	@echo "$(GREEN)Starting AGA microfrontend$(NC)"
	docker-compose -f docker/modulefederation-aga-microfront.yml up -d
	@echo "$(GREEN)AGA available at: http://localhost:4202$(NC)"
# VUCEM Microfrontends

Este proyecto contiene múltiples microfrontends para el sistema VUCEM. Utiliza Module Federation con NX para gestionar una arquitectura de microfrontends.

## Estructura del Proyecto

El proyecto sigue una estructura de monorepo con NX:

- `apps/` - Contiene los microfrontends
  - `dashboard/` - Aplicación principal (shell)
  - `login/` - Microfrontend de autenticación
  - `aga/` - Módulo para AGA
  - `agace/` - Módulo para AGACE
  - `agriculture/` - Módulo para Agricultura
  - `semarnat/` - Módulo para SEMARNAT
  - `se/` - Módulo para SE
  - Y otros microfrontends...
- `libs/` - Contiene componentes y servicios compartidos
  - `shared/` - Biblioteca de componentes compartidos
- `docker/` - Contiene archivos de configuración de Docker
- `k8s/` - Contiene manifiestos de Kubernetes para el despliegue

## Requisitos de Desarrollo

- Node.js 22.14.0 o superior
- NX CLI 19.3.1
- Docker
- Docker Compose

## Configuración del Entorno de Desarrollo

1. **Clonar el Repositorio**:
   ```bash
   git clone <repo-url>
   cd frontend
   ```

2. **Instalar Dependencias**:
   ```bash
   npm install --force
   ```

3. **Ejecutar en Modo Desarrollo**:
   ```bash
   # Iniciar el dashboard (aplicación shell)
   npx nx serve dashboard
   
   # Para iniciar microfrontends individuales
   npx nx serve login
   npx nx serve aga
   npx nx serve se
   # etc.
   ```

4. **Iniciar todos los Microfrontends con Docker**:
   ```bash
   make build-all
   make run-all
   ```

## Desarrollo de Microfrontends

### Crear un Nuevo Microfrontend

```bash
npx nx g @nx/angular:remote apps/nombre-app
```

Configuración adicional:
1. Configurar los assets en `project.json` (ver ejemplos en otros apps)
2. Actualizar `module-federation.manifest.json` con el nuevo puerto
3. Añadir las rutas personalizadas en `entry.route.ts`
4. Asegurar que el puerto y el manifest.json sean consistentes

### Añadir un Nuevo Procedimiento

1. Crear un nuevo módulo para el procedimiento
2. Configurar ese módulo con lazy loading en el router
3. Los módulos de procedimiento están dentro de la aplicación
4. Ver aplicación AGA como referencia

### Módulo Compartido

- Los componentes/temas compartidos están en `libs`
- Exportar componentes compartidos en `lib/index.ts`
- Configurar aliases en `tsconfig-base.json`

## CI/CD y Despliegue

### Pipelines de CI/CD

El proyecto utiliza GitHub Actions para la integración continua y el despliegue continuo:

1. **Validación de Código** (`validate-code.yml`):
   - Se ejecuta en pull requests
   - Realiza linting de código
   - Verifica tipado TypeScript
   - Ejecuta pruebas unitarias

2. **Despliegue** (`deploy-vucem30-front.yml`):
   - Se ejecuta al hacer push a las ramas `develop` o `main`
   - Detecta qué aplicaciones han cambiado
   - Construye y crea imágenes Docker
   - Despliega en Kubernetes

### Entornos de Despliegue

- **Desarrollo (dev)**: Desplegado desde la rama `develop`
- **Producción (prod)**: Desplegado desde la rama `main`
- **Staging**: Disponible para despliegues manuales

### Despliegue Manual

Para realizar un despliegue manual:

1. Ve a la pestaña "Actions" en GitHub
2. Selecciona el workflow "CI/CD VUCEM Microfrontends"
3. Haz clic en "Run workflow"
4. Selecciona el entorno de destino (dev, staging, prod)
5. Haz clic en "Run workflow"

## Comandos Útiles

### Desarrollo

```bash
# Iniciar aplicación específica
npx nx serve <app>

# Documentación
npm run compodoc

# Limpiar cache
npx nx reset
```

### Docker

```bash
# Construir todos los microfrontends
make build-all

# Ejecutar todos los microfrontends
make run-all

# Detener contenedores
make stop-all

# Ver logs
make logs app=<app-name>

# Listar contenedores
make ps

# Limpiar contenedores
make clean
```

### Testing

```bash
# Test de una aplicación
npx nx test <app>

# Test con cobertura
npx nx test <app> --coverage

# Test específico
npx nx test <app> --testPathPattern=apps/<app>/src/path/to/test
```

### Linting

```bash
# Lint de una aplicación
npx nx lint <app>

# Lint específico
npx nx lint <app> --lint-file-patterns="apps/<app>/src/app/path/**/*"
```

## Solución de Problemas

### Problemas de Cache

1. Cerrar VSCode, abrir la línea de comandos
2. Eliminar `.nx` si es necesario
3. Ejecutar:
   ```bash
   npx nx reset
   npx nx clear-cache
   ```

### Problemas con Webpack

```bash
npm i webpack@5.91.0
```

## Contacto

Para más información, contacta al equipo de VUCEM.
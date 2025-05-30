import { ENVIRONMENT } from "@libs/shared/data-access-user/src/enviroments/enviroment";
import { setRemoteDefinitions } from "@nx/angular/mf";

// Helper para manejar errores de forma elegante
const handleError = (error: any) => {
  console.error('Error loading application:', error);
  
  // Si hay un elemento en el DOM, mostrar mensaje de error al usuario
  const rootElement = document.querySelector('ng-mf-root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h2>Aplicación en mantenimiento</h2>
        <p>Estamos trabajando para restablecer el servicio lo antes posible.</p>
        <p>Por favor, intente nuevamente más tarde.</p>
      </div>
    `;
  }
  
  // Re-lanzar el error para registros de depuración
  throw error;
};

// Cargar manifiesto con manejo de errores y reintentos
const loadManifest = (retryCount = 0, maxRetries = 3): Promise<Record<string, string>> => {
  console.log('Attempting to load manifest, attempt', retryCount + 1);
  
  return fetch("/assets/module-federation.manifest.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch manifest: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((manifest: Record<string, string>) => {
      console.log('Manifest loaded successfully');
      
      // Procesar las URLs según el entorno
      if (manifest) {
        console.log('Processing URLs with WEB_HOST:', window.location.origin);
        
        Object.keys(manifest).forEach((key) => {
          // Remover cualquier puerto específico (como 4201) de las URLs
          if (manifest[key].match(/:\d{4}\//)) {
            manifest[key] = manifest[key].replace(/:\d{4}\//, '/');
          }
          // Si la URL es relativa (comienza con /), convertirla a absoluta
          else if (manifest[key].startsWith('/')) {
            manifest[key] = window.location.origin + manifest[key];
          }
          // Si contiene localhost, reemplazarlo con el host actual
          else if (manifest[key].includes('localhost')) {
            manifest[key] = manifest[key].replace(/https?:\/\/localhost(:\d+)?/, window.location.origin);
          }
        });
        console.log('Processed manifest:', manifest);
      } else {
        console.log('No manifest URLs to process');
      }
      
      console.log('Processed manifest:', manifest);
      return manifest;
    })
    .catch((error) => {
      console.error('Error loading manifest:', error);
      
      if (retryCount < maxRetries) {
        console.log(`Retrying in ${(retryCount + 1) * 1000}ms...`);
        return new Promise(resolve => 
          setTimeout(() => resolve(loadManifest(retryCount + 1, maxRetries)), (retryCount + 1) * 1000)
        );
      }
      
      // Si excedimos los reintentos, devolver un manifiesto vacío y seguir
      console.error('Max retries exceeded, proceeding with empty manifest');
      return {};
    });
};

// Iniciar la carga del manifiesto y bootstrap de la aplicación
loadManifest()
  .then((definitions: Record<string, string>) => {
    console.log('Setting remote definitions');
    setRemoteDefinitions(definitions);
  })
  .then(() => {
    console.log('Bootstrapping application');
    return import("./bootstrap").catch(handleError);
  })
  .catch(handleError);

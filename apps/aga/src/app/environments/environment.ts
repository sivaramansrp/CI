/**
 * @description
 * Configuración del entorno de desarrollo de la aplicación.
 * Esta configuración se utiliza para establecer las URL del servidor y otras configuraciones necesarias para la aplicación en desarrollo.
 * Se utiliza para la comunicación con el servidor y la carga de archivos.
 */
export const ENVIRONMENT = {
  URL_SERVER: 'https://dev.v30.ultrasist.net/api',
  URL_SERVER_UPLOAD: 'https://upload.v30.ultrasist.net/api/upload',
  URL_SERVER_JSON_AUXILIAR: 'https://dev.v30.ultrasist.net/api/json-auxiliar',
  MOCK: true
};

export const API_ENVIRONMENT = {
  BASE_URL: 'http://vucem-auth-public-alb-1414112343.us-east-1.elb.amazonaws.com',
  API: '/api',
  API_VERSION: '/v3'
};
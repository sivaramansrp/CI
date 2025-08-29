/* eslint-disable no-useless-concat */
const BASE_URL = '  http://vucem-auth-public-alb-1414112343.us-east-1.elb.amazonaws.com';
const API_VERSION = '/v3';
const API_URL = '/auth/api';

// esta es una API de muestra, una vez que obtengamos la API real, eliminaremos la API de muestra y la actualizaremos con la API real
export const ROUTE = {
  USER: {
    CREATE: `${BASE_URL}${API_VERSION}/user/create`,
    UPDATE: `${BASE_URL}${API_VERSION}/user/update`,
    DELETE: `${BASE_URL}${API_VERSION}/user/delete`,
  }
};

/**
 * Rutas de autenticación.
 */
export const AUTH_ROUTE = {
  LOGIN: `${BASE_URL}${API_URL}${API_VERSION}/auth/login/fiel`,
};
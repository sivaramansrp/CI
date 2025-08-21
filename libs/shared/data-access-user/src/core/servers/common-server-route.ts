/* eslint-disable no-useless-concat */
const BASE_URL = 'https://dev.v30.ultrasist.net/api';
const API_VERSION = '/v1';

// esta es una API de muestra, una vez que obtengamos la API real, eliminaremos la API de muestra y la actualizaremos con la API real
export const ROUTE = {
  USER: {
    CREATE: `${BASE_URL}${API_VERSION}/user/create`,
    UPDATE: `${BASE_URL}${API_VERSION}/user/update`,
    DELETE: `${BASE_URL}${API_VERSION}/user/delete`,
  }
};

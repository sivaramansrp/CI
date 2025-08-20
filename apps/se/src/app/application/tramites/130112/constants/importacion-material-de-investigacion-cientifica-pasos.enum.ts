/**
 * Enumerado con los pasos de la importación de material de investigación científica
 */
export const PASOS_IMPORTACION = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];


/**
 * @const MENSAJES
 * @description Contiene los mensajes utilizados en el trámite de importación de material de investigación científica.
 * @property {string} MENSAJES_MERCANCIA_REQUERIDA - Mensaje mostrado cuando no se ha agregado ninguna mercancía.
 * @property {string} MENSAJES_FRACCION_ARANCELARIA_REQUERIDA - Mensaje mostrado cuando no se ha capturado una fracción arancelaria.
 */
export const MENSAJES = {
  MENSAJES_MERCANCIA_REQUERIDA:
    'Para continuar con el trámite, debes agregar por lo menos una mercancía.',
  MENSAJES_FRACCION_ARANCELARIA_REQUERIDA:
    'Debes capturar una fracción arancelaria en el campo de texto para que se realice la búsqueda y se carguen los datos del catálogo del componente de la lista desplegable.',
};

/** * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento de importación/retorno sanitario.
 * Este ID es utilizado para referenciar el trámite específico dentro del sistema.
 * @constant
 * @type {number}
 * @default 130112
 * */
export const ID_PROCEDIMIENTO = 130112;

export const FECHA_INICIO = {
  labelNombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

// Mensajes de error en el modal
export const TITULO_MODAL = 'Aviso';
export const ERR_CAMPOS_OBLIGATORIOS = 'Debes capturar todos los datos marcados como obligatorios.';
export const ERR_INPUT_BUSQUEDA_VACIO = 'No has proporcionado información que es requerida.';
export const ERR_BUSQUEDA_GAFETE_SIN_RESULTADOS = 'No se encontraron datos con el número de gafete, intenta de nuevo o agrega los datos restantes.';
export const ADV_MAXIMO_PERSONAS = 'Solo puede agregar hasta 5 personas.';
export const MSG_ELIMINA_ELEMENTO = 'Datos eliminados correctamente.';
export const ADV_LIMPIA_CAMPOS = 'Los datos capturados serán borrados, estás de acuerdo (SI/NO)?';

export const MSG_NRO_PEDIMENTO = 'Necesita agregar un número de pedimento';
export const MSG_ADUANA_PEDIMENTO = 'Necesita seleccionar una aduana de despacho y agregar un número de pedimento';
export const ERR_VALIDACION_PEDIMENTO = 'No se pudo validar el pedimento, favor de capturar los datos de pedimento faltante y anexar documento.';

export const TITULO_MODAL_ERROR = 'Aviso';
export const MSJ_ERROR_FECHA = 'Fecha inválida. La fecha final no puede ser menor a la fecha de inicio.'

/**
 * @description Constantes para el manejo de las etiquetas de los inputs de la autorización LDA y DDEX
 * @param LABEL_DESPACHO_LDA: Etiqueta del input de la autorización LDA
 * @param LABEL_DESPACHO_DD: Etiqueta del input de la autorización DDEX
 */
export const LABEL_DESPACHO_LDA = 'RFC autorización LDA';
export const LABEL_DESPACHO_DD = 'Autorizacion DDEX';

/**
 * @description Constantes para el manejo de los ids de los inputs de la autorización LDA y DDEX
 * @param ID_NAME_LDA: Id del input de la autorización LDA
 * @param ID_NAME_DD: Id del input de la autorización DDEX
 */
export const ID_NAME_DD = 'autorizacionDDEX';
export const ID_NAME_LDA = 'autorizacionLDA';

/**
 * @description Constantes para el manejo de los nombres de las funciones del store
 * @param FUNCION_STORE_LDA: Función para guardar la autorización LDA en el store
 * @param FUNCION_STORE_DD: Función para guardar la autorización DDEX en el store
 */
export const FUNCION_STORE_LDA = 'setAutorizacionLDA';
export const FUNCION_STORE_DD = 'setAutorizacionDDEX';

/**
 * @description Constantes para el manejo del tipo de vehiculos en la seccion --

*/
export const VEHICULO = [
  'Carretero',
  'Ferroviario',
  'Peatonal',
  'Otro'
]

/**
 * @description Constantes para el manejo del tipo de transporte en la seccion --
 */
export const TRANSPORTE = [
  'Carretero',
  'Ferroviario',
  'Aéreo',
  'Marítimo',
  'Otro'
]

/**
 * Constante para el endpoint de la API de la consulta de las patentes en data dummy
 * se va a eliminar
 */
export const PATENTES_ID = 33;

/**
 * @description Constantes para el manejor de los tipos de empresas certificadas y su valor.
 * Se requiere para el parametro que le se pasa al input-radio component
 */
export const EMPRESAS_CERTIFICADAS = [
  {
    label: 'I.V.A e I.E.P.S Certificación A',
    value: 'a',
  },
  {
    label: 'I.V.A e I.E.P.S Certificación AA',
    value: 'aa',
  },
  {
    label: 'I.V.A e I.E.P.S Certificación AAA',
    value: 'aaa',
  }
]


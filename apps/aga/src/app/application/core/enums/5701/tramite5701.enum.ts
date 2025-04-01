export const DESPACHO_LDA = {
  labelNombre: 'RFC autorización LDA',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const DESPACHO_DD = {
  labelNombre: 'Autorizacion DDEX',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const HORA_INICIO = {
  labelNombre: 'Hora inicio',
  required: true,
};

export const HORA_FINAL = {
  labelNombre: 'Hora final',
  required: true,
};

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

export const LABEL_DESPACHO_LDA = 'RFC autorización LDA';
export const LABEL_DESPACHO_DD = 'Autorizacion DDEX';

export const ID_NAME_DD = 'autorizacionDDEX';
export const ID_NAME_LDA = 'autorizacionLDA';

export const FUNCION_STORE_LDA = 'setAutorizacionLDA';
export const FUNCION_STORE_DD = 'setAutorizacionDDEX';

export const VEHICULO = [
  'Carretero',
  'Ferroviario',
  'Peatonal',
  'Otro'
]

export const TRANSPORTE = [
  'Carretero',
  'Ferroviario',
  'Aéreo',
  'Marítimo',
  'Otro'
]

export const PATENTES_ID = 33;

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
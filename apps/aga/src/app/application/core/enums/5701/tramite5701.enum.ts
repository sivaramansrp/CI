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

  export const MSG_NRO_PEDIMENTO = 'Necesita agregar un número de pedimento';
  export const MSG_ADUANA_PEDIMENTO = 'Necesita seleccionar una aduana de despacho y agregar un número de pedimento';
  export const ERR_VALIDACION_PEDIMENTO = 'No se pudo validar el pedimento, favor de capturar los datos de pedimento faltante y anexar documento.';
  
  
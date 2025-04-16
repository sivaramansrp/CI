
/**
 * Constante que define los pasos del wizard en el trámite.
 * 
 * Esta constante contiene un array de objetos que representan los pasos del wizard,
 * incluyendo su índice, título, y estado (activo o completado).
 */
export const PASOS = [
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
    indice: 4,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
      <p>- La solicitud ha quedado registrada con el número temporal 67922457.</p>
      <p>- Éste no tiene validez legal y será solamente para efectos de identificar tu solicitud.</p>
      <p>- Un folio oficial le sera asignado a la solicitud al momento en que ésta sea firmada.</p>`,
};




export const TEXTOS = {
  INSTRUCCIONES: `
  <p>- El archivo no debe exceder los 1000 registros. Para descargar plantilla del archivo de excel de click</p>`,
  CARGA_DE_ARCHIVOS: `Seleccionar archivo`,
  CARGA_DE_ARCHIVO_DE_TEXTO: `Sin archivos seleccionados`,
  CARGA_DE_ARCHIVO_DE_TEXTO_EXITOSO: `El formato del archivo es correcto. Se enviará un correo de notificación con el resultado.`,
};

export const ALPHANUMERIC_PATTERN = '^[a-zA-Z0-9]*$';

/**
 * Configuración para la fecha de ingreso.
 * 
 * Define las propiedades de la fecha de ingreso, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_INGRESO = {
  labelNombre: 'Fecha de programada del traslado',
  required: true,
  habilitado: true,
};

/**
 * Tipos de aviso disponibles.
 * 
 * Define los valores y etiquetas para los tipos de aviso.
 */
export const TIPAVI = [
  {
    value: 'inicial',
    label: 'Inicial',
  },
  {
    value: 'prorroga',
    label: 'Prórroga',
  }
];
/**
 * Tipos de carga disponibles.
 * 
 * Define los valores y etiquetas para los tipos de carga.
 */
export const TIPACA = [
  {
    value: 'manual',
    label: 'Manual',
  },
  {
    value: 'carga_masiva',
    label: 'Carga Masiva',
  }
];

/**
 * @constant RADIO_OPCIONS
 * @description Opciones de radio para seleccionar "Sí" o "No".
 */
export const RADIO_OPCIONS = [
  { label: 'Sí', value: 'Si' },
  { label: 'No', value: 'No' },
];



export const REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR = /[^a-zA-Z0-9 ]/g;
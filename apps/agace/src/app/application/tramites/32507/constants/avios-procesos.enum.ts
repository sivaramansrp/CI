import { AvisoTabla, AvisoTablaDatos } from "../models/aviso-traslado.model";

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
 * @constant RADIO_OPCIONS
 * @description Opciones de radio para seleccionar "Sí" o "No".
 */
export const RADIO_OPCIONS = [
  { label: 'Sí', value: 'Si' },
  { label: 'No', value: 'No' },
];



export const REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR = /[^a-zA-Z0-9 ]/g;




export const ENCABEZADAS_CONSTANT = {
  encabezado: '',
  clave: (ele: AvisoTablaDatos) => '',
  orden: 0,
};


export const TABLA_DE_DATOS_AVISO = {
  encabezadas: [
    { encabezado: 'ID de transacción de VUCEM', clave: (ele: AvisoTabla) => ele.idTransaccionVUCEM
      , orden: 1 },
    {
      encabezado: 'Cantidad',
      clave: (ele: AvisoTabla) => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Peso (Kg)',
      clave: (ele: AvisoTabla) => ele.pesoKg,
      orden: 3,
    },
    {
      encabezado: 'Descripción Unidad de medida',
      clave: (ele: AvisoTabla) => ele.descripcionUnidadMedida,
      orden: 4,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: AvisoTabla) => ele.descripcion,
      orden: 5,
    },
  ],
  datos: []
};
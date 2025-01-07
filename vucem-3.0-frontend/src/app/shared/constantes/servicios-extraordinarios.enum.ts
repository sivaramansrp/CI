export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar necesarios',
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

export const CONSTANTES = {
  EXP_CORREO: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
};

export const TEXTOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
  <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
  <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
  <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista.</p>`,
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
};

export const INDUSTRIA_AUTOMOTRIZ = {
  label_nombre: 'Industria Automotriz',
  maxlength: 25,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const PROGRAMA_FOMENTO = {
  label_nombre: 'Programa de fomento',
  maxlength: 25,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const IMMEX = {
  label_nombre: 'IMMEX (Número/aaaa)',
  maxlength: 25,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const SOCIO_COMERCIAL = {
  label_nombre: 'ID Socio comercial',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const DESPACHO_LDA = {
  label_nombre: 'RFC autorización LDA',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const DESPACHO_DD = {
  label_nombre: 'Autorizacion DDEX',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const HORA_INICIO = {
  label_nombre: 'Hora inicio',
  required: true,
};

export const HORA_FINAL = {
  label_nombre: 'Hora final',
  required: true,
};
export const MESES = [
  { id: '1', mes: 'Enero' },
  { id: '2', mes: 'Febrero' },
  { id: '3', mes: 'Marzo' },
  { id: '4', mes: 'Abril' },
  { id: '5', mes: 'Mayo' },
  { id: '6', mes: 'Junio' },
  { id: '7', mes: 'Julio' },
  { id: '8', mes: 'Agosto' },
  { id: '9', mes: 'Septiembre' },
  { id: '10', mes: 'Octubre' },
  { id: '11', mes: 'Noviembre' },
  { id: '12', mes: 'Diciembre' },
];

export const SEMANA = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
];

export const SEMANA_D = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

export const FECHA_INICIO = {
  label_nombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  label_nombre: 'Fecha final',
  required: true,
  habilitado: true,
};


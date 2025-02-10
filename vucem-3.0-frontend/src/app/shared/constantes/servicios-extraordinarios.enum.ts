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
  labelNombre: 'Industria Automotriz',
  maxlength: 25,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const PROGRAMA_FOMENTO = {
  labelNombre: 'Programa de fomento',
  maxlength: 25,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const IMMEX = {
  labelNombre: 'IMMEX (Número/aaaa)',
  maxlength: 25,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

export const SOCIO_COMERCIAL = {
  labelNombre: 'ID Socio comercial',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};

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
  labelNombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

export const MENSAJEDEALERTA = {
  ADJUNTAR: `<p>Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro</p>`,
};

export const TXT_ALERTA_ACUSE = (folio: string) => {
  return `Tu solicitud ha sido registrada con el siguiente número de folio:  < ${folio} >`;
}

export const TITULO_ACUSE = 'Acuse(s)';

export const ACUSE_SERVICIOS_EXTRAORDINARIOS = {
  txtAlerta:
    'Tu solicitud ha sido registrada con el siguiente número de folio:',
  tituloSeccionAcuse: 'Acuse(s)',
  encabezadoTablaAcuse: [
    {
      key: 'id',
      valor: 'No.',
    },
    {
      key: 'documento',
      valor: 'Documento.',
    },
  ],
  datosTablaAcuse: [
    {
      id: 1,
      idDocumento: 'doc12',
      documento: 'Acuse de recepción de trámite',
    },
  ],
  accionesTablaAcuse: [
    {
      tipo: 'descargar',
      label: 'Descargar',
      icono: 'bi-arrow-bar-down',
    },
  ],
};

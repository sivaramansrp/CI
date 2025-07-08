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

/**
 * Contiene constantes de texto utilizadas para mostrar mensajes e instrucciones en la interfaz de usuario.
 * Estas constantes están diseñadas para ser reutilizadas en diferentes partes de la aplicación.
 * @property {string} INSTRUCCIONES - Instrucciones generales para el usuario para la carga de documentos.
 * @property {string} ADJUNTAR - Mensaje que indica cómo adjuntar un nuevo documento.
 * @property {string} ADJUNTAR_DOCUMENTOS - Mensaje que indica las características que debe cumplir el documento a adjuntar.
 * @property {string} ADJUNTAR_WARNING - Mensaje que advierte sobre el tiempo de carga del documento.
 * @property {string} DECLARACION_DE_RESPONSABILIDAD_SOLIDARIA - Mensaje relacionado con la responsabilidad solidaria del residente en territorio nacional.
 * @property {string} SELECCION_UN_CRITERIO_DE_BUSQUEDA - Mensaje que indica que se debe seleccionar un criterio de búsqueda.
 * @property {string} REQUISITOS_GUARDADOS_CORRECTAMENTE - Mensaje que indica que los requisitos se han guardado correctamente.   
 * @property {string} INSTRUCCIONES_AGREGAR_NUEVO - Instrucciones para agregar un nuevo documento.
 */
export const TEXTOS = {
  INSTRUCCIONES: `<h5>Nota: </h5>
  <ul>
    <li>De acuerdo al caso particular, algunos documentos podrían ser obligatorios</li>
    <li>En caso de que no requieras algún documento, selecciónalo y elimínalo</li>
    <li>Si necesitas anexar más de un documento del mismo tipo, da clic en el botón <i class="bi bi-plus-circle-fill"></i> para agregar cuantos necesites.</li>
  </ul>`,
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
  ADJUNTAR_DOCUMENTOS: `<p>Para poder adjuntar tu documento, deberá cumplir las signuientes características:</p>
  <p><b>•</b> Debe ser formato PDF que no contenga formularios, objetos OLE incrustrados, código java script, etc.</p>
  <p><b>•</b> No debe contener páginas en blanco.</p>`,
  ADJUNTAR_WARNING: `<p>La carga del documento puede tardar varios segundos, este tiempo dependerá del tamaño de tu archivo y de la velocidad de tu conexión.</p>`,
  DECLARACION_DE_RESPONSABILIDAD_SOLIDARIA: `*? En mi calidad de Residente en Territorio Nacional, manifiesto mi voluntad y disposición de asumir la responsabilidad solidaria a que se refiere la fracción VIII del artículo 26 del Código Fiscal de la Federación, por los créditos fiscales que lleguen a derivarse por no retornar las Mercancías a que el presente aviso se refiere, al extranjero dentro del plazo establecido en la Ley"`,
  SELECCION_UN_CRITERIO_DE_BUSQUEDA: `Selecciona un criterio de búsqueda`,
  REQUISITOS_GUARDADOS_CORRECTAMENTE: `Requisitos guardados correctamente`,
  INSTRUCCIONES_AGREGAR_NUEVO: `<h6>Instrucciones</h6>
  <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
  <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
  <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo"</p>`,
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
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export const SEMANA_D = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const MENSAJEDEALERTA = {
  ADJUNTAR: `<p style="text-align: center;">Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro</p>`,
};

export const MENSAJE_ALERTA_TRATADOS = {
  MENSAJE_ALERTA: `
<ul>
  Para seleccionar un tratado y criterio, siga los siguientes pasos:
  <li>Primero seleccione un país o bloque</li>
  <li>Después seleccione un tratado o acuerdo</li>
  <li>Seleccione el criterio para conferir origen</li>
  <li>Finalmente, agregue su selección a la lista de tratados</li>
</ul>
`,
};
export const ELVALORALERTA = {
  ADJUNTAR: `<p>El valor de la transacción debe ser mayor al valor de dólares para insumos/envases.</p>`,
};

export const PROTESTA = {
  ADJUNTAR: `
  El/la que suscribe manifiesto(a) bajo protesta de decir verdad, que la información declarada en el presente trámite de REGISTRO ÚNICO DE PRODUCTOS ELEGIBLES PARA PREFERENCIAS Y CONCESIONES ARANCELARIAS es copia fiel, íntegra e inalterada de la información y documentación soporte que obra en poder del (de la) solicitante.`,
};
export const FECHA_SALIDA = {
  labelNombre: 'Fecha de expedición de certificado de molino o de calidad',
  required: true,
  habilitado: true,
};

export const TXT_ALERTA_ACUSE = (folio: string): string => {
  return `Tu solicitud ha sido registrada con el siguiente número de folio:  < ${folio} >`;
};

export const TITULO_ACUSE = 'Acuse(s)';
export const ENCABEZADO_TABLA_ACUSE = [
  {
    key: 'id',
    valor: 'No.',
  },
  {
    key: 'documento',
    valor: 'Documento.',
  },
];
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
      urlPdf: 'assets/pdf/Test03.pdf',
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
export const IMPORTANTE = {
  Importante: `<p><strong>Importante: </strong>Si existe duda respecto del producto a registrar o al pago correspondiente, favor de comunicarse a los teléfonos 55 5128 2544, 55 5128 2595 y 55 5128 2553</p>`,
};

export const MERCHANDISE_IMPORTANTE = {
  Importante: `<p><strong>Importante: </strong>Si existe duda respecto del producto a registrar o al pago correspondiente, por favor comunicate a los teléfonos 0155 5128 2544 y 0155 5128 2595</p>`,
};

export const ALERTA_DE_MATERIAL = {
  ADJUNTAR: `<p>de no existir el material en el sistema, debes de realizer la gestión de la solicitud en físico y de manera presencial.</p>`,
};

export const PAGO_DE_DERECHOS = {
  ADJUNTAR: `<h5>Aviso de privacidad simplificado</h5>
  <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior. Para mayor información acerca del tratamiento y derechos que puede hacer valer, usted puede acceder al aviso integral en el portal www.sat.gob.mx.</p>`,
};

export const PASOS4 = [
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

export const AVISO = {
  Aviso: `<p style="text-align: center; font-weight: bold;">Aviso de privacidad simplificado:</p>
  <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio </p>`,
};

export const AL_DAR = {
  AlDar: `<p>Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.</p>`
};

export const SECTORESY = {
  alerta: `<p>Para continuar con el trámite, debes agregar por lo menos una mercancía.</p>`,
};

export const FIRMAR = {
  alerta: `<p>La solicitud ha sido guardada exitosamente. Tiene 15 días naturales para firmarla, después de ese tiempo desaparecerá del listado de solicitudes pendientes por firmar. Número de solicitud [202758747]</p>`,
};

export const SOLICITUD = {
  alerta: `<p>Tu solicitud ha sido registrada con el siguiente número de folio <0200900200120242540000002>.</p>`,
};

export const TODOS_PASOS = {
  Importante: `<p>La Solicitud ha quedado registrada con el número temporal 202767557. Éste no tiene validez legal y sirve solamente para
  efectos de identificar tu Solicitud. Un folio oficial le será asignado a la Solicitud al momento en que ésta sea firmada.</p>`,
};

export const MANIFIESTOS = {
  Importante: `<div class="form-check d-flex">
   <input class="form-check-input" type="checkbox" id="manifiestos">* 
  <label class="form-check-label" for="manifiestos">
    Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.
  </label>
  </div>`
};

export const REQUISITOS = {
  Importante: `<p>La solicitud ha quedado registrada con el número temporal 202767918. Éste no tiene validez legal y sirve solamente para
efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.</p>`
};

export const REQUISITOS_OPCIONALES = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
  <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
  <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
  <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo"</p>`,
};

export const ANEXAR = {
  Importante: `<p>
Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos".</p>`
};


export const LASTABLA = {
  Importante: `<p>Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.</p>`
};

export const TERCEROS = {
  alerta: `<p>Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.</p>`,
}


export const URL_PRUEBA = 'assets/pdf/Test03.pdf';

export const PASOS_REQUERIMIENTOS = [
  {
    indice: 1,
    titulo: 'Requerimiento de información',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Requerimiento de datos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Anexar documentos',
    activo: false,
    completado: false,
  },
  {
    indice: 4,
    titulo: 'Firmar promoción',
    activo: false,
    completado: false,
  },
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

export const PRECAUCION = '<strong>¡Precaución!</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.';


  /**
   * @const REGEX_FECHA_MES_ANO
   * @description Expresión regular para validar fechas en el formato "MM/AAAA", donde:
   * - "MM" representa el mes en dos dígitos (01 a 12).
   * - "AAAA" representa el año en cuatro dígitos.
   * 
   * @example
   * ```typescript
   * const fechaValida = REGEX_FECHA_MES_ANO.test("03/2023"); // true
   * const fechaInvalida = REGEX_FECHA_MES_ANO.test("13/2023"); // false
   * ```
   * 
   */
  export const REGEX_FECHA_MES_ANO = /^(0[1-9]|1[0-2])\/\d{4}$/;

/**
 * @const FECHA_INICIO_VIGENCIA
 * @description Objeto que define la configuración de la fecha de inicio de vigencia.
 */
export const FECHA_INICIO_VIGENCIA = {
  labelNombre: 'Fecha inicio:',
  required: false,
  habilitado: false,
};

/**
 * @const FECHA_FINAL_VIGENCIA
 * @description Objeto que define la configuración de la fecha final de vigencia.
 */
export const FECHA_FINAL_VIGENCIA = {
  labelNombre: 'Fecha fin:',
  required: false,
  habilitado: false,
};

/**
 * @const FECHA_INICIO_VIGENCIA_DEL_CUPO
 * @description Objeto que define la configuración de la fecha de inicio de vigencia del cupo.
 */
export const FECHA_INICIO_VIGENCIA_DEL_CUPO = {
  labelNombre: 'Fecha inicio vigencia del cupo:',
  required: false,
  habilitado: false,
};

/**
 * @const FECHA_FINAL_VIGENCIA_DEL_CUPO
 * @description Objeto que define la configuración de la fecha final de vigencia del cupo.
 */
export const FECHA_FINAL_VIGENCIA_DEL_CUPO = {
  labelNombre: 'Fecha fin vigencia del cupo:',
  required: false,
  habilitado: false,
};

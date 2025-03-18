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
  ADVERTENCIA: `Debes seleccionar al menos un registro para continuar`
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

export const MENSAJE_ALERTA_TRATADOS = {
  MENSAJE_ALERTA:`
<ul>
  Para seleccionar un tratado y criterio, siga los siguientes pasos:
  <li>Primero seleccione un país o bloque</li>
  <li>Después seleccione un tratado o acuerdo</li>
  <li>Seleccione el criterio para conferir origen</li>
  <li>Finalmente, agregue su selección a la lista de tratados</li>
</ul>
`}
export const ELVALORALERTA = {
  ADJUNTAR: `<p>El valor de la transacción debe ser mayor al valor de dólares para insumos/envases.</p>`,
};

export const PROTESTA = {
  ADJUNTAR: `<input class="form-check-input" type="checkbox" id="protesta">
  <p>El/la que suscribe manifiesto(a) bajo protesta de decir verdad, que la información declarada en el presente trámite de REGISTRO ÚNICO DE PRODUCTOS ELEGIBLES PARA PREFERENCIAS Y CONCESIONES ARANCELARIAS es copia fiel, íntegra e inalterada de la información y documentación soporte que obra en poder del (de la) solicitante.</p>`,
}
export const FECHA_SALIDA = {
  labelNombre:'Fecha de expedición de certificado de Molino o de calidad',
  required: true,
  habilitado: false,
}

export const TXT_ALERTA_ACUSE = (folio: string) => {
  return `Tu solicitud ha sido registrada con el siguiente número de folio:  < ${folio} >`;
}

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
export const Importante = {
  Importante: `<p><strong>Importante:</strong> Si existe duda respecto del producto a registrar o al pago correspondiente, favor de comunicarse a los teléfonos 55 5128 2544, 55 5128 2595 y 55 5128 2553</p>`,
};

export const ALERTA_DE_MATERIAL = {
  ADJUNTAR: `<p>de no existir el material en el sistema, debes de realizer la gestión de la solicitud en físico y de manera presencial.</p>`,
}

export const PAGO_DE_DERECHOS = {
  ADJUNTAR: `<h5>Aviso de privacidad simplificado</h5>
  <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior. Para mayor información acerca del tratamiento y derechos que puede hacer valer, usted puede acceder al aviso integral en el portal www.sat.gob.mx.</p>`,
}

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
  }
];

export const Aviso = {
  Aviso: `<p style="text-align: center; font-weight: bold;">Aviso de privacidad simplificado:</p>
  <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio </p>`
};

export const Sectoresy = {
  alerta: `<p>Para continuar con el trámite, debes agregar por lo menos una mercancía.</p>`,
}

export const firmar = {
  alerta: `<p>La solicitud ha sido guardada exitosamente. Tiene 15 días naturales para firmarla, después de ese tiempo desaparecerá
del listado de solicitudes pendientes por firmar. Número de solicitud [202758747]</p>`,
}

export const solicitud = {
  alerta: `<p>Tu solicitud ha sido registrada con el siguiente número de folio <0200900200120242540000002>.</p>`,
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

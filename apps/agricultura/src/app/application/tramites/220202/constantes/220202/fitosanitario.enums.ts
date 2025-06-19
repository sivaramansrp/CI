/**
 * @description Constante que define los pasos del formulario.
 * Cada objeto representa un paso con su índice, título, estado activo y completado.
 * @constant {Array<Object>} PASOS
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
        indice: 3,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    }
];



/**
 * @description Constante que define los campos para persona moral o física nacional.
 * Cada objeto representa un campo con su etiqueta, nombre de campo, clase CSS, tipo de input,
 * estado disabled, tooltip, validadores y placeholder.
 * @constant {Array<Object>} FITOSANITARIO_PERSONA_MORAL_O_FISICA_NACIONAL
 */
export const FITOSANITARIO_PERSONA_MORAL_O_FISICA_NACIONAL = [
    {
        labelNombre: 'País',
        campo: 'pais',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'País',
        validators: ['required', 'maxLength:120'],
        placeholder: '',
    },
    {
        labelNombre: 'Código Postal',
        campo: 'codigoPostal',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Código Postal',
        validators: ['required', 'maxLength:10'],
        placeholder: '',
    },
    {
        labelNombre: 'Estado',
        campo: 'entidadFederativa',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Estado',
        validators: ['required', 'maxLength:50'],
        placeholder: '',
    },
    {
        labelNombre: 'Municipio o alcaldía',
        campo: 'municipio',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Municipio o alcaldía',
        validators: ['required', 'maxLength:120'],
        placeholder: '',
    },
    {
        labelNombre: 'Localidad',
        campo: 'localidad',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Localidad',
        validators: ['required', 'maxLength:68'],
        placeholder: '',
    },
    {
        labelNombre: 'Colonia',
        campo: 'colonia',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Colonia',
        validators: ['required', 'maxLength:68'],
        placeholder: '',
    },
    {
        labelNombre: 'Calle',
        campo: 'calle',
        class: 'col-md-8',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Calle',
        validators: ['required', 'maxLength:68'],
        placeholder: '',
    },
    {
        labelNombre: 'Número exterior',
        campo: 'nExt',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Número exterior',
        validators: ['required', 'maxLength:10'],
        placeholder: '',
    },
    {
        labelNombre: 'Número interior',
        campo: 'nInt',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Número interior',
        validators: ['maxLength:15'],
        placeholder: '',
    },
    {
        labelNombre: 'Lada',
        campo: 'lada',
        class: 'col-md-1',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Lada',
        validators: ['required', 'maxLength:15'],
        placeholder: '',
    },
    {
        labelNombre: 'Teléfono',
        campo: 'telefono',
        class: 'col-md-3',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Teléfono',
        validators: ['required', 'maxLength:15'],
        placeholder: '',
    },
];

/**
 * @description Constante que define la instrucción para el doble clic en la tabla.
 * @constant {string} INSTRUCCION_DOBLE_CLIC
 */
export const INSTRUCCION_DOBLE_CLIC = 'Al dar doble clic en el registro seleccionado creara una nueva solicitud con los mismos datos de la solicitud elegida.';

/**
 * @description Constante que define el mensaje para tablas obligatorias.
 * @constant {string} ESREQUIREDTABLESMENSAJE
 */
export const ES_REQUERIDO_TABLAS_MENSAJE = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * @description Constante que define la configuración para el input de fecha de pago.
 * @constant {Object} FECHA_DE_PAGO
 */
export const FECHA_DE_PAGO = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: true,
};
/**
 * @description Constante que define la configuración para el input de fecha de pago.
 * @constant {Object} TEXTOS_REQUISITOS
 */
export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};
/**
 * @description Constante que define la configuración para el input de fecha de pago.
 * Esta constante contiene la ruta relativa a los archivos JSON necesarios para la configuración.
 * @constant {Object} URL
 */
export const URL = '../../../../../assets/json/220202/';

/**
 * @description Constante que define la configuración para el input de fecha final de pago en acuicultura.
 * Esta constante se utiliza para establecer las propiedades del campo de fecha de pago, indicando que es requerido y no habilitado.
 * @constant {Object}
 */
export const FECHA_SALIDA_ACUICULTURA = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: false,
};

/**
 * @description Constantes con las opciones de radio para la exención de pago.
 */
export const TIPO_RADIO = [
    {
        label: "No",
        value: "No"
    },
    {
        label: "Sí",
        value: "Si"
    }
];

/**
 * Contiene el texto HTML para mostrar un aviso de privacidad simplificado.
 * Este aviso informa al usuario sobre el tratamiento de datos personales por parte del Servicio de Administración Tributaria (SAT)
 * a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCE).
 * Incluye información sobre el uso, transferencia y protección de los datos personales, así como un enlace al aviso de privacidad integral.
 *
 * @constant
 * @type {string}
 */
export const ALERT_TEXTO = `<div>  
  <div style="text-align: center; margin-bottom: 10px;">
    <strong style="color: #007baf;">Aviso de privacidad simplificado</strong>
  </div>
  <p style="margin-top: 10px; text-align: justify;">
    El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCE), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.
  </p>
  <p style="margin-top: 10px;text-align: center;">
    <a href="#" style="text-decoration: underline;">Aviso de privacidad integral</a>
  </p>
</div>
`;
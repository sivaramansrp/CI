/**
 * @fileoverview Constantes y textos utilizados en el trámite de Certificado Zoosanitario.
 * Incluye pasos del proceso, textos de ayuda, mensajes de éxito, configuraciones de formularios y otros valores reutilizables.
 * @module certificadoZoosanitarioEnum
 */

/**
 * Pasos del proceso de trámite del certificado zoosanitario.
 * Cada objeto representa un paso con su índice, título, y estado de actividad/completado.
 * @const
 * @type {Array<{indice: number, titulo: string, activo: boolean, completado: boolean}>}
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
 * Textos de ayuda e instrucciones para la sección de requisitos.
 * Incluye instrucciones y mensajes para adjuntar documentos.
 * @const
 * @type {{INSTRUCCIONES: string, ADJUNTAR: string}}
 */
export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * Mensaje mostrado al usuario cuando la etapa uno se completa exitosamente.
 * @const
 * @type {string}
 */
export const MENSAJE_DE_EXITO_ETAPA_UNO = `La solicitud ha quedado registrada con el número temporal 202758511. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`;

/**
 * Configuración de campos para el formulario de solicitante física nacional.
 * Cada objeto representa un campo del formulario con sus propiedades.
 * @const
 * @type {Array<{labelNombre: string, campo: string, class: string, tipo_input: string, disabled: boolean, tooltip?: string, validators: string[], placeholder: string}>}
 */
export const ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL = [
  {
    labelNombre: 'Registro federal de contribuyentes:',
    campo: 'rfc',
    class: 'col-md-4',
    tipo_input: 'text',
    disabled: true,
    tooltip: 'Registro federal de contribuyentes:',
    validators: ['required'],
    placeholder: '',
  },
  {
    labelNombre: 'Denominación o razón social:',
    campo: 'nombreRazonSocial',
    class: 'col-md-8',
    tipo_input: 'text',
    disabled: true,
    tooltip: 'Denominación o razón social',
    validators: ['required'],
    placeholder: '',
  },
  {
    labelNombre: 'Actividad económica preponderante:',
    campo: 'actEconomica',
    class: 'col-md-12',
    tipo_input: 'text',
    disabled: true,
    validators: ['required'],
    placeholder: '',
  },
  {
    labelNombre: 'Correo electrónico',
    campo: 'correo',
    class: 'col-md-4',
    tipo_input: 'text',
    disabled: true,
    validators: ['required'],
    placeholder: '',
  },
];

/**
 * Configuración para el campo de fecha de pago.
 * @const
 * @type {{labelNombre: string, required: boolean, habilitado: boolean}}
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: false,
};

/**
 * Texto de ayuda para agregar mercancía en el trámite.
 * @const
 * @type {string}
 */
export const TEXTOS =
  'Para continuar con el trámite, deberá agregar por lo menos una mercancía.';

/**
 * Texto de alerta para la sección de terceros.
 * @const
 * @type {string}
 */
export const TERCEROR_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * Identificador de usuario por defecto.
 * @const
 * @type {number}
 */
export const IDDEUSUARIO = 21;

/**
 * Fecha de pago por defecto (formato DD/MM/YYYY).
 * @const
 * @type {string}
 */
export const FECHAPAGODATE = '15/03/2025'

/**
 * @description
 * Mensaje que indica que al dar doble clic en el registro seleccionado se creará una nueva solicitud
 * con los mismos datos de la solicitud elegida.
 *
 * @compodoc
 * @es
 * Mensaje mostrado al usuario cuando realiza doble clic en un registro, informando que se generará
 * una nueva solicitud con los datos de la solicitud seleccionada.
 * @const
 * @type {string}
 */
export const SELECCIONADO = 'Al dar doble clic en el registro seleccionado creara una nueva solicitud con los mismos datos de la solicitud elegida';
/**
 * Fecha de pago por defecto (formato DD/MM/YYYY).
 * @const
 * @type {string}
 */
export const ERROR_FORMA_ALERT =
  `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`

export const PRIVACY_NOTICE_CONTENT = `
  <div class="my-4">
  <div class="text-center">
    <h4 class="mb-4">Aviso de privacidad simplificado</h4>
    </div>
    <div>
    <p class="text-justify">
      El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.
    </p>
    </div>
    <div class="text-center">
      <a class="text-primary" style="cursor: pointer;" (click)="seccionStore.establecerSeccion([false])">
        Aviso de privacidad integral
      </a>
    </div>
  </div>
`;

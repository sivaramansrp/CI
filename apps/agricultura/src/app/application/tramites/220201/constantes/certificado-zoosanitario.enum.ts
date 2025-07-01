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
export const FECHAPAGODATE ='15/03/2025'

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
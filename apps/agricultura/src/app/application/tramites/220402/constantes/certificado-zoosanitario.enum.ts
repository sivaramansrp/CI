/**
 * Pasos del trámite.
 * 
 * Define los pasos necesarios para completar el trámite, incluyendo su índice, título, 
 * y estado (activo o completado).
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
 * Textos relacionados con los requisitos del trámite.
 * 
 * Contiene instrucciones y mensajes para guiar al usuario en la anexión de documentos.
 */
export const TEXTOS_REQUISITOS = {
  /**
   * Instrucciones para anexar documentos.
   */
  INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,

  /**
   * Mensaje para adjuntar nuevos documentos.
   */
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * Mensaje de éxito para la etapa uno del trámite.
 * 
 * Este mensaje se muestra cuando la solicitud ha sido registrada exitosamente con un número temporal.
 */
export const MENSAJE_DE_EXITO_ETAPA_UNO = `La solicitud ha quedado registrada con el número temporal 202758511. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`;

/**
 * Configuración de los campos para el solicitante físico nacional en el trámite zoosanitario.
 * 
 * Define los campos, etiquetas, clases CSS, validaciones y otros atributos para el formulario del solicitante.
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
 * 
 * Define la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: false,
};

/**
 * Mensaje informativo para continuar con el trámite.
 * 
 * Este mensaje indica que se debe agregar al menos una mercancía para continuar.
 */
export const TEXTOS = 'Para continuar con el trámite, deberá agregar por lo menos una mercancía.';

/**
 * Mensaje de alerta para tablas obligatorias.
 * 
 * Indica que las tablas marcadas con asterisco son obligatorias y deben contener al menos un registro.
 */
export const TERCEROR_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * Identificador del usuario.
 * 
 * Representa el ID del usuario en el sistema.
 */
export const IDDEUSUARIO = 21;
/**
 * @constant RADIO_OPCIONS
 * @description Opciones de radio para seleccionar "Exportación" o "Reexportación".
 */
export const RADIO_OPCIONS = [
  { label: 'Exportación', value: 'exportacion' },
  { label: 'Reexportación', value: 'reexportacion' },
];

/**
 * @constant EXENTO_DE_PAGO
 * @description Opciones de radio para seleccionar "No" o "Si".
 */
export const EXENTO_DE_PAGO = [
  { label: 'No', value: 'No' },
  { label: 'Si', value: 'Si' },
];

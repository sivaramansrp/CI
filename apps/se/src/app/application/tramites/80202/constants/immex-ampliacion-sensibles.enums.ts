/**
 * Constante que define los pasos de un proceso específico.
 * 
 * Cada paso contiene la siguiente información:
 * - `indice`: Número que representa el orden del paso en el proceso.
 * - `titulo`: Descripción breve del paso.
 * - `activo`: Indica si el paso está activo actualmente.
 * - `completado`: Indica si el paso ha sido completado.
 * 
 * Esta constante puede ser utilizada para controlar el flujo de un proceso
 * y determinar el estado de cada paso.
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
    titulo: 'Anexar necesarios',
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

/**
 * Contiene los textos utilizados como requisitos en la aplicación.
 * 
 * @property INSTRUCCIONES - Instrucciones detalladas para el usuario sobre cómo manejar los documentos requeridos.
 *   - Explica que algunos documentos podrían ser obligatorios dependiendo del caso.
 *   - Indica cómo eliminar documentos no necesarios.
 *   - Proporciona instrucciones para anexar múltiples documentos del mismo tipo.
 * 
 * @property ADJUNTAR - Texto que guía al usuario sobre cómo adjuntar nuevos documentos.
 *   - Explica el proceso para seleccionar y adjuntar documentos adicionales.
 */
export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * Mensaje de éxito para la etapa uno del proceso de solicitud.
 * Este mensaje informa al usuario que la solicitud ha sido registrada
 * con un número temporal, el cual no tiene validez legal y sirve únicamente
 * para identificar la solicitud. Se asignará un folio oficial cuando la
 * solicitud sea firmada.
 */
export const MENSAJE_DE_EXITO_ETAPA_UNO = `La solicitud ha quedado registrada con el número temporal 202758511. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`;
/**
 * Constante que define los campos y configuraciones para el formulario
 * de un solicitante físico nacional en el contexto zoosanitario.
 * 
 * Cada objeto dentro del arreglo representa un campo del formulario con
 * las siguientes propiedades:
 * 
 * - `labelNombre`: Etiqueta que describe el campo.
 * - `campo`: Nombre del campo utilizado para enlazar datos.
 * - `class`: Clase CSS para definir el diseño del campo.
 * - `tipo_input`: Tipo de entrada del campo (por ejemplo, texto).
 * - `disabled`: Indica si el campo está deshabilitado.
 * - `tooltip`: Texto de ayuda que se muestra al usuario.
 * - `validators`: Lista de validaciones aplicadas al campo.
 * - `placeholder`: Texto de marcador de posición para el campo.
 * 
 * Esta configuración está diseñada para ser utilizada en formularios
 * donde los datos del solicitante son predefinidos y no editables.
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
 * Constante que representa la configuración para la "Fecha de pago".
 * 
 * @property {string} labelNombre - Etiqueta que describe el nombre del campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado o no.
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: false,
};
/**
 * Constante que contiene un mensaje de texto utilizado para indicar
 * que se debe agregar al menos una mercancía para continuar con el trámite.
 */
export const TEXTOS =
  'Para continuar con el trámite, deberá agregar por lo menos una mercancía.';
/**
 * Constante que define un mensaje de alerta para indicar que las tablas 
 * marcadas con un asterisco son obligatorias y deben contener al menos 
 * un registro.
 */
export const TERCEROR_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
/**
 * Constante que representa el identificador único del usuario.
 * 
 * @const IDDEUSUARIO
 * @type {number}
 * @description Utilizado para identificar al usuario en el sistema.
 * @valor 21
 */
export const IDDEUSUARIO = 21;

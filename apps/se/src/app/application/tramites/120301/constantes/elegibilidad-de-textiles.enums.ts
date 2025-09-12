/**
 * Constantes utilizadas en el trámite 120301 para la configuración de pasos, mensajes y datos relacionados con el procedimiento de elegibilidad de textiles.
 *
 * Este archivo contiene configuraciones que definen los pasos del trámite, textos de instrucciones, configuraciones de formularios,
 * definiciones de tablas, catálogos predefinidos y mensajes informativos específicos para el proceso de elegibilidad de textiles
 * en el sistema VUCEM.
 *
 * @fileoverview Constantes y enumeraciones para el trámite de elegibilidad de textiles.
 * @module ElegibilidadDeTextilesEnums
 * @author Sistema VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 * @namespace ElegibilidadTextiles
 */

/**
 * Configuración de los pasos del trámite de elegibilidad de textiles.
 *
 * Cada paso está representado por un objeto que contiene las siguientes propiedades:
 * - `indice`: Número secuencial del paso en el flujo del trámite.
 * - `titulo`: Título descriptivo del paso del trámite.
 * - `activo`: Indica si el paso está actualmente activo para el usuario.
 * - `completado`: Indica si el paso ha sido completado exitosamente.
 *
 * @constant {Array<Object>}
 */
export const PASOS = [
    {
        /**
         * @property {number} indice
         * Número secuencial del paso en el flujo del trámite.
         */
        indice: 1,

        /**
         * @property {string} titulo
         * Título descriptivo del paso del trámite.
         */
        titulo: 'Capturar solicitud',

        /**
         * @property {boolean} activo
         * Indica si el paso está actualmente activo para el usuario.
         */
        activo: true,

        /**
         * @property {boolean} completado
         * Indica si el paso ha sido completado exitosamente.
         */
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Requisitos necesarios',
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

/**
 * Textos de instrucciones y mensajes relacionados con los requisitos del trámite de elegibilidad de textiles.
 *
 * Contiene las instrucciones generales para el manejo de documentos y las instrucciones específicas
 * para adjuntar nuevos documentos al trámite.
 *
 * @constant {Object}
 */
export const TEXTOS_REQUISITOS = {
    /**
     * @property {string} INSTRUCCIONES
     * Texto HTML con las instrucciones generales para el manejo de documentos.
     */
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,

    /**
     * @property {string} ADJUNTAR
     * Texto HTML con instrucciones específicas para adjuntar nuevos documentos.
     */
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * Configuración de los campos del formulario para el solicitante físico nacional en el trámite zoosanitario de elegibilidad de textiles.
 *
 * Cada campo está representado por un objeto que contiene las siguientes propiedades:
 * - `labelNombre`: Etiqueta descriptiva que se muestra al usuario para el campo.
 * - `campo`: Nombre del campo en el modelo de datos (usado para binding).
 * - `class`: Clases CSS de Bootstrap para el layout responsivo del campo.
 * - `tipo_input`: Tipo de input HTML (text, email, number, etc.).
 * - `disabled`: Indica si el campo está deshabilitado para edición.
 * - `tooltip`: Texto de ayuda que se muestra al hacer hover sobre el campo.
 * - `validators`: Lista de validadores aplicables al campo (required, email, etc.).
 * - `placeholder`: Texto de placeholder para el input.
 *
 * @constant {Array<Object>}
 */
export const ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL = [
    {
        /**
         * @property {string} labelNombre
         * Etiqueta descriptiva que se muestra al usuario para el campo.
         */
        labelNombre: 'Registro federal de contribuyentes:',

        /**
         * @property {string} campo
         * Nombre del campo en el modelo de datos (usado para binding).
         */
        campo: 'rfc',

        /**
         * @property {string} class
         * Clases CSS de Bootstrap para el layout responsivo del campo.
         */
        class: 'col-md-4',

        /**
         * @property {string} tipo_input
         * Tipo de input HTML (text, email, number, etc.).
         */
        tipo_input: 'text',

        /**
         * @property {boolean} disabled
         * Indica si el campo está deshabilitado para edición.
         */
        disabled: true,

        /**
         * @property {string} tooltip
         * Texto de ayuda que se muestra al hacer hover sobre el campo.
         */
        tooltip: 'Registro federal de contribuyentes:',

        /**
         * @property {Array<string>} validators
         * Lista de validadores aplicables al campo (required, email, etc.).
         */
        validators: ['required'],

        /**
         * @property {string} placeholder
         * Texto de placeholder para el input.
         */
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
    }
];

/**
 * Configuración para el campo de fecha de expedición de la factura en el trámite de elegibilidad de textiles.
 *
 * Contiene las propiedades de configuración para el comportamiento y apariencia del campo de fecha.
 *
 * @constant {Object}
 */
export const EXPEDICION_FACTURA_FECHA = {
    /**
     * @property {string} labelNombre
     * Etiqueta descriptiva para el campo de fecha.
     */
    labelNombre: 'Fecha de expedición de la factura:',

    /**
     * @property {boolean} required
     * Indica si el campo es obligatorio en el formulario.
     */
    required: true,

    /**
     * @property {boolean} habilitado
     * Controla si el campo está habilitado para interacción del usuario.
     */
    habilitado: false,
};

/**
 * Mensaje informativo para continuar con el trámite de elegibilidad de textiles.
 *
 * Se utiliza para indicar al usuario que debe agregar al menos una mercancía antes de proceder
 * con el siguiente paso del trámite.
 *
 * @constant {string}
 */
export const TEXTOS = 'Para continuar con el trámite, deberá agregar por lo menos una mercancía.';

/**
 * Mensaje de alerta sobre la obligatoriedad de completar ciertas tablas en el trámite.
 *
 * Se muestra como mensaje de advertencia para indicar que las tablas marcadas con asterisco
 * son obligatorias y requieren al menos un registro.
 *
 * @constant {string}
 */
export const TERCERO_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * Identificador único del usuario actual en el sistema VUCEM para el trámite de elegibilidad de textiles.
 *
 * @constant {number}
 */
export const ID_DE_USUARIO = 21;

/**
 * Configuración de las columnas de la tabla de facturas para el trámite de elegibilidad de textiles.
 *
 * Define los encabezados de columnas que se muestran en la tabla de facturas del sistema.
 *
 * @constant {Array<string>}
 */
export const FACTUS_TBCOL = [
    'Número de la factura',
    'Razón social',
    'Domicilio',
    'Fecha de expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
    'Unidad de medida',
    'Valor en dólares',
];

/**
 * Configuración de las columnas de la tabla del historial de fabricantes para el trámite de elegibilidad de textiles.
 *
 * Define los encabezados de columnas para mostrar el historial de fabricantes registrados.
 *
 * @constant {Array<string>}
 */
export const HISTORICO_TBCOL = [
    'Nombre del fabricante',
    'Número de registro fiscal',
    'Dirección',
    'Correo Electrónico',
    'Teléfono',
];

/**
 * Configuración de las columnas de la tabla de facturas asociadas al trámite de elegibilidad de textiles.
 *
 * Define los encabezados de columnas para mostrar las facturas que están asociadas al trámite actual.
 *
 * @constant {Array<string>}
 */
export const ASOCIADAS_TBCOL = [
    'Candidad asociada',
    'número de la factura',
    'razón social',
    'Domicilio',
    'Fecha de emisión/expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
];

/**
 * Configuración de las columnas de la tabla de captura de facturas para el trámite de elegibilidad de textiles.
 *
 * Define los encabezados de columnas para la tabla donde se capturan nuevas facturas.
 *
 * @constant {Array<string>}
 */
export const CPATURAR_TBCOL = [
    'Número de la factura',
    'Razón social',
    'Domicilio',
    'Fecha de expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
    'Unidad de medida',
    'Valor en dólares',
];

/**
 * Opciones de catálogo predefinidas para los componentes dropdown del trámite de elegibilidad de textiles.
 *
 * Cada opción está representada por un objeto que contiene las siguientes propiedades:
 * - `id`: Identificador único de la opción del catálogo.
 * - `descripcion`: Texto descriptivo que se muestra al usuario en el dropdown.
 *
 * @constant {Array<Object>}
 */
export const CATALOGOS = [
    {
        /**
         * @property {number} id
         * Identificador único de la opción del catálogo.
         */
        id: 1,

        /**
         * @property {string} descripcion
         * Texto descriptivo que se muestra al usuario en el dropdown.
         */
        descripcion: 'Option 1'
    },
    { id: 2, descripcion: 'Option 2' },
    { id: 3, descripcion: 'Option 3' }
];

/**
 * Constante que representa el estado de validación exitosa en el trámite de elegibilidad de textiles.
 *
 * @constant {string}
 */
export const VALIDO = 'TodoValido'

/**
 * Mensaje aclaratorio sobre la representación federal de montos en el sistema VUCEM para el trámite de elegibilidad de textiles.
 *
 * Se muestra como nota informativa para aclarar que los montos son referenciales debido a transacciones constantes.
 *
 * @constant {string}
 */
export const REPRESENTACION_FEDERAL_NOTA = '*El monto mostrado es de carácter informativo no corresponde al saldo real debido a la realización de transacciones de forma constante a nivel nacional.';

/**
 * Constante que define el mensaje de error para validación de formularios.
 * 
 * Este mensaje se utiliza para informar al usuario que faltan campos por capturar
 * antes de poder continuar al siguiente paso del trámite.
 */
export const ERROR_FORMA_ALERT = `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12 campos-requeridos">
      <p>Faltan campos por capturar</p>
    </div>
  </div>
</div>
`;
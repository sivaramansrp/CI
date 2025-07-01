/**
 * @description
 * Contiene los textos utilizados en la interfaz de usuario para el trámite 220502.
 *
 * @property {string} TEXTOS_SOLICITUD - Mensaje que indica que al dar doble clic en un registro se creará una nueva solicitud con los mismos datos de la solicitud seleccionada.
 * @property {string} SECCION_LEYENDA_CONFIRMAR_TEXTOS - Leyenda que instruye al usuario sobre cómo declarar la cantidad ingresada en parcialidad por fracción arancelaria y explica el funcionamiento de la columna "Saldo pendiente".
 *
 * @module TextoEnum
 */
export const TEXTOS = {
    TEXTOS_SOLICITUD: 'Al dar doble clic en el registro seleccionado creará una Nueva solicitud con los mismos datos de la solicitud elegida.',
    SECCION_LEYENDA_CONFIRMAR_TEXTOS: 'Debes declarar la cantidad que ingresa en parcialidad por cada fracción arancelaria. La columna "Saldo pendiente" mostrará el saldo disponible para las siguientes parcialidades.'
}

/**
 * Constante que define las propiedades del campo de entrada para la fecha de inspección.
 *
 * @property {string} labelNombre - Etiqueta que se muestra para el campo de fecha de inspección.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado para edición.
 *
 * @module texto-enum
 */
export const FECHA_INSPECCION_INPUT = {
    labelNombre: 'Fecha de inspección',
    required: true,
    habilitado: false
};
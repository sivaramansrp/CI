/**
 * @const PASOS
 * @description Pasos del proceso para la destrucción o donación de mercancías.
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
    },
];

/**
 * @const AVISO_OPCIONES
 * @description Opciones disponibles para el tipo de aviso en el trámite.
 */
export const AVISO_OPCIONES = [
    { label: 'Aviso de destrucción de mercancía destinada al régimen de depósito fiscal', value: 'deposito_fiscal' },
    { label: 'Aviso de donación de mercancía a favor del Fisco Federal', value: 'fisco_federal' },
];

/**
 * @const MENSAJE
 * @description Mensaje informativo relacionado con el cambio de fecha de destrucción.
 */
export const MENSAJE = "En caso de que el interesado cambie la fecha de destrucción, deberá presentar un nuevo aviso.";

/**
 * @const DESTRUCCION_FECHA
 * @description Configuración para la fecha en la que se llevará a cabo la destrucción.
 */
export const DESTRUCCION_FECHA = {
    labelNombre: 'Fecha en la que se llevará a cabo la destrucción',
    required: true,
    habilitado: false,
};

/**
 * @const CASO_FORTUITO
 * @description Opciones para indicar si se trata de un caso fortuito.
 */
export const CASO_FORTUITO = [
    { label: 'Sí', value: 'si' },
    { label: 'No', value: 'no' },
];

/**
 * @const TEXTO
 * @description Texto informativo relacionado con las unidades de medida y la carta de cupo electrónica.
 */
export const TEXTO = "Deberán tomar en cuenta las unidades de medida conforme a la Tarifa de la Ley de los Impuestos Generales de Importación y Exportación, señaladas en la carta de cupo electrónica emitida por el almacén general de depósito autorizado.";

/**
 * @const ETIQUETA_DE_ARCHIVO
 * @description Etiqueta predeterminada para el archivo cuando no se ha seleccionado ninguno.
 */
export const ETIQUETA_DE_ARCHIVO = "Sin archivo seleccionados";
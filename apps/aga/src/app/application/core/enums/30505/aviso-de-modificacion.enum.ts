

/**
 * @description
 * Mensaje HTML que indica que se debe seleccionar al menos un tipo de aviso.
 *
 * @returns {string} Mensaje de advertencia en formato HTML.
 *
 * @since 1.0.0
 * @module AvisoDeModificacion
 */
export const AVISO_MOD = `<p>Debe seleccionar por lo menos un tipo de aviso</p>`


/**
 * @description Opciones para un control de radio que permite seleccionar entre "Sí" y "No".
 * @type {Array<{ label: string; value: string }>}
 * @memberof AvisoDeModificacion
 * @since 1.0.0
 *
 * @example
 * // Uso en un formulario:
 * <app-radio-group [options]="OPCIONES_RADIO"></app-radio-group>
 */
export const OPCIONES_RADIO = [
    {
        label: 'Sí',
        value: '1',
    },
    {
        label: 'No',
        value: '0',
    }
];
/**
 * @description
 * Arreglo de opciones para un control de radio que permite seleccionar entre "Fusión" y "Escisión".
 * Cada objeto contiene una etiqueta (`label`), un valor (`value`) y un identificador (`id`).
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @since 1.0.0
 *
 * @author Su Nombre
 */

export const FUSION_ESCISION_RADIO = [
    {
        label: 'Fusión',
        value: '1',
        id:'idFusion'
    },
    {
        label: 'Escisión',
        value: '0',
        id:'idEscision'
    }
];

/**
 * @description
 * [ES] Opciones de aviso para fusión o escisión de empresas en el contexto del Registro del Despacho de las Mercancías.
 * Cada objeto representa un tipo de aviso con su respectiva etiqueta, valor e identificador.
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @see [Documentación oficial](https://compodoc.app/)
 */
export const AVISO_RADIO = [
    {
        label: 'Aviso de fusión o escisión de empresas que cuente con la autorización en el Registro del Despacho de las Mercancías y subsista una de ellas.',
        value: '1',
        id: 'fusion1'
    },
    {
        label: ' Aviso de fusión o escisión dos o más empresas que cuenten con la autorización en el registro del despacho de mercancías de las empresas y resulte una nueva',
        value: '0',
        id: 'fusion2'
    }
];

/**
 * @description
 * Arreglo de opciones para un control de radio que representa las respuestas "Sí" y "No".
 * Cada objeto contiene una etiqueta, un valor y un identificador único para el control.
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @example
 * // Uso típico en un formulario:
 * <app-radio-group [options]="SI_NO_RADIO"></app-radio-group>
 *
 * @author Equipo de desarrollo VUCEM
 * @since 1.0.0
 */

export const SI_NO_RADIO = [
    {
        label: 'Sí',
        value: '1',
        id:'idSiCertificacion'
    },
    {
        label: 'No',
        value: '0',
        id:'idNoCertificacion'
    }
];



/**
 * @description
 * [ES] Opciones para el control de radio que permite seleccionar si se realiza el cálculo del ejercicio ("Sí" o "No").
 * Cada objeto contiene una etiqueta (`label`), un valor (`value`) y un identificador (`id`).
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @since 1.0.0
 * @author Equipo de desarrollo VUCEM
 *
 * @example
 * // Uso en un formulario:
 * <app-radio-group [options]="AVISO_CALCULO_OPCIONES"></app-radio-group>
 */
export const AVISO_CALCULO_OPCIONES = [
    {
        label: 'Sí',
        value: '1',
        id: 'idEjercicioSi'
    },
    {
        label: 'No',
        value: '0',
        id: 'idEjercicioNo'
    }
]
/**
 * @description
 * Opciones disponibles para el aviso de porcentaje en el formulario de modificación.
 * Cada opción contiene una etiqueta (`label`), un valor (`value`) y un identificador (`id`).
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @since 1.0.0
 *
 * @see [Documentación de Aviso de Modificación](#)
 */
export const AVISO_PORCENTAJE_OPCIONES = [
    {
        label: 'Sí',
        value: '1',
        id: 'idPorcentajeSi'
    },
    {
        label: 'No',
        value: '0',
        id: 'idPorcentajeNo'
    }
]

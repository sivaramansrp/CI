
/**
 * Interfaz que representa los datos de la octava temporal.
 */
export interface OctavaTemporal {
    cantidad: number,
    unidadDeMedida: string,
    fraccionArancelaria: string,
    descripción: string,
    colonia: string,
    precioUnitarioUSD: string,
    totalUsd: number
}

/**
 * Interfaz que representa la fracción arancelaria para el proceso.
 */
export interface FraccionArancelariaProsec {
    fraccionArancelariaProsec: number | string,
    descripción: string
}
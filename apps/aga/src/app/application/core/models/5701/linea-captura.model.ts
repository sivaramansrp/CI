/**
 * Representa una línea de captura utilizada para pagos o transacciones.
 *
 * @property lineaCaptura - Cadena que identifica la línea de captura.
 * @property monto - Monto asociado a la línea de captura.
 */
export interface LineaCaptura {
    lineaCaptura: string;
    monto: number;
}
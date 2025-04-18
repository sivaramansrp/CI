import { TablaDatos } from "./terceros-fabricante.model";

/**
 * Modelo que extiende a tableData, incluyendo información sobre la selección de la fila.
 * Indica si la fila está seleccionada o no.
 */
export interface DatosSeleccionados extends TablaDatos {

  checked: boolean;
}

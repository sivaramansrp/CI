/**
 * Interfaz que representa los datos de una partida complementaria.
 * 
 * {number} id - Identificador único de la partida.
 * {string} descripcion - Descripción de la partida.
 * {number} cantidad - Cantidad de la partida.
 * {number} valor - Valor asignado a la partida.
 * {string} unidad - Unidad de medida de la partida.
 * {string} [observaciones] - Observaciones adicionales (opcional).
 */
export interface CompliMentaria {
  id: number;
  descripcion: string;
  cantidad: number;
  valor: number;
  unidad: string;
  observaciones?: string; 
}
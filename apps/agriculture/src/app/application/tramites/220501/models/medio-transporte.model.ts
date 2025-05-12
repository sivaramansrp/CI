/** 
 * Interfaz que representa los datos del medio de transporte utilizado en la solicitud.
 */
export interface MedioTransporte {
    /** Tipo de medio de transporte (ejemplo: camión, tren, avión, barco). */
    medioDeTransporte: string;
  
    /** Identificación específica del transporte (ejemplo: número de placa, matrícula, código de unidad). */
    identificacionTransporte: string;
  
    /** Indica si la solicitud es para transporte ferroviario por partes (1: Sí, 0: No). */
    esSolicitudFerros: number;
  
    /** Total de guías amparadas en el medio de transporte. */
    totalGuias: string;
  }
  
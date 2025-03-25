/**
 * @description Interfaz que representa los datos de los programas de reporte.
 * Contiene información sobre el folio del programa, modalidad, tipo de programa y estatus.
 */
export interface ProgramasReporte {
  /** Folio del programa */
  folioPrograma: string;
  /** Modalidad del programa */
  modalidad: string;
  /** Tipo de programa */
  tipoPrograma: string;
  /** Estatus actual del programa */
  estatus: string;
}

/**
 * @description Interfaz que representa las fechas de inicio y fin de un reporte.
 */
export interface ReporteFechas {
  /** Fecha de inicio del reporte */
  inicio: string;
  /** Fecha de fin del reporte */
  fin: string;
}

/**
 * @description Interfaz que representa los datos de los bienes producidos.
 * Contiene información detallada como el bien producido, sector, fracción, unidad de medida, 
 * volumen total de producción, mercado nacional y exportaciones.
 */
export interface BienesProducidos {
  /** Nombre del bien producido */
  bienProducido: string;
  /** Sector al que pertenece el bien */
  sector: string;
  /** Fracción arancelaria asociada al bien */
  fraccion: string;
  /** Unidad de medida del bien producido */
  unidadMedida: string;
  /** Volumen total de los bienes producidos */
  totalBienesProducidos: string;
  /** Volumen destinado al mercado nacional */
  mercadoNacional: string;
  /** Volumen destinado a exportaciones */
  exportaciones: string;
}

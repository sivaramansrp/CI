/**
 * Datos de la solicitud y criterios asociados
 */
export interface DatosSolicitudCriterio {
  /** ID de la solicitud */
  idSolicitud: number;

  /** ID del criterio tratado */
  idCriterioTratado: number;

  /** Importe de insumos originarios */
  impInsumosOriginarios: number;

  /** Importe de insumos no originarios */
  impInsumosNoOriginarios: number;

  /** Importe de envases originarios */
  impEnvasesOriginarios: number;

  /** Importe de envases no originarios */
  impEnvasesNoOriginarios: number;

  /** Importe total insumos + envases originarios */
  impInsuEnvOriginarios: number;

  /** Importe total insumos + envases no originarios */
  impInsuEnvNoOriginarios: number;

  /** Porcentaje de valor de no originarios */
  pctValorNoOriginarios: number;

  /** Porcentaje de valor de contenido regional */
  pctValorContenidoRegional: number;

  /** Porcentaje del peso total de fibras */
  pctPesoTotalFibras: number | null;

  /** Porcentaje del peso total de la mercancía */
  pctPesoTotalMercancia: number | null;
}

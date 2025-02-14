/** 
 * Interfaz que representa los detalles de la mercancía.
 */
export interface datosDeMercancias {
  /** Fracción arancelaria aduanera*/
  fraccionArancelaria: string;
  
  /** Descripción de la fracción arancelaria aduanera */
  descripcionFraccion: string;
  
  /** Código NICO (número de identificación específico) */
  nico: string;
  
  /** Descripción del código NICO */
  nicoDescripcion: string;
  
  /** Cantidad solicitada en UMT (Tipo de unidad de medida) */
  cantidadSolicitadaUMT: number;
  
  /** Tipo de unidad de medida */
  unidadMedidaUMT: string;
  
  /** Cantidad total en UMT */
  cantidadTotalUMT: number;
  
  /** Saldo pendiente */
  saldoPendiente: number;
  
  /** Indica si el elemento está seleccionado. */
  selected?: boolean;
}

/** 
 * Interfaz que representa detalles de vagones de ferrocarril.
 */
export interface carrosDeFerrocarril {
  /** Identificación de inspección física */
  idInspeccionFisica: number;
  
  /** Número de autorización */
  numeroAutorizacion: string;
  
  /** Número de artículo de mercancía */
  numeroPartidaMercancia: string;
  
  /** Número total de vagones de ferrocarril */
  numeroTotalCarros: number;
}

/** 
 * Interfaz que representa el historial de inspecciones físicas.
 */
export interface historialInspeccionFisica {
  /** Número de artículo de mercancía*/
  numeroPartidaMercancia: string;
  
  /** Fracción arancelaria aduanera */
  fraccionArancelaria: string;
  
  /** código nico */
  nico: string;
  
  /** Cantidad en UMT */
  cantidadUmt: string;
  
  /** Cantidad inspeccionada*/
  cantidadInspeccion: string;
  
  /** Saldo pendiente */
  saldoPendiente: string;
  
  /** Fecha de inspección en formato de cadena */
  fechaInspeccionString: string;
}

/** 
 * Interfaz que representa una solicitud u orden.
 */
export interface solicitud {
  /** Fecha de creación */
  fechaCreacion: string;
  
  /** Nombre o identificador de la mercancía */
  mercancia: string;
  
  /** Cantidad solicitada */
  cantidad: string;
  
  /** Proveedor de la mercancia */
  proovedor: string;
}

/** 
 * Interfaz que representa la estructura de datos de la tabla para mercancías.
 */
export interface mercanciaTablaData {
  /** Fila de encabezado de la tabla de mercancías. */
  hMercanciaTabla: string[];
  
  /** Datos del cuerpo para la tabla de mercancías. */
  dMercanciaBody: datosDeMercancias[];
}

/** 
 * Interfaz que representa la estructura de carga de datos inicial.
 */
export interface cargarDatosIniciales {
  /** Encabezados para el historial de inspección */
  hHistorialinspeccion: string[];
  
  /** Datos del historial de inspección */
  dHistorialInspecciones: historialInspeccionFisica[];
  
  /** Datos de vagones de ferrocarril */
  dCarrosDeFerrocarril: carrosDeFerrocarril[];
  
  /** Cabeceras para mesa de vagones de ferrocarril */
  hCarroFerrocarril: string[];
  
  /** Encabezados para solicitudes */
  hSolicitud: string[];
  
  /** Solicitar datos */
  dSolicitud: solicitud[];
  
  /** Headers for merchandise */
  hMerchandise: string[];
  
  /** encabezados para mercancia */
  dMercancia: datosDeMercancias[];
}

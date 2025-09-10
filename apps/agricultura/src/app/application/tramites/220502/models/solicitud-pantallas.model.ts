import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { MercanciaTabla } from './medio-transporte.model';

/**
 * Interfaz que representa los detalles de la mercancía.
 */
export interface DatosDeMercancias {
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
export interface CarrosDeFerrocarril {
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
export interface HistorialInspeccionFisica {
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
export interface Solicitud {
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
export interface MercanciaTablaData {
  /** Fila de encabezado de la tabla de mercancías. */
  hMercanciaTabla: string[];

  /** Datos del cuerpo para la tabla de mercancías. */
  dMercanciaBody: DatosDeMercancias[];
}

/**
 * Interfaz que representa la estructura de carga de datos inicial.
 */
export interface CargarDatosIniciales {
  /** Encabezados para el historial de inspección */
  hHistorialinspeccion: string[];

  /** Datos del historial de inspección */
  dHistorialInspecciones: HistorialInspeccionFisica[];

  /** Datos de vagones de ferrocarril */
  dCarrosDeFerrocarril: CarrosDeFerrocarril[];

  /** Cabeceras para mesa de vagones de ferrocarril */
  hCarroFerrocarril: string[];

  /** Encabezados para solicitudes */
  hSolicitud: string[];

  /** Solicitar datos */
  dSolicitud: Solicitud[];

  /** Headers for merchandise */
  hMerchandise: string[];

  /** encabezados para mercancia */
  dMercancia: DatosDeMercancias[];

  /** Medio de transporte */
  medioDeTransporte: CatalogosSelect;
  /**
   * @description
   * Lista completa de objetos de tipo `MercanciaTabla` administrados por el componente.
   *
   * Esta colección contiene todas las mercancías registradas o cargadas desde el servicio
   * y sirve como fuente de datos principal para mostrar en la tabla de mercancías.
   *
   * A diferencia de `mercanciaSeleccionLista`, que guarda únicamente las seleccionadas,
   * esta propiedad representa el inventario total disponible.
   */
  mercanciaLista: MercanciaTabla[];
}
/**
 * Interfaz que representa los datos del trámite realizar.
 */
export interface DatosDelTramiteRealizar {
  /** Clave de control */
  pendientesCertificados: Catalogo[];
  /** Certificados autorizados */
  horaInspeccion: Catalogo[];
  /** Hora de inspección */
  aduanaIngreso: Catalogo[];
  /** Aduana de ingreso */
  sanidadAgropecuaria: Catalogo[];
  /** Oficina de inspección de Sanidad Agropecuaria */
  puntoInspeccion: Catalogo[];
}
/**
 * Interfaz que representa un tipo de contenedor dentro del sistema.
 * Contiene un catálogo de opciones disponibles para la selección.
 */
export interface TipoContenedor {
  /**
   * Catálogo del tipo de contenedor disponible para selección.
   */
  tipoContenedor: CatalogosSelect;
}

/**
 * Representa los datos de la solicitud a procesar.
 */
export interface DatosDeLaSolicitud {
  /**
   * Identificador del certificado autorizado.
   */
  certificadosAutorizados: number;

  /**
   * Hora programada para la inspección (formato 24 horas).
   */
  horaDeInspeccion: number;

  /**
   * Identificador de la aduana de ingreso.
   */
  aduanaDeIngreso: number;

  /**
   * Indicador de sanidad agropecuaria requerida.
   */
  sanidadAgropecuaria: number;

  /**
   * Identificador del punto de inspección.
   */
  puntoDeInspeccion: number;

  /**
   * Fecha programada para la inspección (formato YYYY-MM-DD).
   */
  fechaDeInspeccion: string;

  /**
   * Nombre de la persona responsable de la solicitud.
   */
  nombre: string;

  /**
   * Primer apellido de la persona responsable.
   */
  primerapellido: string;

  /**
   * Segundo apellido de la persona responsable.
   */
  segundoapellido: string;

  /**
   * Nombre o descripción de la mercancía.
   */
  mercancia: string;

  /**
   * Tipo de contenedor utilizado.
   */
  tipocontenedor: number;

  /**
   * Medio de transporte (identificador del tipo de transporte).
   */
  transporteIdMedio: number;

  /**
   * Identificación del medio de transporte.
   */
  identificacionTransporte: string;

  /**
   * Indica si es una solicitud ferroviaria.
   * Puede ser un número o texto (por ejemplo: 'sí', 'no').
   */
  esSolicitudFerros: string | number;

  /**
   * Total de guías amparadas por la solicitud.
   */
  totalDeGuiasAmparadas: string;

  /**
   * Indica si está exento de pago.
   */
  exentoPagoNo: number | string;
  /**
   * Justificación del pago.
   */
  justificacion: number | string;
  /**
   * Clave de referencia del pago.
   */
  claveReferencia: string;
  /**
   * Cadena de dependencia.
   */
  cadenaDependencia: string;
  /**
   * Banco asociado al pago.
   */
  banco: number;
  /**
   * Llave de pago.
   */
  llavePago: string;
  /**
   * Importe del pago.
   */
  importePago: string;
  /**
   * Fecha del pago.
   */
  fetchapago: string;

  /**
   * Aduana de ingreso.
   */
  aduanaIngreso: number;
  /**
   * Oficina de inspección.
   */
  oficinaInspeccion: number;
  /**
   * Punto de inspección.
   */
  puntoInspeccion: number;

  /**
   * Nombre o identificador del ferrocarril asociado al trámite.
   */
  ferrocarril: string;

  /**
   * Número de guía.
   */
  numeroguia: string;
  /**
   * Régimen aduanero.
   */
  regimen: number;

  /**
   * Coordenadas de la ubicación.
   */
  coordenadas: string;
  /**
   * Tipo de movilización.
   */
  movilizacion: number;
  /**
   * Tipo de transporte.
   */
  transporte: string;
  /**
   * Punto de inspección.
   */
  punto: number;
  /**
   * Nombre de la empresa.
   */
  nombreEmpresa: number;
  /**
   * Folio de la solicitud.
   */
  foliodel: string;
}

import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';

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
  tipoContenedor: CatalogosSelect;
}

export interface DatosDeLaSolicitud {
  certificadosAutorizados: number;
  horaDeInspeccion: number;
  aduanaDeIngreso: number;
  sanidadAgropecuaria: number;
  puntoDeInspeccion: number;
  fechaDeInspeccion: string;
  nombre: string;
  primerapellido: string;
  segundoapellido: string;
  mercancia: string;
  tipocontenedor: number;
  transporteIdMedio: number;
  identificacionTransporte: string;
  esSolicitudFerros: string | number;
  totalDeGuiasAmparadas: string;
}

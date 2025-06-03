/**
 * Interfaz que representa un catálogo importante de selección.
 *
 */
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { TableData } from '@ng-mf/data-access-user';

/**
 * Representa una selección importante del catálogo para el registro de muestras de mercancías.
 *
 * @property {CatalogosSelect} importadorExportadorPrevio - Selección previa del importador/exportador.
 * @property {CatalogosSelect} fraccionArancelariaAga - Selección de la fracción arancelaria AGA.
 * @property {CatalogosSelect} nico - Selección del NICO.
 * @property {CatalogosSelect} ideGenerica - Selección de la IDE genérica.
 * @property {CatalogosSelect} tomaMuestraDespacho - Selección de la toma de muestra en despacho.
 * @property {TableData} requisitosObligatoriosTabla - Tabla de requisitos obligatorios.
 * @property {TableData} tablaDeTarifasDePago - Tabla de tarifas de pago.
 */
export interface ImportanteCatalogoSeleccion {
  /**
   * Selección previa del importador/exportador.
   */
  importadorExportadorPrevio: CatalogosSelect;

  /**
   * Selección de la fracción arancelaria AGA.
   */
  fraccionArancelariaAga: CatalogosSelect;

  /**
   *  Selección del NICO.
   */
  nico: CatalogosSelect;

  /**
   * Selección de la IDE genérica.
   */
  ideGenerica: CatalogosSelect;
  /**
   * Selección de la toma de muestra en despacho.
   */
  tomaMuestraDespacho: CatalogosSelect;
  /**
   * Tabla de requisitos obligatorios.
   */
  requisitosObligatoriosTabla: TableData;

  /**
   *  Tabla de tarifas de pago.
   */
  tablaDeTarifasDePago: TableData;

  /**
   * Almacena las fechas de validez de la autorización.
   */
  validezDeLaAutorizacion: ListaDeFechas;

  /**
   * Almacena los datos del registro de muestras.
   */
  registroMuestrasDatos: RegistroMuestras;

  /**
   * Lista de pagos de derechos asociados a la solicitud.
   * Contiene información sobre los pagos realizados o pendientes.
   */
  datosDelChoferNacional: DatosDelChoferNacional[];
}
/**
 * Representa un registro de muestras de mercancías.
 */
export interface RegistroMuestras {
  /**
   * Opción del importador seleccionada en el registro.
   */
  opcionDeImportador: string;

  /**
   * Indica si se tomó una muestra en el despacho.
   */
  tomaMuestraDespacho: string;

  /**
   * Motivo de la falta de muestra, si no se realizó la toma de muestra.
   */
  descMotivoFaltaMuestra: string;

  /**
   * Valor combinado de fracción arancelaria seleccionado en un combo.
   */
  comboFraccionConcatenada: string;

  /**
   * Código de la fracción arancelaria.
   */
  fraccionConcatenada: string;

  /**
   * Descripción de la fracción arancelaria.
   */
  fracciondescripcion: string;

  /**
   * Valor combinado de NICOS seleccionado en un combo.
   */
  comboNicos: string;

  /**
   * Descripción del NICOS asociado.
   */
  nicoDescripcion: string;

  /**
   * Nombre químico de la sustancia o mercancía.
   */
  nombreQuimico: string;

  /**
   * Nombre comercial de la sustancia o mercancía.
   */
  nombreComercial: string;

  /**
   * Número CAS (Chemical Abstracts Service) de la sustancia.
   */
  numeroCAS: string;

  /**
   * Identificación genérica de la mercancía.
   */
  ideGenerica: number;

  /**
   * Descripción detallada del producto en formato CLOB (Character Large Object).
   */
  descClobGenerica: string;
}

/**
 * Representa una lista de fechas.
 */
export interface ListaDeFechas {
  /**
   * Representa la fecha de inicio de vigencia.
   */
  fechaInicioVigencia: string;
  /**
   * Representa la fecha de fin de vigencia.
   */
  fechaFinVigencia: string;
}

/**
 * Interfaz que representa el estado de almacenamiento de muestras de mercancías.
 * Contiene información sobre autorizaciones, registros, pagos y catálogos relacionados
 * con importaciones y exportaciones.
 */
export interface MuestrasMercanciasStore {
  /**
   * Almacena las fechas de validez de la autorización.
   */
  validezDeLaAutorizacion: ListaDeFechas;

  /**
   * Almacena los registros de muestras y sus renovaciones.
   */
  renovacionesDeRegistro: RegistroMuestras;

  /**
   * Almacena los detalles del pago, incluyendo encabezados y datos de la tabla.
   */
  pagoDeDerechos: TableData;

  /**
   * Almacena el catálogo de importadores/exportadores previos.
   */
  importadorExportadorPrevio: CatalogosSelect;

  /**
   * Almacena el catálogo de fracciones arancelarias de la AGA (Aduana General de la Nación).
   */
  fraccionArancelariaAga: CatalogosSelect;

  /**
   * Almacena el catálogo de NICO (Número de Identificación Comercial).
   */
  nico: CatalogosSelect;

  /**
   * Almacena el catálogo de IDE genérico (Identificación de Especificaciones).
   */
  ideGenerica: CatalogosSelect;

  /**
   * Almacena el catálogo relacionado con la toma de muestras durante el despacho.
   */
  tomaMuestraDespacho: CatalogosSelect;
}

/**
 * Interfaz que representa la lista de pagos de derechos.
 * Contiene la información de la línea de captura y el monto correspondiente.
 */
export interface DatosDelChoferNacional {
  id: unknown;
  /** Línea de captura del pago. */
  curp?: string;
  rfc?: string;
  número?: string;
  nombre?:string;
  calle?: string;
  númeroExterior?: string;
  númeroInterior?: string;
  pais?: string;
  estado?: string;
  primerApellido?: string;
  segundoApellido?: string;
  númeroDeGafete?: string;
  vigenciaGafete?: string;
  municipio?: string;
  colonia?: string;
  paisOrigen?: string;
  ciudad?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  gafete?: string;
  país?: string;
  fechaFindDeVigencia?: string;
  municipioAlcaldía?: string;
  PaísDeResidencia?: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface choferesExtranjeros {
  /** Línea de captura del pago. */
  númeroDelSeguroSocial?: string;
  número?:string;
  calle?: string;
  estado?: string;
  pais?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  rfc?: string;
  gafete?: string;
  vigenciaGafete?: string;
  municipio?: string;
  colonia?: string;
  paisOrigen?: string;
  ciudad?: string;
  curp?: string;
  númeroExterior?: string;
  númeroInterior?: string;
  país?: string;
  primerApellido?: string;
  segundoApellido?: string;
  númeroDeGafete?: string;
  fechaFindDeVigencia?: string;
  municipioAlcaldía?: string;
  PaísDeResidencia?: string;
}
export interface PagoDerechosLista {
  /** Línea de captura del pago. */
  número?: string;
  calle?: string;
  estado?: string;
  pais?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  rfc?: string;
  gafete?: string;
  vigenciaGafete?: string;
  municipio?: string;
  colonia?: string;
  paisOrigen?: string;
  ciudad?: string;
  curp?: string;
  númeroExterior?: string;
  númeroInterior?: string;
  país?: string;
  primerApellido?: string;
  segundoApellido?: string;
  númeroDeGafete?: string;
  fechaFindDeVigencia?: string;
  municipioAlcaldía?: string;
  PaísDeResidencia?: string;
}

export interface Vehiculo {
  id: number;
  solicitudVehiculoVin2: string;
  solicitudVehiculoTipoVehiculo: string;
  solicitudVehiculoNumeroEconomico: string;
  solicitudVehiculoNumeroPlacas: string;
  solicitudVehiculoPaisEmisor: string;
  solicitudDomicilioEstado: string;
  solicitudVehiculoMarca: string;
  solicitudVehiculoModelo: string;
  anioVehiculoVEH: string;
  solicitudVehiculoTransponder: string;
  solicitudVehiculoColor: string;
  solicitudVehiculoNumero2daPlaca?: string;
  solicitudVehiculoEmisor2daPlaca?: string;
  solicitudVehiculoPaisEmisorSegundaPlaca?: string;
  solicitudVehiculoDesc?: string;
}

export interface Chofer {
  descripcion: string;
  clave: string;
  id: number;
  curp?: string;
  rfc?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  gafete?: string;
  vigenciagafete?: string;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  ciudad?: string;
  localidad?: string;
  codigoPostal?: string;
  paisChn?: string;
  estado?: string;
  numerodelsegurosocial?: string;
  entidadFederativaCHN?: string;
  delegacionCHN?: string;
  coloniaCHN?: string;
  paisOrigenCHN?: string;
  correo?: string;
  telefono?: string;
  nacionalidadCHE?: string;
  nss?: string;
  ideFiscal?: string;
  paisCHE?: string;
  entidadFederativaCHE?: string;
  paisOrigenCHE?: string;
}

/**
 * Representa la estructura de datos para un Director General.
 *
 * @property nombre - El nombre del Director General.
 * @property primerApellido - El primer apellido del Director General.
 * @property segundoApellido - El segundo apellido del Director General.
 * @property apellidoPaterno - El apellido paterno del Director General.
 * @property apellidoMaternoCHN - El apellido materno del Director General en formato CHN.
 */
export interface DirectorGeneralData {
  nombre : string;
  primerApellido : string;
  segundoApellido : string;
  apellidoPaterno : string;
  apellidoMaternoCHN : string;
}
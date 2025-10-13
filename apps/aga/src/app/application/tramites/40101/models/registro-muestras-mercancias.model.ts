
/**
 * Interfaces para tipar la respuesta del API
 */
export interface Domicilio {
  pais: string;
  codigo_postal: string;
  estado: string;
  municipio: string | null;
  localidad: string | null;
  colonia: string | null;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  lada: string | null;
  telefono: string | null;
}

export interface Solicitante {
  id_persona_solicitud: number | null;
  rfc: string | null;
  razon_social: string | null;
  correo_electronico: string | null;
  descripcion_giro: string | null;
  domicilio: Domicilio;
}

export interface ApiResponseSolicitante {
  codigo: string;
  mensaje: string;
  datos: {
    mostrar_director_general: boolean;
    solicitante: Solicitante;
    caat_existe: boolean;
    mensaje: string
  };
}

export interface ApiResponseChofer {
  codigo: string | null;
  mensaje: string | null;
  datos: {
    curp: string | null;
    rfc: string | null;
    nss: string | null;
    nombre: string | null;
    primer_apellido: string | null;
    segundo_apellido: string | null;
    nacionalidad: string | null;
    numero_de_gafete: string | null;
    vigencia_del_gafete: string | null;
    estado_fisico_gafete: string | null;
    estado_gafete: string | null;
    estado_solicitud: string | null;
    domicilio: {
      pais: string | null;
      codigo_postal: string | null;
      correo_electronico: string | null;
      pais_de_residencia: string | null
      estado: string | null;
      municipio: string | null;
      localidad: string | null;
      colonia: string | null;
      ciudad: string | null
      calle: string | null;
      numero_exterior: string | null;
      numero_interior: string | null;
      lada: string | null;
      telefono: string | null;
    };
  };
}


/**
 * Interfaz que define la configuración de la tabla de unidades de arrastre.
 * Contiene encabezados y datos para la visualización en una tabla.
 */
export interface UnidadTablaConfig {
  /**
   * Lista de encabezados de la tabla.
   */
  encabezadas: {
    encabezado: string;
    clave: (item: UnidadTabla) => string;
    orden: number;
  }[];

  /**
   * Lista de datos de unidades de arrastre que se mostrarán en la tabla.
   */
  datos: UnidadTabla[];
}
/**
 * Interfaz que representa un catálogo importante de selección.
 *
 */
import { Catalogo, CatalogosSelect } from '@ng-mf/data-access-user';
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
  curp?: string;
  rfc?: string;

  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  numeroDeGafete?: string;
  vigenciaGafete?: string;


  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  pais?: string;
  estado?: string;
  municipioAlcaldia?: string;
  colonia?: string;
  paisDeResidencia?: string;
  ciudad?: string;
  localidad?: string;
  codigoPostal?: string;


  telefono: string;
  correoElectronico: string;
}

export interface ChoferesExtranjeros {
  /** Línea de captura del pago. */
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;

  nacionalidad?: string;
  numeroDeGafete?: string;
  vigenciaGafete?: string;

  numeroDelSeguroSocial?: string;
  numberDeIdeFiscal?: string;
  identificadorFiscal?: string
  pais?: string;

  apellidoPaterno?: string;
  codigoPostal?: string;
  estado?: string;

  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;

  paisDeResidencia?: string;
  ciudad?: string;

  correoElectronico?: string;
  telefono?: string;
}
export interface PagoDerechosLista {
  /** Línea de captura del pago. */
  numero?: string;
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
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  apellidoPaterno: string;
  apellidoMaternoCHN: string;
}


/**
 * Interfaz que representa la estructura de la tabla de vehículos.
 *
 * @property datos - Lista de vehículos.
 * @property numero - Número del vehículo.
 * @property tipoDeVehiculo - Tipo de vehículo.
 * @property idDeVehiculo - Identificador del vehículo.
 * @property numeroPlaca - Número de placa.
 * @property paisEmisor - País emisor.
 * @property estado - Estado.
 * @property marca - Marca.
 * @property modelo - Modelo.
 * @property ano - Año.
 * @property transponder - Transponder.
 * @property colorVehiculo - Color del vehículo.
 * @property numuroEconomico - Número económico.
 * @property numero2daPlaca - Número de segunda placa.
 * @property estado2daPlaca - Estado de la segunda placa.
 * @property paisEmisor2daPlaca - País emisor de la segunda placa.
 * @property descripcion - Descripción.
 */
export interface VehiculoTabla {
  datos: VehiculoTabla[];
  numero: string;
  tipoDeVehiculo: string;
  idDeVehiculo: string;
  numeroPlaca: string;
  paisEmisor: string;
  estado: string;
  marca: string;
  modelo: string;
  ano: string;
  transponder: string;
  colorVehiculo: string;
  numuroEconomico: string;
  numero2daPlaca: string;
  estado2daPlaca: string;
  paisEmisor2daPlaca: string;
  descripcion: string;
}
/**
 * Interfaz que representa los datos de un vehículo.
 *
 * @property numero - Número del vehículo.
 * @property tipoDeVehiculo - Tipo de vehículo.
 * @property idDeVehiculo - Identificador del vehículo.
 * @property numeroPlaca - Número de placa.
 * @property paisEmisor - País emisor.
 * @property estado - Estado.
 * @property marca - Marca.
 * @property modelo - Modelo.
 * @property ano - Año.
 * @property transponder - Transponder.
 * @property colorVehiculo - Color del vehículo.
 * @property numuroEconomico - Número económico.
 * @property numero2daPlaca - Número de segunda placa.
 * @property estado2daPlaca - Estado de la segunda placa.
 * @property paisEmisor2daPlaca - País emisor de la segunda placa.
 * @property descripcion - Descripción.
 */
export interface DatosVehiculo {
  numero: string;
  tipoDeVehiculo: string;
  idDeVehiculo: string;
  numeroPlaca: string;
  paisEmisor: string;
  estado: string;
  marca: string;
  modelo: string;
  ano: string;
  transponder: string;
  colorVehiculo: string;
  numuroEconomico: string;
  numero2daPlaca: string;
  estado2daPlaca: string;
  paisEmisor2daPlaca: string;
  descripcion: string;
}
/**
 * Interfaz que representa los datos de una unidad de arrastre.
 *
 * @property vinVehiculo - VIN del vehículo.
 * @property tipoDeUnidadArrastre - Tipo de unidad de arrastre.
 * @property idDeVehiculo - Identificador del vehículo.
 * @property numeroEconomico - Número económico.
 * @property numeroPlaca - Número de placa.
 * @property paisEmisor - País emisor.
 * @property estado - Estado.
 * @property colorVehiculo - Color del vehículo.
 * @property numero2daPlaca - Número de segunda placa.
 * @property estado2daPlaca - Estado de la segunda placa.
 * @property paisEmisor2daPlaca - País emisor de la segunda placa.
 * @property descripcion - Descripción.
 */
export interface DatosUnidad {
  vinVehiculo: string;
  tipoDeUnidadArrastre: string;
  idDeVehiculoUnidad: string;
  numeroEconomico: string;
  numeroPlaca: string;
  paisEmisor: string;
  estado: string;
  colorVehiculo: string;
  numero2daPlaca: string;
  estado2daPlaca: string;
  paisEmisor2daPlaca: string;
  descripcion: string;
}

/**
 * Interfaz que representa una lista de catálogos.
 *
 * @property datos - Lista de catálogos.
 */
export interface CatalogoLista {
  datos: Catalogo[];
}

/**
 * Interfaz que representa los datos de la tabla de vehículos.
 *
 * @property datos - Lista de vehículos en la tabla.
 */
export interface VehiculoTablaDatos {
  /**
   * Lista de mercancías en la tabla.
   */
  datos: VehiculoTabla[];
}
/**
 * Interfaz que representa una unidad de arrastre en la tabla.
 *
 * @property vinVehiculo - VIN del vehículo.
 * @property tipoDeUnidadArrastre - Tipo de unidad de arrastre.
 * @property numeroEconomico - Número económico.
 * @property numeroPlaca - Número de placa.
 * @property paisEmisor - País emisor.
 * @property estado - Estado.
 */
export interface UnidadTabla {
  idDeVehiculoUnidad: number;
  vinVehiculo: string;
  tipoDeUnidadArrastre: string;
  numeroEconomico: string;
  numeroPlaca: string;
  paisEmisor: string;
  estado: string;

  // 🆕 Added missing fields from your data
  colorVehiculo: string;
  descripcion: string;
  estado2daPlaca: string;
  numero2daPlaca: string;
  paisEmisor2daPlaca: string;
}

/**
 * Interfaz que define la configuración de la tabla de vehículos.
 * Contiene encabezados y datos para la visualización en una tabla.
 */
export interface VehiculoTablaConfig {
  /**
   * Lista de encabezados de la tabla.
   */
  encabezadas: {
    encabezado: string;
    clave: (item: VehiculoTabla) => string;
    orden: number;
  }[];

  /**
   * Lista de datos de vehículos que se mostrarán en la tabla.
   */
  datos: VehiculoTabla[];
}

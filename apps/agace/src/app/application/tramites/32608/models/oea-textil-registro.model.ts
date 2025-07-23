/**
 * @interfaz
 * @nombre VehiculosTabla
 * @descripción
 * Define la estructura de los datos de la tabla de vehículos.
 * Contiene información básica sobre los vehículos, como marca, modelo y VIN.
 */
export interface NumeroEmpleadosTabla {
  id: number; // Identificador único del vehículo.
  denominacionSocial: string; // Denominación social del vehículo.
  rfc: string; // Modelo del vehículo.
  numeroDeEmpleados: number; // Número de empleados del vehículo.
  bimestre:string; // Bimestre al que corresponde el registro.
}

/**
 * Interface para la respuesta de búsqueda de RFC
 */
export interface BuscarRfcResponse {
  code: number;
  data: Partial<NumeroEmpleadosTabla>; // Datos de RFC obtenidos.
  message: string;
}

/**
 * Interface para la respuesta de la API
 * @template T - Tipo de datos que se espera en la respuesta.
 */
export interface ApiResponse<T> {
  code: number;
  data: T[];
  message: string;
}

/**
 * Interface para las entidades federativas
 */
export interface EntidadFederativa {
  id: number;
  descripcion: string;
}

/**
 * Interface para las instalaciones
 * @template T - Tipo de datos que se espera en la respuesta.
 */
export interface InstalacionesInterface {
    entidadFederativa: string;
    municipio: string;
    direccion: string;
    codigoPostal: string;
    registro: string
}

/**
 * Interface para las instalaciones principales del solicitante.
 * Contiene información detallada sobre los domicilios y actividades productivas.
 */
export interface DomiciliosRfcSolicitanteTabla {
  id?:number;
  InstalacionesPrincipales: string;
  tipoInstalacion: string;
  entidadFederativa: string;
  municipioAlcaldia: string;
  coloniaCalleNumero: string; // This was mislabeled as codigoPostal in the table config
  codigoPostal: string;
  registroSESAT: string;
  procesoProductivo: string;
  acreditaUsoGoceInmueble: string;
  realizaActividadComercioExterior: string;
  reconocimientoMutuoCTPAT: string;
  perfilEmpresa: string;
}


export interface ControlInventariosTabla {
  id:number;
  nombreSistema:string;
  lugarRadicacion:string;
  cumpleAnexo24: boolean;
}

export interface AgregarMiembroEmpresaTabla {
  id:number;
  tipoPersona: string;
  nombre: string;
  nombreColleccion?: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombreCompleto: string;
  rfc: string;
  caracter: string;
  nacionalidad: string;
  obligadoTributarMexico: string;
  nombreEmpresa: string;
}

/**
 * Representa los detalles de una empresa del grupo.
 *
 * @property rfcEnclaveOperativo - RFC del enclave operativo.
 * @property denominacionRazonsocial - Denominación o razón social de la empresa.
 * @property domicilio - Domicilio de la empresa.
 * @property inputfechaDeLaUltimaOperacion - Fecha de la última operación de la empresa.
 */
export interface EmpresaDelGrupo{
  rfcEnclaveOperativo: string;
  denominacionRazonsocial: string;
  domicilio: string;
  inputfechaDeLaUltimaOperacion: string;
}

/**
 * Representa los detalles de un transportista en la tabla.
 *
 * @property rfcEnclaveOperativo - RFC del enlace operativo del transportista.
 * @property denominacionRazonsocial - Denominación o razón social del transportista.
 * @property domicilio - Domicilio del transportista.
 * @property ccat - Código o identificador único del transportista.
 */
export interface TransportistasTable {
  rfcEnclaveOperativo: string;
  denominacionRazonsocial: string;
  domicilio: string;
  ccat: string;
}

/**
 * Represents the operational link's RFC information.
 *
 * @property enlaceOperativorfc - The RFC (Registro Federal de Contribuyentes) of the operational link.
 * @property denominacionRazonsocial - The business name or legal denomination of the operational link.
 * @property domicilio - The address of the operational link.
 */
export interface RFCEnlaceOperativo {
  enlaceOperativorfc: string;
  denominacionRazonsocial: string;
  domicilio: string;
  
}
/**
 * Representa los detalles de un transportista en la lista.
 *
 * @property enlaceOperativorfc - RFC (Registro Federal de Contribuyentes) del enlace operativo.
 * @property denominacionRazonsocial - Denominación o razón social del transportista.
 * @property domicilio - Domicilio del transportista.
 * @property ccat - Identificador único o código del transportista.
 */
export interface TransportistasListaInterface {
  enlaceOperativorfc: string;
  denominacionRazonsocial: string;
  domicilio: string;
  ccat: string;
}

/**
 * Represents the response structure for the OEA textile registration process.
 *
 * @property rubroCertificacion - Certification code for the textile sector.
 * @property fechaFinVigenciaRubro - End date of the certification validity.
 * @property numeroOficio - Official document number associated with the certification.
 */export interface RubroTextil {
  rubroCertificacion: string;
  fechaFinVigenciaRubro: string;
  numeroOficio: string;
}
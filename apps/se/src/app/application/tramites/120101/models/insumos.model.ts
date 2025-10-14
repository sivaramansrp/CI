/**
 * @interface InsumosTabla
 * @description
 * Representa la estructura de los datos utilizados en la tabla de insumos.
 */
export interface InsumosTabla{
    DescripcionDelInsumo: string;
    FraccionArancelaria: string;
    PaisDeOrigen: string;
}
export interface SolicitudTPLCANR {
  solicitud: Solicitud;
  puedeCapturarRepresentanteLegalCG: boolean;
  buscarInstrumentos: string;
  idMecanismoAsignacion: number;
  cveFraccionArancelaria: string;
  paisOrigenDestino: string;
  idCategoriaTextil: string;
  descripcionHTSUSA: string;
  idHtsUsa: string;
  countHTSUSA: string;
  _sourcePage: string;
  urlRedirect: string;
  parametrosBP: ParametrosBP;
}

export interface Solicitud {
  solicitante: Solicitante;
  cveRolCapturista: string;
  cveUsuarioCapturista: string;
  instrumentoCupoTPL: InstrumentoCupoTPL;
  idSolicitud: string;
  tramite: Tramite;
}

export interface Solicitante {
  domicilio: Domicilio;
  rfc: string;
  razonSocial: string;
  descripcionGiro: string;
  correoElectronico: string;
  telefono: string;
  cveUsuario: string;
}

export interface Domicilio {
  pais: CatalogoClaveNombre;
  entidadFederativa: CatalogoClaveNombre;
  delegacionMunicipio: CatalogoClaveNombre;
  colonia: CatalogoClaveNombre;
  localidad: CatalogoClaveNombre;
  codigoPostal: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
}

export interface CatalogoClaveNombre {
  clave: string;
  nombre: string;
}

export interface InstrumentoCupoTPL {
  idTratadoAcuerdo: number;
  claveRegimen: string;
  clavePais: string;
  cveFraccion: string;
  descripcionFraccion: string;
  idFraccionHtsUsa: string;
}

export interface Tramite {
  numFolioTramite: string;
}

export interface ParametrosBP {
  idSolicitud: string;
}
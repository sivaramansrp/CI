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

export interface BuscarApiResponse {
  causa: string;
  codigo: string;
  datos: Dato[];
  error: string;
  mensaje: string;
}

export interface Dato {
  idMecanismo: number;
  idCupo: number;
  clavefraccionArancelaria: string;
  codCategoriaTextil?: string;
  cvePais?: string;
  cveRegimen?: string;
  descripcionCategoriaTextil?: string;
  descripcionFraccion?: string;
  descripcionMecanismoAsignacion?: string | null;
  descripcionUnidadMedida?: string | null;
  factorConversion?: number;
  fechaFinVigenciaMecanismo?: string;
  fechaInicioVigenciaMecanismo?: string;
  montoDisponible?: number;
  producto?: string;
  subproducto?: string;
  tratadoAcuerdo?: string;
  categoriaTextil?: string;
  paisOrigenDestino?: string;
  regimen?: string;
}


export interface BuscarTablaDatos {
  id: number;
  cveTratado: string;
  cveRegimenClasificacion: string;
  cvePaisDestino: string;
  fraccionArancelaria: string;
  categoriaTextilDescripcion: string;
  productoDescripcion: string;
  subProductoClasificacion: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  montoDisponible: number;
  categoriaTextil: string;
  asignacionMecanismo: string | null;
  unidad: string | null;
  conversionFactor: number;
}
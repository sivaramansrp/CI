export interface ServiciosImmexTablePayload {
    servicio: string;
    servicioSeleccionado?: {
        idServicio: number;
        claveServicio: number;
    }[];
    modalidad: string;
    idPrograma: string;
}

export interface ServicioItemResponse {
    descripcion: string | null;
    descripcionTipo: string | null;
    descripcionTestado: string | null;
    estatus: boolean;
    desEstatus: string | null;
    idServicio: number;
    idSolicitud: number | null;
    solicitud: string | null;
    tipoServicio: string | null;
    testado: boolean;
    claveServicio: number;
    fecIniVigencia: string | null;
    fecFinVigencia: string | null;
}

export interface ServicioDtosKey {
    servicioDtos: ServicioItemResponse[];
}

export interface ServiciosAutorizadosTablePayload {
    rfc: string;
    numeroPrograma: string;
    idPrograma: string;
    tipoPrograma: string;
}

export interface ServiciosEmpresasNacionalesPayload {
    rfcEmpresaNacional: string;
    idServicio: string;
    descripcionServicio: string;
    modalidad: string;
    numeroPrograma: string;
    tiempoPrograma: string;
    idServicioAutorizado: string;
}

/**
 * Interfaz para la respuesta de empresas nacionales.
 */
export interface EmpresasNacionalesResponse {
    resultado: string;
    empresasNacionales: EmpresaNacional[];
}

/**
 * Interfaz para una empresa nacional.
 */
export interface EmpresaNacional {
    idServicio: string;
    descripcionServicio: string;
    domicilioCompleto: string;
    numeroPrograma: string;
    tiempoPrograma: string;
    descripcionTestado: string | null;
    idCompuestoEmpresa: string;
    idServicioAutorizado: number;
    idEmpresa: string | null;
    tipoEmpresa: string | null;
    caracterEmpresa: string | null;
    montoExportacionesUSD: number | null;
    numeroProgramaDGCESE: string;
    porcentajeParticipacionAccionaria: number | null;
    porcentajeParticionAccionariaExt: number | null;
    nombre: string | null;
    apellidoPaterno: string | null;
    apellidoMaterno: string | null;
    razonSocial: string;
    rfc: string;
    certificada: boolean | null;
    correoElectronico: string | null;
    idDireccionSol: number | null;
    idSolicitud: number | null;
    testado: boolean | null;
    fechaInicioVigencia: string | null;
    fechaFinVigencia: string | null;
    blnActivo: boolean | null;
    domicilioSolicitud: DomicilioSolicitud;
}

/**
 * Interfaz para el domicilio de solicitud.
 */
export interface DomicilioSolicitud {
    idDomicilio: number | null;
    calle: string;
    numExterior: string;
    numInterior: string;
    codigoPostal: string;
    informacionExtra: string | null;
    clave: string;
    coloniaEntity: unknown | null;
    cveLocalidad: string;
    cveDelegMun: string;
    delegacionMunicipio: string | null;
    cveEntidad: string;
    entidadFederativa: EntidadFederativa;
    cvePais: string;
    pais: Pais;
    ciudad: string | null;
    telefono: string | null;
    fax: string | null;
    municipio: string;
    colonia: string;
    descUbicacion: string | null;
    cveCatalogo: string | null;
    telefonos: unknown | null;
    tipoDomicilio: string | null;
    localidad: string | null;
}

/**
 * Interfaz para la entidad federativa.
 */
export interface EntidadFederativa {
    cveEntidad: string;
    nombre: string;
    codEntidadIdc: string | null;
    cvePais: string | null;
    pais: unknown | null;
    fechaCaptura: string | null;
    fechaInicioVigencia: string | null;
    fechaFinVigencia: string | null;
    activo: boolean;
}

/**
 * Interfaz para el país.
 */
export interface Pais {
    cvePais: string;
    nombre: string;
    fechaCaptura: string | null;
    cveMoneda: string | null;
    cvePaisWco: string | null;
    nombreAlterno: string | null;
    fecFinVigencia: string | null;
    fecIniVigencia: string | null;
    blnActivo: boolean;
    restriccion: string | null;
}
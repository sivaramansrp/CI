export interface FormularioGrupo {
    fechasSeleccionadas: FechasSeleccionadas;
    tipoDevAviso: TipoDevAviso,
    proveedorExtranjero:ProveedorExtranjero,
    modificacionSocios:ModificacionSocios,
    modificacionGoceInmueble:ModificacionGoceInmueble,
    personaFusionEscisionDTO:PersonaFusionEscisionDTO,
    datosEmpresa: DatosEmpresa,
    cargaTipo: CargaTipo,
    datosQuienRecibe: DatosQuienRecibe,
    datosDomicilioLugar: DatosDomicilioLugar,
    datosMercanciaSubmanufactura: DatosMercanciaSubmanufactura,
}

  export interface TipoDevAviso {
    modalidadCertificacion:string;
    foreignClientsSuppliers: boolean,
    nationalSuppliers: boolean,
    modificationsMembers: boolean,
    changesToLegalDocuments: boolean,
    mergerOrSplitNotice: boolean,
    additionFractions: boolean,
    acepto253:boolean,
  }

  export interface ProveedorExtranjero {
    archivoExtranjero:object | null,
    registrosProveedoresExtranjeros:string
    
  }

  export interface ModificacionSocios {
    ensucarácterde:number,
    obligadoaTributarenMéxico:boolean,
    nacionalidad:number,
    registroFederaldeContribuyentes:object | null,
    rfc:string,
    nombreCompleto:string
    
  }

  export interface ModificacionGoceInmueble{
    idAviInmueble:string,
    direccion: string,
    codigoPostal:string,
    cveEntidad: string,
    cveMunicipio: string,
   cveTipoDoc: string,
   fechaInicioAnterior: string,
   fechaFinAnterior: string,
   fechaInicioActual: string,
   fechaFinActual:string,
   rfcPartesC: string,
   rfcPartesCons: string,
   nombrePartesCons: string,
   caracterDeCons: string,
   observaciones: string
 }

 export interface PersonaFusionEscisionDTO{
  rfc: string,
  razonSocial: string,
  numFolioTramite: string,
  fechaInicioVigencia: string,
  fechaFinVigencia: string
 }



export interface DatosEmpresa {
    numeroPrograma: string,
    anoPrograma: string,
    mesCorrespondeAviso: string,
    anoCorrespondeAviso: string,
}

export interface CargaTipo {
    cargaTipo: string,
}

export interface FechasSeleccionadas{
  fechasSeleccionadas: string[] // Assuming it's an array of strings; adjust as needed
}

export interface DatosQuienRecibe {
    rfc: string,
    numberProgramaQr: string,
    anoProgramaQr: string,
}

export interface DatosDomicilioLugar {
    nombreComercial: string,
    entidadFederativa: string,
    alcaldiaMunicipio: string,
    colonias: string,
    calle: string,
    numeroExterior: string,
    numeroInterior: string,
    codigoPostal: string,
}

export interface DatosMercanciaSubmanufactura {
    fracArancelaria: string,
    nico: string,
    unidadMedida: string,
    cantidad: string,
    valorUsd: string,
    descripcionMercancia: string,
}
export interface ColumnasTabla {
    rfc: string,
    nombreComercial: string,
    entidadFederativa: string,
    alcaldioOMuncipio: string,
    colonia: string,
}
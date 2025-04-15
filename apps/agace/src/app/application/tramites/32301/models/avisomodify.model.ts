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
    archivoExtranjero:Object | null,
    registrosProveedoresExtranjeros:string
    
  }

  export interface ModificacionSocios {
    ensucarácterde:Number,
    obligadoaTributarenMéxico:boolean,
    nacionalidad:Number,
    registroFederaldeContribuyentes:Object | null,
    rfc:String,
    nombreCompleto:String
    
  }

  export interface ModificacionGoceInmueble{
    idAviInmueble:String,
    direccion: String,
    codigoPostal:String,
    cveEntidad: String,
    cveMunicipio: String,
   cveTipoDoc: String,
   fechaInicioAnterior: String,
   fechaFinAnterior: String,
   fechaInicioActual: String,
   fechaFinActual:String,
   rfcPartesC: String,
   rfcPartesCons: String,
   nombrePartesCons: String,
   caracterDeCons: String,
   observaciones: String
 }

 export interface PersonaFusionEscisionDTO{
  rfc: String,
  razonSocial: String,
  numFolioTramite: String,
  fechaInicioVigencia: String,
  fechaFinVigencia: String
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
  fechasSeleccionadas:any
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
export interface DatosTipoEmpresa {
    certificacionA: boolean;
    certificacionAA: boolean;
    certificacionAAA: boolean;
    socioComercial: boolean;
    opEconomicoAut: boolean;
    revisionOrigen: boolean;
}
export interface Solicitud5701 {
    idSolicitud: string;
    tipoSolicitud: string;
    datosImportadorExportador: DatosImportadorExportador;
    datosServicio: DatosServicio;
    datosDespacho: DatosDespacho;
    datosPedimento: DatosPedimento;
    mercancia: DatosMercancia;
    responsablesDespacho: ResponsablesDespacho[];
    pagos: DatosPago;

    tercerosRelacionados: Personas[];
}

export interface DatosImportadorExportador {
    rfcImportExport: string;
    nombreImportExport: string;
    nroRegistro: string;
    programaFomento: string;
    immex: string;
    immexValue: string;
    industriaAutomotriz: string;
    tipoEmpresaCertificada: string;
    idSocioComercial: string;
    opEconomicoAut: boolean;
    revisionOrigen: boolean;
}
export interface DatosServicio {
    fechaInicio: string;
    horaInicio: string;
    fechaFinal: string;
    horaFinal: string;
    fechasSeleccionadas: string[];
}

export interface DatosDespacho {
    despacho: string;
    rfcAutorizacion: string;
    ddexAutorizacion: string;

    idAduana: string;
    descripcionAduana: string;

    idSeccionDespacho: string;
    seccionAduanera: string;

    nombreRecinto: string;
    tipoDespacho: string;
    tipoOperacion: string;
    patente: string;
    relacionSociedad: boolean;
    encargoConferido: boolean;
    domicilio: string;
}

export interface DatosPedimento {
    idPedimento: number;
    patentePedimento: number;
    pedimento: string;
    aduana: number;
    tipoPedimento: string;
    numero: number;
    comprobanteValor: string;
    pedimentoValidado: boolean;
}

export interface DatosMercancia {
    paisOrigen: number;
    paisProcedencia: number;
    descripcion: string;
    justificacion: string;
}

export interface ResponsablesDespacho {
    gafeteRespoDespacho: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
}


export interface DatosPago {
    montoPagar: string;
    lineaCaptura: string;
    monto: number;
}

export interface Personas {
    razonSocial: string;
    correo: string;
}


// Pedimento
export interface DatosComponentePedimento {
    patente: number;
    idAduanaDespacho: number;
}

export interface Persona {
    gafeteRespoDespacho?: number ;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
}

export interface Pedimento {
    patente: number;
    pedimento: number;
    aduana: number;
    estadoPedimento: string;
    subEstadoPedimento: string;
    idTipoPedimento: number;
    descTipoPedimento: string;
    numero: string;
    comprobanteValor: string;
    pedimentoValidado: string;
  }

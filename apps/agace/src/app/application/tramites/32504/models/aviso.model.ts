export interface FormularioGrupo {
    datosEmpresa: DatosEmpresa,
    cargaTipo: CargaTipo,
    datosQuienRecibe: DatosQuienRecibe,
    datosDomicilioLugar: DatosDomicilioLugar,
    datosMercanciaSubmanufactura: DatosMercanciaSubmanufactura,
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
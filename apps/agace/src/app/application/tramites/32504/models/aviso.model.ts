export interface FormularioGrupo {
    datosEmpresa: DatosEmpresa,
    cargaTipo: CargaTipo,
    datosQuienRecibe: DatosQuienRecibe,
    datosDomicilioLugar: DatosDomicilioLugar,
    datosMercanciaSubmanufactura: DatosMercanciaSubmanufactura,
}

export interface DatosEmpresa {
    numero_programa: string,
    ano_programa: string,
    mes_corresponde_aviso: string,
    ano_corresponde_aviso: string,
}

export interface CargaTipo {
    carga_tipo: string,
}

export interface DatosQuienRecibe {
    rfc: string,
    number_programa_qr: string,
    ano_programa_qr: string,
}

export interface DatosDomicilioLugar {
    nombre_comercial: string,
    entidad_federativa: string,
    alcaldia_municipio: string,
    colonias: string,
    calle: string,
    numero_exterior: string,
    numero_interior: string,
    codigo_postal: string,
}

export interface DatosMercanciaSubmanufactura {
    frac_arancelaria: string,
    nico: string,
    unidad_medida: string,
    cantidad: string,
    valor_usd: string,
    descripcion_mercancia: string,
}
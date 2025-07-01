export interface FilaData {
    id: number;
    datosDelTramiteRealizar: {
    envasadoen: string,
    utilizoCafeComo: string,
    cantidadutilizada: string,
    numerodepedimento: string,
    paisdeimportacion: string,
    fraccionarancelaria: string,
    cantidad: string,
    unidaddemedida: string,
    precioapplicable: string,
    dolar: string,
    lote: string,
    otrasmarcas: string,
    elcafe: string,
    fechaexportacion: string,
    paisdetransbordo: string,
    mediodetransporte: string,
    Identificadordel: string,
    observaciones: string,
}

}
export interface FilaData2{
    id: number;
    datosDelTramiteRealizar: {
    tipoPersona: string,
    denominacion: string,
    domicilio: string,
    pais: string,
    codigopostal: number,
    telefono: number,
    correoelectronico: string
}
}
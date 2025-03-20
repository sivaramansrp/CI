export interface DatosDelTramite {
    certificadosAutorizados: number;
}

export interface ResponsableInspección {
    nombreInsp: string;
    primerApellido: string;
    segundoApellido: string;
    cantidadContenedores: number;
}

export interface MercanciaDatos {
    fraccionArancelaria: string;
    descripcionFraccion: string;
    nico: string;
    descripcionNico: string;
    unidadMedidaTarifa: string;
    cantidadTotalUMT: number;
}

export interface PagoDeDerechos {
    claveDeReferencia: string;
    cadenaDependencia: string;
    banco: string;
    llaveDePago: string;
    fechaInicioInput: string;
    importeDePago: string;

}

export interface PagoDeDerechosRevision {
    claveDeReferenciaRevision: string;
    cadenaDependenciaRevision: string;
    bancoRevision: string;
    llaveDePagoRevision: string;
    fechaInicioRevision: string;
    importeDePagoRevision: string;
}

export interface DatosGenerales {
    foliodel: string;
    aduanaDeIngreso: string;
    oficinaDeInspeccion: string;
    puntoDeInspeccion: string;
    numeroDeGuia: string;
    regimenAlQueDestina: string;
    datosParaMovilizacion: string;
    puntoDeVerificacion: string;
    identificacionDelTransporte: string;
    nombreDeLaEmpresaTransportista: string;
}

export interface DatosDeLaSolicitudInt {
    justificacion: string;
    certificadosAutorizados: string;
    fechaInicioInput: string;
    horaDeInspeccion: string;
    aduanaDeIngreso: string;
    sanidadAgropecuaria: string;
    puntoDeInspeccion: string;
    nombreInsp: string;
    primerApellido: string;
    segundoApellido: string;
    cantidadContenedores: string;
    tipoContenedor: string;
    medioDeTransporte: string;
    identificacionTransporte: string;
    esSolicitudFerros: string;
    banco:string;

}

export interface InternaDatosGeneralesInt {
    foliodel: number;
    aduanaIngreso: string;
    oficinaInspeccion: string;
    puntoInspeccion: string;
    claveUCON: string;
    establecimientoTIFs: string;
    nombreVeterinario: string;
    numeroGuia: string;
    regimen: string;
    capturaMercancia: string;
    animalesVivos: string;
    coordenadas: string;
    movilizacionNacional: string;
    identTransporte: string;
    puntoVerificacion: string;
    empresaTransportista: string;
    datosParaMovilizacion: string;
    puntoDeVerificacion: string;
    regimenAlQueDestina:string;
}

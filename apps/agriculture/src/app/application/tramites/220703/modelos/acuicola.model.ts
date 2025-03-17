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
    fechaInicio: string;
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

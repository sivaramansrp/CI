export interface NumeroOficioAsignacionDetalle {
    estado: string;
    representacionFederal: string;
    sumaAprobada: number;
    sumaExpedida: number;
    montoDisponible: number;
    numOficio: string;
    fechaInicio: string;
    fechaFinVigenciaAprobada: string;
    regimenAduanero: string;
    descripcionProducto: string;
    clasificaionSubproducto: string;
    unidadMedidaOficialCupo: string;
    fechaInicioVigencia: string;
    fechaFinVigencia: string;
    mecanismoAsignacion: string;
    tratado: string;
    fraccionesArancelarias: string;
    paisesCupo: string;
    observaciones: string;
    descripcionFundamento: string;
    montoDisponibleAsignacion: number;
}

export interface NumeroOficioAsignacionDetalleRespquesta {
    code: number;
    data: NumeroOficioAsignacionDetalle[];
    message: string;
}

export interface ExpedirMonto {
    montoExpedir: number;
}
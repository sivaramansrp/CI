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
    fechaInicio: string;
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
export interface ServiceDatos {
    TABLA_Columna_1: string;
    TABLA_Columna_2: string;
    TABLA_Columna_3: string;
    TABLA_Columna_4: string;
    TABLA_Columna_5: string;
    TABLA_Columna_6: string;
    TABLA_Columna_7: string;
    TABLA_Columna_8: string;
    TABLA_Columna_9: string;
    TABLA_Columna_10: string;
    TABLA_Columna_11: string;
    TABLA_Columna_12: string;
    TABLA_Columna_13: string;
    TABLA_Columna_14: string;
    TABLA_Columna_15: string;
    TABLA_Columna_16: string;
    TABLA_Columna_17: string;
    TABLA_Columna_18: string;
    TABLA_Columna_19: string;
  }
  
  export interface MercanciaDatosDos {
    code: number;
    data: ServiceDatos[];
    message: string;
  }
  export interface ServiceDatosDeMercancia {
    Fracciónarancelaria: string;
    Descripcióndelafracción: string;
    Nico: string;
    DescripciónNico: string;
    UnidaddemedidadetarifaUMT: string;
    CantidadtotalUMT: string;
    estatus: boolean;
  }
  
  export interface ApiResponseDos {
    code: number;
    data: ServiceDatosDeMercancia[];
    message: string;
  }
  export interface ExportadorInfo {
    Nombre: string;
    Telefono: string;
    correo: string;
    Domicilio: string;
    Pais: string;
  }
  
 export interface ExportadorInfoDatos {
    code: number;
    data: ExportadorInfo[];
    message: string;
  }

export interface DestinoInfo {
    TABLA_Columna_1: string;
    TABLA_Columna_2: string;
    TABLA_Columna_3: string;
    TABLA_Columna_4: string;
    TABLA_Columna_5: string;
    TABLA_Columna_6: string;
    TABLA_Columna_7: string;
    TABLA_Columna_8: string;
    TABLA_Columna_9: string;
    TABLA_Columna_10: string;
    TABLA_Columna_11: string;
  }
  
  export interface DestinoInfoDatos {
    code: number;
    data: DestinoInfo[];
    message: string;
  }
  export interface DatosInfo {
    id: number;
    nombreInsp: string;
    primerApellido: string;
    segundoApellido: string;
    cantidadContenedores: number;
  }
  
  export interface InspeccionApiResponse {
    data: DatosInfo;
  }

  export interface RevisionData {
    claveDeReferenciaRevision: string;
    cadenaDependenciaRevision: string;
    bancoRevision: string;
    llaveDePagoRevision: string;
    fechaInicioRevision: string;
    importeDePagoRevision: string;
  }
  
  export interface PagoDeDerechosApiResponse {
    data: RevisionData;
  }
  
  export interface DataInfo {
    certificadosAutorizados: string;
  }
  
  export interface CertificadosResponse {
    data: DataInfo;
  }
  
  export interface PagoDeRevisionData {
    claveDeReferenciaRevision: string;
    cadenaDependenciaRevision: string;
    bancoRevision: string;
    llaveDePagoRevision: string;
    fechaInicioRevision: string;
    importeDePagoRevision: string;
  }
  
  export interface PagoDeDerechosRevisionResponse {
    data: PagoDeRevisionData;
  }
  
  
  
  
  

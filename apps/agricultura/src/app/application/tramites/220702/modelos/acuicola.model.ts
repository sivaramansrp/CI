export interface DatosDelTramite {
    certificadosAutorizados: number;
}

export interface ResponsableInspección {
    nombreInspector: string;
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
  folioDelTramite: string;
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
    nombreInspector: string;
    primerApellido: string;
    segundoApellido: string;
    cantidadContenedores: string;
    tipoContenedor: string;
    medioDeTransporte: string;
    identificacionTransporte: string;
    esSolicitudFerros: string;
    banco:string;
    regimenAlQueDestina: string;
    nombreDeLaEmpresaTransportista: string;
    puntoDeVerificacion: string;
    identificacionDelTransporte: string;
    datosParaMovilizacion: string;
    oficinaDeInspeccion: string;
    
}

export interface InternaDatosGeneralesInt {
  folioDelTramite: number;
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
    tablaColumna1: string;
    tablaColumna2: string;
    tablaColumna3: string;
    tablaColumna4: string;
    tablaColumna5: string;
    tablaColumna6: string;
    tablaColumna7: string;
    tablaColumna8: string;
    tablaColumna9: string;
    tablaColumna10: string;
    tablaColumna11: string;
    tablaColumna12: string;
    tablaColumna13: string;
    tablaColumna14: string;
    tablaColumna15: string;
    tablaColumna16: string;
    tablaColumna17: string;
    tablaColumna18: string;
    tablaColumna19: string;
  }
  
  export interface MercanciaDatosDos {
    code: number;
    data: ServiceDatos[];
    message: string;
  }
  export interface ServiceDatosDeMercancia {
    fraccionArancelaria: string;
    descripcionDelaFraccion: string;
    nico: string;
    descripcionNico: string;
    unidadDeMedidadeTarifaUMT: string;
    cantidadTotalUMT: string;
    estatus: boolean;
  }
  
  export interface ApiResponseDos {
    code: number;
    data: ServiceDatosDeMercancia[];
    message: string;
  }
  export interface ExportadorInfo {
    nombre: string;
    teleFono: string;
    correo: string;
    domicilio: string;
    pais: string;
  }
  
 export interface ExportadorInfoDatos {
    code: number;
    data: ExportadorInfo[];
    message: string;
  }

export interface DestinoInfo {
  tablaColumna1: string;
  tablaColumna2: string;
  tablaColumna3: string;
  tablaColumna4: string;
  tablaColumna5: string;
  tablaColumna6: string;
  tablaColumna7: string;
  tablaColumna8: string;
  tablaColumna9: string;
  tablaColumna10: string;
  tablaColumna11: string;
  }
  
  export interface DestinoInfoDatos {
    code: number;
    data: DestinoInfo[];
    message: string;
  }
  export interface DatosInfo {
    id: number;
    nombreInspector: string;
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

  export interface RevisionDataPageDeDerechos {
    claveDeReferencia: string;
    cadenaDependencia: string;
    banco: number;
    llaveDePago: string;
    fechaInicio: string;
    importeDePago: string;
  }
  
  export interface PagoDeDerechosResponseDos {
    data: RevisionDataPageDeDerechos;
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

  
  
  
  
  

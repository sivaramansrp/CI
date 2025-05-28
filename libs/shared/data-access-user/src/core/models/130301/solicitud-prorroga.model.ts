export interface SolicitudForma {
    folio?: string;
    fechaInicio?: string;
    estatusSolicitud?: string;
    folioResolucion?: string;
}

/**
 * Interfaz que representa la respuesta de los datos.
 */
export interface RespuestaDatos {
    code: number;
    data: SolicitudForma[];
    message: string;
}

export interface DatosDelTramite {
    numeroFolioTramiteOriginal: string;
    solicitudOpcion:string;
    regimen:string;
    clasificacionDelRegimen:string;
    productoOpcion:string;
    descripcionMercancia:string;
    fraccionArancelaria:string;
    umt:string;
    cantidad:string;
    valorFactura:string;
}

export interface RequestDatosDelTramite {
    code: number;
    data: DatosDelTramite[];
    message: string;
}


export interface PartidasInfo {
    serial:string;
    cantidad: string;
    descripcion: string;
    precioUnitarioUSD:string;
    totalUSD:string;
}

export const PARTIDAS_TABLA = [
    {
        encabezado: '',
        clave: (ele: PartidasInfo): string => ele.serial,
        orden: 1,
      },
    {
      encabezado: 'Cantidad',
      clave: (ele: PartidasInfo): string => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: PartidasInfo): string => ele.descripcion,
      orden: 3,
    },
    {
        
        encabezado: 'Precio unitario USD',
        clave: (ele: PartidasInfo): string => ele.totalUSD,
        orden: 4,
    },
    {
        
        encabezado: 'Total USD',
        clave: (ele: PartidasInfo): string => ele.precioUnitarioUSD,
        orden: 5,
    },
    
];

export interface RespuestaTabla {
    code: number;
    data: PartidasInfo[];
    message: string;
}

export interface PartidasForma {
    usoEspecificoMercancia: string;
    justificacionBeneficio:string;
    observaciones:string;
    representacionFederal:string;
}

export interface RequestPartidasForma {
    code: number;
    data: PartidasForma[];
    message: string;
}

export interface CertificadoKimberleyForma {
    certificadosEmitidos: string;
    numeroCertificadokimberley:string;
    nombreIngles:string;
    nombreExportador:string;
    direccionExportador:string;
    nombreImportador:string;
    direccionImportador:string;
    numeroEnLetra:string;
    numeroEnLetraIngles:string;
    numeroFactura:string;
    cantidadQuilates:string;
    valorDiamantes:string;
}

export interface RequestCertificadoKimberleyForma {
    code: number;
    data: CertificadoKimberleyForma[];
    message: string;
}

export interface ProrrogasForma {
    folioResolucion: string;
    cantidad:string;
    prorrogaDel:string;
    prorrogaAl:string;
}

export interface RequestProrrogasForma {
    code: number;
    data: ProrrogasForma[];
    message: string;
}

export interface ProrrogasInfo {
    fechaSolicitud:string;
    fechaInicial: string;
    fechaFinal: string;
}

export const PRORROGAS_TABLA = [
    {
        encabezado: 'Fecha solicitud',
        clave: (ele: ProrrogasInfo): string => ele.fechaSolicitud,
        orden: 1,
      },
    {
      encabezado: 'Fecha inicial',
      clave: (ele: ProrrogasInfo): string => ele.fechaInicial,
      orden: 2,
    },
    {
      encabezado: 'Fecha final',
      clave: (ele: ProrrogasInfo): string => ele.fechaFinal,
      orden: 3,
    }
    
];

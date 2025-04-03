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
        clave: (ele: PartidasInfo) => ele.serial,
        orden: 1,
      },
    {
      encabezado: 'Cantidad',
      clave: (ele: PartidasInfo) => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: PartidasInfo) => ele.descripcion,
      orden: 3,
    },
    {
        
        encabezado: 'Precio unitario USD',
        clave: (ele: PartidasInfo) => ele.totalUSD,
        orden: 4,
    },
    {
        
        encabezado: 'Total USD',
        clave: (ele: PartidasInfo) => ele.precioUnitarioUSD,
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
    
}

export interface RequestCertificadoKimberleyForma {
    code: number;
    data: CertificadoKimberleyForma[];
    message: string;
}

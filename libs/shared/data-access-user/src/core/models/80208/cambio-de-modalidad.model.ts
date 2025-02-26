
export interface CambioDeModalidadForm {
    seleccionaLaModalidad: string;
    folio: number;
    año: number;
    seleccionaModalidad: string;
    cambioModalidad: string;
}

export interface CambioModalidad {
    id: number;
    descripcion: string;
}

export interface CambioModalidadResponse {
    cambioModalidad: {
        data: CambioModalidad[];
    };
}

export const CONFIGURACION_SERVICIO = [
    {
        encabezado: 'Descripción del servicio',
        clave: (ele: ServicioInfo) => ele.descripciónDelServicio,
        orden: 1
    },
    {
        encabezado: 'Tipo de servicio',
        clave: (ele: ServicioInfo) => ele.tipoDeServicio,
        orden: 2
    },
]

export interface ServicioInfo {
    descripciónDelServicio: string;
    tipoDeServicio: string;
    estatus: boolean;
}
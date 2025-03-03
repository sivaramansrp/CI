
export interface CambioDeModalidadForm {
    seleccionaLaModalidad: string;
    folio: number;
    ano: number;
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
        clave: (ele: ServicioInfo): string | undefined => ele.descripcionDelServicio,
        orden: 1
    },
    {
        encabezado: 'Tipo de servicio',
        clave: (ele: ServicioInfo): string | undefined => ele.tipoDeServicio,
        orden: 2
    },
]

export interface ServicioInfo {
    descripcionDelServicio: string;
    tipoDeServicio: string;
    estatus: boolean;
}

export interface ConfiguracionColumna<T> {
    encabezado: string; // Título de la columna
    clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
    orden: number; // Orden de la columna en la tabla
}
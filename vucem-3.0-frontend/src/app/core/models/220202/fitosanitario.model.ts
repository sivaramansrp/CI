export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}
export interface AccionBoton {
    accion: string;
    valor: number;
}
export interface Datos_De_Tabla {
    code: number;
    data: Datos_de_fila[];
    message: string;
}

export interface Datos_de_fila {
    Fecha_Creacion: string;
    Mercancia: string;
    Cantidad: number;
    Proveedor: string;
}
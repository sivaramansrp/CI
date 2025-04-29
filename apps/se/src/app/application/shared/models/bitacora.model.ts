export interface Bitacora {
    tipoModificacion: string;
    fechaModificacion: string;
    valoresAnteriores: string;
    valoresNuevos: string;
}

export interface BitacoraResquesta {
    code: number;
    data: Bitacora[];
    message: string;
}
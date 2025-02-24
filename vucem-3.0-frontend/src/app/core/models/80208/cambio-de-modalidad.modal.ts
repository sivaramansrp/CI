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
export interface ServiciosImmexTablePayload {
    servicio: string;
    servicioSeleccionado?: {
        idServicio: number;
        claveServicio: number;
    }[];
    modalidad: string;
    idPrograma: string;
}

export interface ServicioItemResponse {
    descripcion: string | null;
    descripcionTipo: string | null;
    descripcionTestado: string | null;
    estatus: boolean;
    desEstatus: string | null;
    idServicio: number;
    idSolicitud: number | null;
    solicitud: string | null;
    tipoServicio: string | null;
    testado: boolean;
    claveServicio: number;
    fecIniVigencia: string | null;
    fecFinVigencia: string | null;
}
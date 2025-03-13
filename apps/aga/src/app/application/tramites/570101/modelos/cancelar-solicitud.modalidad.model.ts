
export interface CancelarSolicitudForm {
    folioSVEX: string;
    folioVUCEM: string;
    tipoDeCancelacion: string;
    horaIncio: string;
    horaFin: string;
    descripcion: string;
    fechasSeleccionadas: { selectedFechas: string[] }
}

export interface CancelarModalidad {
    id: number;
    descripcion: string;
}
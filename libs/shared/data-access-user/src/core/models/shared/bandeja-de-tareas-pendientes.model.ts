export interface BandejaDeTareasPendientes {
    folioTramite: string;
    tipoDeTramite: string;
    nombreDeLaTarea: string;
    fechaDeAsignacion: string;
    estadoDeTramite: string;
    departamento: string;
    numeroDeProcedimiento: string;
    origin: string;
}

export interface SeleccionadoDepartamento {
    tieneDepartamento: boolean;
    nombreDelDepartamento: string;
    numeroDeProcedimiento: string;
}
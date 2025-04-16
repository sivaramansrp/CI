export interface PermisosVigentes {
    numeroResolucion: string;
    tipoSolicitud: string;
    regimen: string;
    clasificacionRegimen: string;
    periodoDeVigencia: string;
    fraccionArancelaria: string;
    unidad: string;
    nico: string;
    nicoDescripcion: string;
    acotacion: string;
    cantidadAutorizada: string;
    valorAutorizada: string;
    fechaInicioVigencia: string;
    fechaFinVigencia: string;
}

export interface PermisosVigentesRespuesta {
    code: number;
    data: PermisosVigentes[];
    message: string;
}
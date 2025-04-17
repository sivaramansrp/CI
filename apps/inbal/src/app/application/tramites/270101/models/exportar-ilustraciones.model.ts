
export interface DatosDelSolicitud {
    autor: string;
    titulo: string;
    tecnicaDeRealizacion: string;
    conMarco: string;
    ancho: number;
    alto: number;
    profundidad: number;
    diametro: number;
    variables: string;
    anoDeCreacion: string;
    avaluo: number;
    moneda: string;
    propietario: string;
    fraccionArancelaria: string;
    descripcion: string;
}

export interface AduanaDeSalida {
    tipo: string;
    ciudad: string;
    sede: string;
    tipoDeTraslado: string;
    fechaExhibicion: string;
    observaciones: string;
    fechoInicio: string;
    fechaFin: string;
}
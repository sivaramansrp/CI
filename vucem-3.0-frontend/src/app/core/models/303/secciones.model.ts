export interface Agente {
    nombres: string;
    segundoApellido: string;
    primerApellido: string;
    tipoFigura: string;
    patenteAutorizacion: string;
    se: string;
}
export interface Transportista {
    transportista: string;
    tipoPersona: string;
    taxId: string;
    razonSocial: string;
    rfc: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
}

export interface Miembro {
    tipoPersona: string;
    nombre: string;
    rfc: string;
    caracter: string;
    nacionalidad: string;
    tributar: string;
    nombreEmpresa: string;
}

export interface Inventario {
    identificacion: string;
    radicacion: string;
    conformeAnexo: boolean;
}

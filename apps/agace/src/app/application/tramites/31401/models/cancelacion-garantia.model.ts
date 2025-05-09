export interface RequisitosTabla {
    rfc: string;
    nombre: string;
}

export interface MiembroTabla {
    tipoDePersona: string;
    rfc: string;
    nombre: string;
    enSuCarater: string;
}

export interface TipoInversionTabla {
    tipoDeInversion: string;
    descripcion: string;
    valor: string;
}

export interface TerecerosTabla {
    rfc: string;
    curp: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
}
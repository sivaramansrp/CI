export interface RegistroDeSolicitudesTabla {
    movimiento: number;
    cuenta: string;
    rfc: string;
    persona: string;
    numerodecuenta: string;
    sucursal: string;
    instituciondecredito: string;
    numero: string;
    radicaCuenta: string;
    estado: string;
    domicilio: string;
}

export interface DatosGenerales {
    data: DATOS[];
}

export interface DATOS {
    aduanaAdicional: string;
    nombre: string;
    federalDeContribuyentes: string;
    tipoDePersona: string;
}
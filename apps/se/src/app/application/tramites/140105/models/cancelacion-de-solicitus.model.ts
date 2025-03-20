export interface Cancelacion {
    folioTramite: string;
    tipoDeSolicitud: string;
    regimen: string;
    cdr: string;
    condicionDeLaMercancia: string;
    fraccionArancelaria: string;
    umt: string;
    cantidad: string;
    usd: string;
}
export interface PermisosDatos {
    datos: Cancelacion[];
}
export function createDatosState(params: Partial<PermisosDatos> = {}): PermisosDatos {
    return {
        datos: params as Cancelacion[]
    }
}

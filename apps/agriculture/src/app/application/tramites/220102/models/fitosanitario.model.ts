export interface MercanciaForm {
    id?: number;
    nombreComun: string;
    nombreCientifico: string;
    uso: string;
    paisOrigen: string;
    paisProcedencia: string;
    tipoProducto: string;
    fraccionArancelaria: string;
    descripcionFraccionArancelaria: string;
    cantidadUMT: string;
    umt: string;
    cantidadUMC: string;
    umc: string;
    descripcion: string;
}
export interface FinalDataToSend {
    datos: MercanciaForm[];
}
export function createDatosState(params: Partial<FinalDataToSend> = {}): FinalDataToSend {
    return {
        datos: params as MercanciaForm[]
    }

}
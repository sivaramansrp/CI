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

/**
 * Función para crear el estado inicial de los datos de permiso.
 * Esta función crea y devuelve un objeto de tipo PermisosDatos, 
 * con los datos de tipo Cancelacion proporcionados en el parámetro 
 * de entrada. Si no se pasan parámetros, se asigna un array vacío 
 * por defecto.
 * 
 * @param params Parámetros opcionales para personalizar el estado 
 * inicial de los datos. Debe ser de tipo Partial<PermisosDatos>, 
 * lo que significa que es posible no proporcionar todos los campos.
 * @returns Un objeto de tipo PermisosDatos con el campo 'datos' 
 * actualizado con los valores proporcionados o un array vacío por defecto.
 */

export function createDatosState(params: Partial<PermisosDatos> = {}): PermisosDatos {
    return {
        datos: params as Cancelacion[]
    }
}

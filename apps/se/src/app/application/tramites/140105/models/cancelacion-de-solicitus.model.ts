/**
 * Interfaz que representa una cancelación de solicitud.
 * 
 * @property folioTramite - Folio del trámite.
 * @property tipoDeSolicitud - Tipo de solicitud.
 * @property regimen - Régimen aduanero.
 * @property cdr - Código de documento relacionado.
 * @property condicionDeLaMercancia - Condición de la mercancía.
 * @property fraccionArancelaria - Fracción arancelaria.
 * @property umt - Unidad de medida de transacción.
 * @property cantidad - Cantidad de mercancía.
 * @property usd - Valor en dólares estadounidenses.
 */
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
/**
 * Interfaz que representa los datos de permisos para la cancelación de solicitudes.
 * 
 * @property datos - Arreglo de objetos de tipo Cancelacion.
 * @property motivoCancelacion - (Opcional) Motivo de la cancelación.
 */
export interface PermisosDatos {
    datos: Cancelacion[];
    motivoCancelacion?: string;
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
        datos: params as Cancelacion[],
        motivoCancelacion: params.motivoCancelacion || '',
    }
}

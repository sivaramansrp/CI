export interface CuposDisponibles{
    cupo: string;
    nombre_de_producto: string;
    nombre_del_subproducto: string;
    mecanismo_de_asignación: string;
    tipo_cupo: string;
}
export interface CuposDisponiblesDatos {
    datos: CuposDisponibles[];
}

export interface CertificadosDisponibles {
    folio_del_oficio_de_certificado: string;
    nombre_denominacion_o_razon_social: string;
    estado: string;
    fabricante: string;
    importador: string;
    unidad_primaria: string;
    monto_expedido: string;
    monto_a_cancelar: string;
    monto_utilizado: string;
}
export interface CertificadosDisponiblesDatos {
    datos: CertificadosDisponibles[];
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

export function createDatosState(params: Partial<CuposDisponiblesDatos> = {}): CuposDisponiblesDatos {
    return {
        datos: params as CuposDisponibles[]
    }
}

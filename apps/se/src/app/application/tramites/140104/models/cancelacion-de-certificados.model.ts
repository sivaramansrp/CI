/**
 * Representa un cupo disponible con sus propiedades principales.
 */
export interface CuposDisponibles {
    /** Identificador del cupo */
    cupo: string;
    /** Nombre del producto asociado al cupo */
    nombre_de_producto: string;
    /** Nombre del subproducto asociado al cupo */
    nombre_del_subproducto: string;
    /** Mecanismo mediante el cual se asigna el cupo */
    mecanismo_de_asignación: string;
    /** Tipo de cupo (por ejemplo, anual, parcial, etc.) */
    tipo_cupo: string;
}

/**
 * Estructura que envuelve un arreglo de cupos disponibles.
 */
export interface CuposDisponiblesDatos {
    /** Lista de cupos disponibles */
    datos: CuposDisponibles[];
}

/**
 * Representa los datos de un certificado disponible para cancelación.
 */
export interface CertificadosDisponibles {
    /** Folio del oficio del certificado */
    folio_del_oficio_de_certificado: string;
    /** Nombre, denominación o razón social del titular del certificado */
    nombre_denominacion_o_razon_social: string;
    /** Estado del certificado (por ejemplo, activo, cancelado) */
    estado: string;
    /** Fabricante relacionado con el certificado */
    fabricante: string;
    /** Importador asociado al certificado */
    importador: string;
    /** Unidad primaria usada para el certificado */
    unidad_primaria: string;
    /** Monto total expedido en el certificado */
    monto_expedido: string;
    /** Monto que se desea cancelar del certificado */
    monto_a_cancelar: string;
    /** Monto que ya ha sido utilizado del certificado */
    monto_utilizado: string;
}

/**
 * Estructura que envuelve un arreglo de certificados disponibles.
 */
export interface CertificadosDisponiblesDatos {
    /** Lista de certificados disponibles */
    datos: CertificadosDisponibles[];
}

/**
 * Representa una factura disponible para ser devuelta.
 */
export interface FacturasDisponiblesParaDevolver {
    /** Número identificador de la factura */
    numero_de_factura: string;
    /** Importe inicial registrado en la factura */
    importe_inicial: string;
}

/**
 * Representa una factura seleccionada para devolución,
 * incluyendo el saldo que se desea devolver.
 */
export interface FacturasSeleccionadasParaDevolver {
    /** Número identificador de la factura */
    numero_de_factura: string;
    /** Importe inicial registrado en la factura */
    importe_inicial: string;
    /** Monto que se devolverá de la factura */
    saldo_a_devolver: string;
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

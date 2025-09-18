/**
 * Modelo de respuesta para facturas TPL.
 */
export interface FacturasTplCapturaResponse {
    /// Número total de elementos disponibles
    cantidad: number;
    // cantidad de unidades devueltas
    cantidad_devolucion: string;
    // cantidad de unidades disponibles
    cantidad_disponible: number;
    // cantidad total de unidades facturadas
    cantidad_total: number;
    // Descripción de la unidad de medida
    descripcion: string;
    // Fecha de expedición de la factura
    direccion_consig_emisor: string;
    // Fecha de expedición de la factura
    fecha_expedicion: string;
    // ID único de la factura en el sistema
    id_factura_expedicion: number;
    // Importe total en dólares estadounidenses
    imp_dls: number;
    // Número de factura asignado por el emisor
    num_factura: string;
    // Razón social del consignatario/emisor
    razon_social_consig_emisor: string;
    // Suma acumulada de cantidades devueltas
    suma_cantidad_devolucion: number;
}


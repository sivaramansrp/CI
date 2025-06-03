/**
 * Representa una línea de captura utilizada para pagos o transacciones.
 *
 * @property lineaCaptura - Cadena que identifica la línea de captura.
 * @property monto - Monto asociado a la línea de captura.
 */
export interface LineaCaptura {
    lineaCaptura: string;
    monto: number;
}

export interface ValidaLineaCapturaPagadaResponse {
    codigo: string;
    mensaje: string;
    datos: DatosLineaCapturaPagada;
}

export interface DatosLineaCapturaPagada {
  mensaje: string;
  pago_Model: PagoModel;
  valido: boolean;
}

export interface PagoModel {
    ic: string;
    aduana: string;
    cve_aduana: string;
    descripcion_tipo_documento: string;
    documento: string;
    estatus: string;
    fecha_pago: string;
    guias: string;
    importe: number;
    institucion_bancaria: string;
    patente: string;
    transaccion: string;
}
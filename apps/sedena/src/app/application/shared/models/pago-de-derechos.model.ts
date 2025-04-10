export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: true,
};
export interface PagoDerechosFormState {
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  fechaPago: string;
  importePago: string;
}

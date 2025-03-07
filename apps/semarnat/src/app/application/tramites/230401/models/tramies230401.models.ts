/**
 * Representa el estado de Pago de Derechos.
 * Esta interfaz se utiliza para el FormGroup del componente de pago de derechos.
 */
export interface PagoDerechosState {
  clave: string;
  dependencia: string;
  banco: string;
  llavePago: string;
  fecha: string;
  importePago: string;
}
/**
 * 
 * Representa los datos del proveedor.
 * */
export interface Proveedor {
  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona: string;
  /**
   * País donde se encuentra el proveedor.
   */
  pais: string;
  /**
   * Estado donde se encuentra el proveedor.
   */
  estado: string;
  /**
   * Código postal del domicilio del proveedor.
   */
  codigoPostaloEquivalente: string;
  /**
   * Colonia donde se encuentra el proveedor.
   */
  coloniaoEquivalente: string;
  /**
   * Calle donde se encuentra el proveedor.
   */
  calle: string;
  /**
   * Número exterior del domicilio del proveedor.
   */
  numeroExterior: string;
  /**
   * Número interior del domicilio del proveedor.
   */
  numeroInterior: string;
  /**
   * Lada del teléfono del proveedor.
   */
  lada: string;
  /**
   * Teléfono del proveedor.
   */
  telefono: string;
  /**
   * Correo electrónico del proveedor.
   */
  correoElectronico: string;
}
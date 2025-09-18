/**
 * 
 * Representa los datos del facturador.
 */
export interface Facturador {
  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona: string;
  /**
   * País donde se encuentra el facturador.
   */
  pais: string;
  /**
   * Estado donde se encuentra el facturador.
   */
  estado: string;
  /**
   * Código postal del domicilio del facturador.
   */
  codigoPostaloEquivalente: string;
  /**
   * Colonia donde se encuentra el facturador.
   */
  coloniaoEquivalente: string;
  /**
   * Calle donde se encuentra el facturador.
   */
  calle: string;
  /**
   * Número exterior del domicilio del facturador.
   */
  numeroExterior: string;
  /**
   * Número interior del domicilio del facturador.
   */
  numeroInterior: string;
  /**
   * Lada del teléfono del facturador.
   */
  lada: string;
  /**
   * Teléfono del facturador.
   */
  telefono: string;
  /**
   * Correo electrónico del facturador.
   */
  correoElectronico: string;
}
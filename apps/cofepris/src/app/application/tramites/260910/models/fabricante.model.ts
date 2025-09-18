/**
 * Representa los datos del fabricante.
 * */
export interface Fabricante {
  /**
   * Nacionalidad del fabricante.
   */
  tercerosNacionalidad: string;
  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona: string;
  /**
   * Nombre del fabricante.
   */
  nombre: string;
  /**
   * Primer apellido del fabricante.
   */
  primerApellido: string;
  /**
   * Segundo apellido del fabricante.
   */
  segundoApellido: string;
  /**
   * País donde se encuentra el fabricante.
   */
  pais: string;
  /**
   * Estado en el extranjero del fabricante.
   */
  extranjeroEstado: string;
  /**
   * Estado o localidad del fabricante.
   */
  estadoLocalidad: string;
  /**
   * Municipio o alcaldía del fabricante.
   */
  municipioAlcaldia: string;
  /**
   * Localidad del fabricante.
   */
  localidad: string;
  /**
   * Entidad federativa del fabricante.
   */
  entidadFederativa: string;
  /**
   * Código postal del fabricante.
   */
  codigoPostaloEquivalente: string;
  /**
   * Colonia del fabricante.
   */
  colonia: string;
  /**
   * Colonia equivalente del fabricante.
   */
  coloniaoEquivalente: string;
  /**
   * Calle del fabricante.
   */
  calle: string;
  /**
   * Número exterior del fabricante.
   */
  numeroExterior: string;
  /**
   * Número interior del fabricante.
   */
  numeroInterior: string;
  /**
   * Lada del teléfono del fabricante.
   */
  lada: string;
  /**
   * Teléfono del fabricante.
   */
  telefono: string;
  /**
   * Correo electrónico del fabricante.
   */
  correoElectronico: string;
}
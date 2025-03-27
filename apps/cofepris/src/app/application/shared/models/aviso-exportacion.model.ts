/**
 * Interfaz que representa una acción de un botón.
 */
export interface AccionBoton {
  /**
   * Nombre de la acción que se ejecutará al presionar el botón.
   */
  accion: string;

  /**
   * Valor asociado a la acción del botón.
   */
  valor: number;
}

/**
 * Interfaz que representa el modelo de un permiso.
 */
export interface PermisoModel {
  /**
   * Nombre del titular del permiso.
   */
  Nombre: string;

  /**
   * Registro Federal de Contribuyentes (RFC) del titular.
   */
  RFC: string;

  /**
   * Clave Única de Registro de Población (CURP) del titular.
   */
  CURP: string;

  /**
   * Número de teléfono del titular.
   */
  Teléfono: number;

  /**
   * Correo electrónico del titular.
   */
  CorreoElectrónico: string;

  /**
   * Nombre de la calle donde se encuentra el domicilio del titular.
   */
  calle: string;

  /**
   * Número exterior del domicilio del titular.
   */
  numeroExterior: number;

  /**
   * Número interior del domicilio del titular (si aplica).
   */
  numeroInterior: number;

  /**
   * País donde se encuentra el domicilio del titular.
   */
  pais: string;

  /**
   * Colonia donde se encuentra el domicilio del titular.
   */
  colonia: string;

  /**
   * Municipio donde se encuentra el domicilio del titular.
   */
  municipio: string;

  /**
   * Localidad donde se encuentra el domicilio del titular.
   */
  localidad: string;

  /**
   * Entidad federativa donde se encuentra el domicilio del titular.
   */
  entidadFederativa: string;

  /**
   * Estado o región de la localidad donde se encuentra el domicilio del titular.
   */
  estadoLocalidad: string;

  /**
   * Código postal del domicilio del titular.
   */
  codigoPostal: number;
}
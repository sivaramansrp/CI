/**
 * Interfaz que representa la información de un fabricante.
 */
export interface Fabricante {
  /** Nombre del fabricante. */
  nombre: string;

  /** Registro Federal de Contribuyentes (RFC) del fabricante. */
  rfc: string;

  /** Clave Única de Registro de Población (CURP) del fabricante. */
  curp: string;

  /** Número telefónico de contacto del fabricante. */
  telefono: string;

  /** Dirección de correo electrónico del fabricante. */
  correoElectronico: string;

  /** Nombre de la calle donde se encuentra el fabricante. */
  calle: string;

  /** Número exterior del domicilio del fabricante. */
  numeroExterior: string;

  /** Número interior del domicilio del fabricante, si aplica. */
  numeroInterior: string;

  /** País donde está ubicado el fabricante. */
  pais: number;

  /** Colonia donde se encuentra el fabricante. */
  colonia: number;

  /** Municipio donde se encuentra el fabricante. */
  municipio: number;

  /** Localidad específica del domicilio del fabricante. */
  localidad: number;

  /** Estado donde se encuentra el fabricante. */
  estado: number;

  /** Segundo estado o subdivisión administrativa (si aplica). */
  estado2: string;

  /** Código postal del domicilio del fabricante. */
  codigo: number;
}

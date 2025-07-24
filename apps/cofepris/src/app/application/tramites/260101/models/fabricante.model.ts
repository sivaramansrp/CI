/**
 * Interfaz que representa la información de un fabricante.
 */
export interface Fabricante {
  /** Identificador único del fabricante. */
  tercerosNacionalidad: number;

  /** Tipo de persona del fabricante (física o moral). */
  tipoPersona: number;

  /** Registro Federal de Contribuyentes (RFC) del fabricante. */
  rfc: string;

  /** Clave Única de Registro de Población (CURP) del fabricante. */
  curp: string;

  /** Denominación o razón social del fabricante. */
  denominacion: string;

  /** Nombre del fabricante. */
  nombre: string;

  /** Apellido paterno del fabricante. */
  apellidoPaterno: string;

  /** Apellido materno del fabricante. */
  apellidoMaterno: string;

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

  /** Nombre del país donde está ubicado el fabricante. */
  paisNombre?: string;

  /** Colonia donde se encuentra el fabricante. */
  colonia: number;

  /** Nombre de la colonia donde se encuentra el fabricante. */
  coloniaNombre?: string;

  /** Municipio donde se encuentra el fabricante. */
  municipio: number;

  /** Nombre del municipio donde se encuentra el fabricante. */
  municipioNombre?: string;

  /** Localidad específica del domicilio del fabricante. */
  localidad: number;

  /** Nombre de la localidad donde se encuentra el fabricante. */
  localidadNombre?: string;

  /** Clave LADA del teléfono del fabricante. */
  lada: number;

  /** Estado donde se encuentra el fabricante. */
  estado: number;

  /** Nombre del estado donde se encuentra el fabricante. */
  estadoNombre?: string;

  /** Segundo estado o subdivisión administrativa (si aplica). */
  estado2: string;

  /** Código postal del domicilio del fabricante. */
  codigo: number;
  
  /** Nombre del código postal del domicilio del fabricante. */
  codigoNombre?: string;
}

/**
 * Interfaz que define la estructura de los datos de un proveedor registrado.
 * @interface DatosDelRegistrar
 */
export interface DatosDelRegistrar {
  id: number;
  rfc: string;
  razonSocial: string;
  nombreCompleto: string;
  domicilioFiscal: string;
  norma: string;
  numeroProgramaImmex?: string;
  numeroProgramaProsec?: string;
  aduanasOpera?: string;
}

/**
 * Interfaz que define la estructura de los datos de un proveedor registrado manualmente.
 * @interface DatosDelRegistrarManual
 */
export interface DatosDelRegistrarManual {
  id?: number;
  rfc?: string;
  razonSocial?: string;
  nombreCompleto?: string;
  domicilioFiscal?: string;
  norma?: string;
  numeroProgramaImmex?: string;
  numeroProgramaProsec?: string;
  aduanasOpera?: string;
}

/**
 * Interfaz que define la estructura de los datos de un proveedor registrado en un archivo CSV.
 * @interface DatosDelRegistrarCSV
 */
export interface CrossListEtiqueta {
  tituluDeLaIzquierda: string;
  derecha: string;
}

/**
 * Interfaz que define la estructura de los datos de un proveedor registrado manualmente.
 * @interface DatosDelProveedoresManual
 */
export interface DatosDelProveedoresManual {
  registroFederalContribuyente: '';
  razonSocial: '';
  domicilioFiscal: '';
}



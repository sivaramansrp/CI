export interface ListaPasoWizard {
  /** Index of the step */
  indice: number;
  /** Title of the step */
  titulo: string;
  /** Indicates if the step is active */
  activo: boolean;
  /** Indicates if the step is completed */
  completado: boolean;
}

/**
 * Interface representing an action button.
 */
export interface AccionBoton {
  /** Action to be performed */
  accion: string;
  /** Value associated with the action */
  valor: number;
}

/**
 * Interfaz que representa los datos de una tabla modal.
 * 
 * @interface TablaDatosModal
 * @property {number} id - Identificador único del registro.
 * @property {number} fraccionArancelaria - Código de fracción arancelaria asociado.
 * @property {string} nombreTecnico - Nombre técnico del producto.
 * @property {number} numeroDeRegistrodeProductos - Número de registro del producto.
 * @property {string} fechaExpedicion - Fecha de expedición del registro (en formato ISO).
 * @property {string} fechaVencimiento - Fecha de vencimiento del registro (en formato ISO).
 * @property {string} nombreComercial - Nombre comercial del producto.
 */
export interface TablaDatosModal {
  id: number,
  fraccionArancelaria: number,
  nombreTecnico: string,
  numeroDeRegistrodeProductos: number,
  fechaExpedicion: string,
  fechaVencimiento: string,
  nombreComercial: string
}

/**
 * Interfaz que representa las columnas históricas de un productor.
 * 
 * @property {number} id - Identificador único del registro histórico.
 * @property {string} nombreProductor - Nombre del productor asociado al registro.
 * @property {string} numeroRegistroFiscal - Número de registro fiscal del productor.
 * @property {string} direccion - Dirección física del productor.
 * @property {string} correoElectronico - Correo electrónico de contacto del productor.
 * @property {string} telefono - Número de teléfono del productor.
 * @property {string} fax - Número de fax del productor.
 */
export interface HistoricoColumnas {
  id: number;
  nombreProductor: string;
  numeroRegistroFiscal: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  fax: string;
}
/**
 * Representa los datos del productor exportador.
 */
export interface ProductorExportador {
  datos: HistoricoColumnas[];
}

/**
 * Interfaz que representa la tabla de mercancías.
 * 
 * @property fraccionArancelaria - La fracción arancelaria de la mercancía.
 * @property tipoFactura - El tipo de factura asociada a la mercancía.
 * @property cantidad - La cantidad de la mercancía.
 * @property unidadMedida - La unidad de medida utilizada para la mercancía.
 * @property nombreTecnico - El nombre técnico de la mercancía.
 * @property nombreComercial - El nombre comercial de la mercancía.
 * @property valorMercancia - El valor de la mercancía.
 * @property rfcProductor - El RFC del productor de la mercancía.
 */
export interface MercanciaTabla {
  fraccionArancelaria: string;
  tipoFactura: string;
  cantidad: string;
  unidadMedida: string;
  nombreTecnico: string;
  nombreComercial: string;
  valorMercancia: string;
  rfcProductor: string;
}
/**
 * Interfaz que representa el histórico de mercancías.
 * 
 * @property datos - Lista de datos de tipo `MercanciaTabla` que contiene el histórico de mercancías.
 */
export interface MercanciasHistorico {
  datos: MercanciaTabla[];
}

/**
 * Interfaz que representa un paso en un asistente (wizard).
 * 
 * @property {number} indice - El índice del paso dentro del asistente.
 * @property {string} titulo - El título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está actualmente activo.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export interface ListaPasoWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * Representa la estructura de un botón de acción con su correspondiente acción y valor.
 * 
 * @property {string} accion - El nombre o tipo de acción que representa el botón.
 * @property {number} valor - El valor asociado a la acción del botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Interfaz que representa los datos de una tabla modal en el contexto de un certificado en Perú.
 * 
 * @property {number} id - Identificador único del registro.
 * @property {number} fraccionArancelaria - Código de la fracción arancelaria asociada.
 * @property {string} nombreTecnico - Nombre técnico del producto.
 * @property {number} numeroDeRegistrodeProductos - Número de registro del producto.
 * @property {string} fechaExpedicion - Fecha de expedición del certificado (formato ISO 8601).
 * @property {string} fechaVencimiento - Fecha de vencimiento del certificado (formato ISO 8601).
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
 * @property {number} id - Identificador único del productor.
 * @property {string} nombreProductor - Nombre del productor.
 * @property {string} numeroRegistroFiscal - Número de registro fiscal del productor.
 * @property {string} direccion - Dirección del productor.
 * @property {string} correoElectronico - Correo electrónico del productor.
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
 * Representa un productor exportador con un historial de datos.
 * 
 * @property {HistoricoColumnas[]} datos - Lista de columnas históricas asociadas al productor exportador.
 * 
 * @comando Este modelo se utiliza para gestionar la información de los productores exportadores en el sistema.
 */
export interface ProductorExportador {
  datos: HistoricoColumnas[];
}


/**
 * Interfaz que representa la tabla de mercancías.
 * Contiene información detallada sobre las mercancías, incluyendo fracción arancelaria,
 * tipo de factura, cantidad, unidad de medida, nombres técnicos y comerciales, 
 * valor de la mercancía y RFC del productor.
 * 
 * @interface MercanciaTabla
 * @property {string} fraccionArancelaria - Fracción arancelaria de la mercancía.
 * @property {string} tipoFactura - Tipo de factura asociada a la mercancía.
 * @property {string} cantidad - Cantidad de la mercancía.
 * @property {string} unidadMedida - Unidad de medida de la mercancía.
 * @property {string} nombreTecnico - Nombre técnico de la mercancía.
 * @property {string} nombreComercial - Nombre comercial de la mercancía.
 * @property {string} valorMercancia - Valor de la mercancía.
 * @property {string} rfcProductor - RFC del productor de la mercancía.
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
 * Interfaz que representa el historial de mercancías.
 * 
 * @property datos - Lista de objetos de tipo `MercanciaTabla` que contienen los datos históricos de las mercancías.
 */
export interface MercanciasHistorico {
  datos: MercanciaTabla[];
}

/**
 * Interfaz que representa un elemento de un catálogo.
 * 
 * @property {number} id - Identificador único del elemento del catálogo.
 * @property {string} descripcion - Descripción del elemento del catálogo.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
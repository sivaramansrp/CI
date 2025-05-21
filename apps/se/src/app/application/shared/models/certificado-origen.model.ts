/**
 * Representa las columnas del histórico de productores.
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
 * Representa un elemento de un catálogo.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Representa una lista de elementos de un catálogo.
 */
export interface CatalogoLista {
  datos: Catalogo[];
}
/**
 * Representa el formulario para agregar datos del productor.
 */
export interface AgregarDatosProductorFormulario {
  numeroRegistroFiscal?: string;
  fax?: string;
}

/**
 * Representa el modelo de un formulario histórico con información confidencial
 * y la relación entre productor y exportador.
 *
 * @property datosConfidencialesProductor - Indica si los datos del productor son confidenciales.
 * @property productorMismoExportador - Indica si el productor es el mismo que el exportador.
 */
export interface FormularioHistorico {
  datosConfidencialesProductor?: boolean;
  productorMismoExportador?: boolean;
}
/**
 * Interfaz que representa una acción de botón con un nombre de acción y un valor asociado.
 * 
 * @property {string} accion - Nombre de la acción que representa el botón.
 * @property {number} valor - Valor numérico asociado a la acción del botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * Representa los datos de la tabla de mercancías disponibles.
 */
export interface MercanciaTabla {
  fraccionArancelaria?: string;
  tipoFactura?: string;
  cantidad?: string;
  unidadMedida?: string;
  nombreTecnico?: string;
  nombreComercial?: string;
  valorMercancia: string;
  rfcProductor?: string;
  numeroFactura?: string;
  complemento?: string;
}

/**
 * Representa los datos del formulario relacionados con el certificado de origen.
 */
export interface FormularioSi {
  si?: boolean;
  entidadFederativa?: string;
  bloque?: string;
  fraccionArancelariaForm?: string;
  registroProductoForm?: string;
  nombreComercialForm?: string;
  fechaInicioInput?: string;
  fechaFinalInput?: string;
  nombres?: string;
  primerApellido?: string;
  segundoApellido?: string;
  numeroDeRegistroFiscal?: string;
  razonSocial?: string;
}
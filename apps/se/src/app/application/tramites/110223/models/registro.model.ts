import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { HistoricoColumnas } from "./certificado-origen.model";

/**
 * Interfaz que define la estructura de las columnas de la tabla.
 * 
 * @interface ColumnasTabla
 * @property {string} fraccionArancelaria - Fracción arancelaria del producto.
 * @property {string} nombreTecnico - Nombre técnico del producto.
 * @property {string} nombreComercial - Nombre comercial del producto.
 * @property {string} numeroRegistroProductos - Número de registro del producto.
 * @property {string} fechaExpedicion - Fecha de expedición del producto.
 * @property {string} fechaVencimiento - Fecha de vencimiento del producto.
 */
export interface ColumnasTabla {
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  numeroRegistroProductos: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}

/**
 * Interfaz que define la estructura de las filas seleccionadas de la tabla.
 * 
 * @interface SeleccionadasTabla
 * @property {string} fraccionArancelaria - Fracción arancelaria del producto seleccionado.
 * @property {string} cantidad - Cantidad de productos seleccionados.
 * @property {string} unidadMedida - Unidad de medida del producto.
 * @property {string} valorMercancia - Valor de la mercancía.
 * @property {string} tipoFactura - Tipo de factura.
 * @property {string} numFactura - Número de la factura.
 * @property {string} complementoDescripcion - Descripción complementaria de la factura.
 * @property {string} fechaFactura - Fecha de la factura.
 */
export interface SeleccionadasTabla {
  fraccionArancelaria: string;
  cantidad: string;
  unidadMedida: string;
  valorMercancia: string;
  tipoFactura: string;
  numFactura: string;
  complementoDescripcion: string;
  fechaFactura: string;
}

/**
 * Configuración de la fecha inicial para los filtros.
 * 
 * @constant FECHA_INICIAL
 * @type {Object}
 * @property {string} labelNombre - Nombre de la etiqueta para la fecha de inicio.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_INICIAL = {
  labelNombre: 'Fecha inicio',
  required: false,
  habilitado: true,
};

/**
 * Configuración de la fecha final para los filtros.
 * 
 * @constant FECHA_FINAL
 * @type {Object}
 * @property {string} labelNombre - Nombre de la etiqueta para la fecha de fin.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: false,
  habilitado: true,
};

/**
 * Configuración de la fecha de la factura o referencia.
 * 
 * @constant FECHA_FACTURA
 * @type {Object}
 * @property {string} labelNombre - Nombre de la etiqueta para la fecha de factura.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_FACTURA = {
  labelNombre: 'Fecha de factura / Referencia',
  required: true,
  habilitado: true,
};

/**
 * Configuración del campo para el despacho LDA.
 * 
 * @constant DESPACHO_LDA
 * @type {Object}
 * @property {string} labelNombre - Etiqueta que indica si es un despacho LDA.
 * @property {number} maxlength - Longitud máxima permitida.
 * @property {number} minlenght - Longitud mínima permitida.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} alfanumerico - Indica si solo acepta caracteres alfanuméricos.
 */
export const DESPACHO_LDA = {
  labelNombre: 'Sí',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};



/**
 * Representa la respuesta de una consulta realizada en el trámite.
 */
export interface RespuestaConsulta {
  /**
   * Indica si la consulta fue exitosa.
   */
  success: boolean;

  /**
   * Contiene los datos obtenidos de la consulta.
   */
  datos: ConsultaDatos;

  /**
   * Mensaje asociado a la respuesta de la consulta.
   */
  message: string;
}

/**
 * Contiene los datos obtenidos de una consulta.
 */
export interface ConsultaDatos {
  tercerOperador: boolean;
  tratado: string;
  pais: string;
  fraccionArancelaria: string;
  numeroRegistro: string;
  nombreComercial: string;
  fechaInicial: string;
  fechaFinal: string;
  archivo: string;
  fraccionMercanciaArancelaria: string;
  nombreTecnico: string;
  nombreComercialDelaMercancia: string;
  criterioParaPreferencial: string;
  valorContenidoRegional: string;
  otrasInstancias: string;
  cantidad: string;
  umc: string;
  valorDelaMercancia: string;
  complementoDelaDescripcion: string;
  tipoFactura: string;
  fecha: string;
  numeroFactura: string;
  numeroSerie: string;
  observaciones: string;
  entidad: string;
  representacion: string;
  casillaVerificacion: boolean;
  justificacion: string;
  nombre: string;
  numeroFiscal: string;
  ciudad: string;
  calle: string;
  numeroLetra: string;
  numeroDeRegistroFiscal: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
  nacion: string;
  datosConfidencialesProductor: boolean;
  productorMismoExportador: boolean;
  numeroRegistroFiscal: string;
  agregarDatosProductorFax: string;
}

export const historicoTableColumns: ConfiguracionColumna<HistoricoColumnas>[] = [
    { encabezado: 'Nombre del productor', clave: (elementos) => elementos.nombreProductor, orden: 1 },
    { encabezado: 'Número de registro fiscal', clave: (elementos) => elementos.numeroRegistroFiscal, orden: 2 },
    { encabezado: 'Dirección', clave: (elementos) => elementos.direccion, orden: 3 },
    { encabezado: 'Correo Electrónico', clave: (elementos) => elementos.correoElectronico, orden: 4 },
    { encabezado: 'Teléfono', clave: (elementos) => elementos.telefono, orden: 5 },
    { encabezado: 'Fax', clave: (elementos) => elementos.fax, orden: 6 },
  ];

  export const headersDataSeleccionadasTabla: ConfiguracionColumna<SeleccionadasTabla>[] = [
    { encabezado: 'Fracción arancelaria', clave: (ele: SeleccionadasTabla) => ele.fraccionArancelaria, orden: 1 },
    { encabezado: 'Cantidad', clave: (ele: SeleccionadasTabla) => ele.cantidad, orden: 2 },
    { encabezado: 'Unidad de medida', clave: (ele: SeleccionadasTabla) => ele.unidadMedida, orden: 3 },
    { encabezado: 'Valor mercancía', clave: (ele: SeleccionadasTabla) => ele.valorMercancia, orden: 4 },
    { encabezado: 'Tipo de factura', clave: (ele: SeleccionadasTabla) => ele.tipoFactura, orden: 5 },
    { encabezado: 'Número factura', clave: (ele: SeleccionadasTabla) => ele.numFactura, orden: 6 },
    { encabezado: 'Complemento descripción', clave: (ele: SeleccionadasTabla) => ele.complementoDescripcion, orden: 7 },
    { encabezado: 'Fecha factura', clave: (ele: SeleccionadasTabla) => ele.fechaFactura, orden: 8 },
  ];
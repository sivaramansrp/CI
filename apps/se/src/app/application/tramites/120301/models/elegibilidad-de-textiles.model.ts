/**
 * @interface Solicitante
 * @description Modelo para la información del solicitante.
 * @property {string} rfc - Registro Federal de Contribuyentes (RFC).
 * @property {string} nombreRazonSocial - Nombre o razón social del solicitante.
 * @property {string} aPaterno - Apellido paterno del solicitante.
 * @property {string} correo - Correo electrónico del solicitante.
 */
export interface Solicitante {
  rfc: string;
  nombreRazonSocial: string;
  aPaterno: string;
  correo: string;
}

/**
 * @interface ListaPasosWizard
 * @description Modelo para los pasos del wizard.
 * @property {number} indice - Índice del paso.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso está completado.
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * @interface DatosDeLaSolicitud
 * @description Modelo para los datos de la solicitud.
 * @property {string} aduanaIngreso - Aduana de ingreso.
 * @property {string} oficinaInspeccion - Oficina de inspección.
 * @property {string} puntoInspeccion - Punto de inspección.
 * @property {string} claveUCON - Clave UCON.
 * @property {string} establecimientoTIF - Establecimiento TIF.
 * @property {string} nombreVeterinario - Nombre del veterinario.
 * @property {string} numeroGuia - Número de guía.
 * @property {string} certificacion - Certificación.
 * @property {string} regimen - Régimen.
 */
export interface DatosDeLaSolicitud {
  aduanaIngreso: string;
  oficinaInspeccion: string;
  puntoInspeccion: string;
  claveUCON: string;
  establecimientoTIF: string;
  nombreVeterinario: string;
  numeroGuia: string;
  certificacion: string;
  regimen: string;
}

/**
 * @interface DatosParaMovilizacionNacional
 * @description Modelo para los datos de movilización nacional.
 * @property {string} coordenadas - Coordenadas de la ubicación.
 * @property {string} nombre - Nombre del solicitante.
 * @property {string} medio - Medio de transporte.
 * @property {string} transporte - Tipo de transporte.
 * @property {string} punto - Punto de encuentro.
 */
export interface DatosParaMovilizacionNacional {
  coordenadas: string;
  nombre: string;
  medio: string;
  transporte: string;
  punto: string;
}

/**
 * @interface PagoDeDerechos
 * @description Modelo para los datos de pago de derechos.
 * @property {string} exentoPagoNo - Exento de pago (No).
 * @property {string} exentoPagoSi - Exento de pago (Sí).
 * @property {string} justificacion - Justificación.
 * @property {string} claveReferencia - Clave de referencia.
 * @property {string} cadenaDependencia - Cadena de dependencia.
 * @property {string} banco - Banco.
 * @property {string} llavePago - Llave de pago.
 * @property {string} importePago - Importe de pago.
 */
export interface PagoDeDerechos {
  exentoPagoNo: string;
  exentoPagoSi: string;
  justificacion: string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  importePago: string;
}

/**
 * @interface ImportadorForm
 * @description Modelo para los datos del formulario del importador.
 * @property {string} tipo - Tipo de importador.
 * @property {string} cantidadTotal - Cantidad total.
 * @property {string} razonSocial - Razón social.
 * @property {string} domicilio - Domicilio.
 * @property {string} ciudad - Ciudad.
 * @property {string} cp - Código postal.
 * @property {string} pais - País.
 */
export interface ImportadorForm {
  tipo: string;
  cantidadTotal: string;
  razonSocial: string;
  domicilio: string;
  ciudad: string;
  cp: string;
  pais: string;
}

/**
 * @interface HistoricoFabricantesForm
 * @description Modelo para los datos del formulario del historial de fabricantes.
 * @property {string} exportadorFabricanteMismo - Indica si el exportador es el mismo fabricante.
 * @property {string} numeroRegistroFiscal - Número de registro fiscal.
 */
export interface HistoricoFabricantesForm {
  exportadorFabricanteMismo: string;
  numeroRegistroFiscal: string;
}

/**
 * @interface FormularioAsociacionFactura
 * @description Modelo para los datos del formulario de asociación de facturas.
 * @property {string} cantidad - Cantidad de facturas asociadas.
 */
export interface FormularioAsociacionFactura {
  cantidad: string;
}

/**
 * @interface FitosanitarioForm
 * @description Modelo para los datos del formulario fitosanitario.
 * @property {string} flexRadioRegistro - Registro seleccionado.
 * @property {string} estado - Estado.
 * @property {string} representacionFederal - Representación federal.
 * @property {string} fraccionArancelaria - Fracción arancelaria.
 * @property {string} descripcionProducto - Descripción del producto.
 * @property {string} tratado - Tratado.
 * @property {string} subproducto - Subproducto.
 * @property {string} mecanismo - Mecanismo.
 * @property {string} typoCategoria - Tipo de categoría.
 * @property {string} typoRegimen - Tipo de régimen.
 * @property {string} descripcionCategoriaTextil - Descripción de la categoría textil.
 * @property {string} pais - País.
 * @property {string} unidadMedidaCategoriaTextil - Unidad de medida de la categoría textil.
 * @property {string} factorConversionCategoriaTextil - Factor de conversión de la categoría textil.
 * @property {string} fechaInicioVigencia - Fecha de inicio de vigencia.
 * @property {string} fechaFinVigencia - Fecha de fin de vigencia.
 */
export interface FitosanitarioForm {
  flexRadioRegistro: string;
  estado: string;
  representacionFederal: string;
  fraccionArancelaria: string;
  descripcionProducto: string;
  tratado: string;
  subproducto: string;
  mecanismo: string;
  typoCategoria: string;
  typoRegimen: string;
  descripcionCategoriaTextil: string;
  pais: string;
  unidadMedidaCategoriaTextil: string;
  factorConversionCategoriaTextil: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
}

/**
 * @interface FacturaForm
 * @description Modelo para los datos del formulario de facturas.
 * @property {string} numeroFactura - Número de la factura.
 * @property {string} cantidadTotal - Cantidad total.
 * @property {string} unidadDeMedida - Unidad de medida.
 * @property {string} fechaInicioInput - Fecha de inicio.
 * @property {string} valorDolares - Valor en dólares.
 * @property {EmisorConsignatario} emisorConsignatario - Datos del emisor o consignatario.
 */
export interface FacturaForm {
  numeroFactura: string;
  cantidadTotal: string;
  unidadDeMedida: string;
  fechaInicioInput: string;
  valorDolares: string;
  emisorConsignatario: EmisorConsignatario;
}

/**
 * @interface EmisorConsignatario
 * @description Modelo para los datos del emisor o consignatario.
 * @property {string} taxId - TAX ID.
 * @property {string} razonSocial - Razón social.
 * @property {string} calle - Calle.
 * @property {string} ciudad - Ciudad.
 * @property {string} cp - Código postal.
 * @property {string} pais - País.
 */
export interface EmisorConsignatario {
  taxId: string;
  razonSocial: string;
  calle: string;
  ciudad: string;
  cp: string;
  pais: string;
}

/**
 * @interface ElegibilidadDeTextiles
 * @description Modelo para los datos de elegibilidad de textiles.
 * @property {ImportadorForm} importadorForm - Datos del formulario del importador.
 * @property {FacturaForm} facturaForm - Datos del formulario de facturas.
 * @property {FitosanitarioForm} fitosanitarioForm - Datos del formulario fitosanitario.
 * @property {FormularioAsociacionFactura} formularioAsociacionFactura - Datos del formulario de asociación de facturas.
 * @property {HistoricoFabricantesForm} historicoFabricantesForm - Datos del formulario del historial de fabricantes.
 */
export interface ElegibilidadDeTextiles {
  importadorForm: ImportadorForm;
  facturaForm: FacturaForm;
  fitosanitarioForm: FitosanitarioForm;
  formularioAsociacionFactura: FormularioAsociacionFactura;
  historicoFabricantesForm: HistoricoFabricantesForm;
}

export interface ElegibilidadDeTextilesState {
  textileSolicitudCargaUtil: ElegibilidadDeTextiles;
}

/**
 * @interface CapturarColumns
 * @description Modelo para las columnas de la tabla de captura de facturas.
 * @property {string} numeroDeLaFactura - Número de la factura.
 * @property {string} razonSocial - Razón social.
 * @property {string} domicilio - Domicilio.
 * @property {string} fechaExpedicionFactura - Fecha de expedición de la factura.
 * @property {string} cantidadTotal - Cantidad total.
 * @property {string} cantidadDisponible - Cantidad disponible.
 * @property {string} unidadMedida - Unidad de medida.
 * @property {string} valorDolares - Valor en dólares.
 */
export interface CapturarColumns {
  numeroDeLaFactura: string;
  razonSocial: string;
  domicilio: string;
  fechaExpedicionFactura: string;
  cantidadTotal: string;
  cantidadDisponible: string;
  unidadMedida: string;
  valorDolares: string;
}

/**
 * @interface AsociadasTableColumns
 * @description Modelo para las columnas de la tabla de facturas asociadas.
 * @property {string} candidadAsociada - Cantidad asociada.
 * @property {string} numeroDeLaFactura - Número de la factura.
 * @property {string} razonSocial - Razón social.
 * @property {string} domicilio - Domicilio.
 * @property {string} fechaExpedicionFactura - Fecha de expedición de la factura.
 * @property {string} cantidadTotal - Cantidad total.
 * @property {string} cantidadDisponible - Cantidad disponible.
 * @property {string} unidadMedida - Unidad de medida.
 * @property {string} valorDolares - Valor en dólares.
 */
export interface AsociadasTableColumns {
  candidadAsociada: string;
  numeroDeLaFactura: string;
  razonSocial: string;
  domicilio: string;
  fechaExpedicionFactura: string;
  cantidadTotal: string;
  cantidadDisponible: string;
  unidadMedida: string;
  valorDolares: string;
}

/**
 * @interface HistoricoColumns
 * @description Modelo para las columnas de la tabla del historial de fabricantes.
 * @property {string} nombreFabricante - Nombre del fabricante.
 * @property {string} numeroRegistroFiscal - Número de registro fiscal.
 * @property {string} direccion - Dirección.
 * @property {string} correoElectrónico - Correo electrónico.
 * @property {string} telefono - Teléfono.
 */
export interface HistoricoColumns {
  nombreFabricante: string;
  numeroRegistroFiscal: string;
  direccion: string;
  correoElectrónico: string;
  telefono: string;
}
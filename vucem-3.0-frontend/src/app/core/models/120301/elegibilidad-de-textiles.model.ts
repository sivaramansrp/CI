/**
 * Modelo de datos de la solicitud
 * @export
 * @interface textileSolicitud
 * @property {solicitante} solicitante - Información del solicitante.
 * @property {datosDeLaSolicitud} datosDeLaSolicitud - Datos de la solicitud.
 * @property {datosParaMovilizacionNacional} datosParaMovilizacionNacional - Datos para la movilización nacional.
 * @property {tercerosRelacionados} tercerosRelacionados - Información de terceros relacionados.
 * @property {pagoDeDerechos} pagoDeDerechos - Información de pago de derechos.--120301
 */

/**
 * Interface solicitante
 * @export
 * @interface solicitante
 * @property {string} rfc - Registro Federal de Contribuyentes (RFC).
 * @property {string} nombreRazonSocial - Nombre o razón social del solicitante.
 * @property {string} aPaterno - Apellido paterno del solicitante.--120301
 * @property {string} correo - Correo electrónico del solicitante.
 */
export interface solicitante {
  rfc: string;
  nombreRazonSocial: string;
  aPaterno: string;
  correo: string;
}

/**
 * Modelo de datos de la solicitud
 * @export
 * @interface datosDeLaSolicitud
 * @property {string} aduanaIngreso - Aduana de ingreso.
 * @property {string} oficinaInspeccion - Oficina de inspección.
 * @property {string} puntoInspeccion - Punto de inspección.
 * @property {string} claveUCON - Clave UCON.
 * @property {string} establecimientoTIF - Establecimiento TIF.
 * @property {string} nombreVeterinario - Nombre del veterinario.--120301
 * @property {string} numeroGuia - Número de guía.
 * @property {string} certificacion - Certificación.
 * @property {string} regimen - Régimen.
 */
export interface datosDeLaSolicitud {
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
 * Modelo para los datos de movilización nacional
 * @export
 * @interface datosParaMovilizacionNacional
 * @property {string} coordenadas - Coordenadas de la ubicación.
 * @property {string} nombre - Nombre del solicitante.
 * @property {string} medio - Medio de transporte.
 * @property {string} transporte - Tipo de transporte.--120301
 * @property {string} punto - Punto de encuentro.
 */
export interface datosParaMovilizacionNacional {
  coordenadas: string;
  nombre: string;
  medio: string;
  transporte: string;
  punto: string;
}

/**
 * Modelo para pago de derechos
 * @export
 * @interface pagoDeDerechos
 * @property {string} exentoPagoNo - Exento de pago (No).
 * @property {string} exentoPagoSi - Exento de pago (Sí).
 * @property {string} justificacion - Justificación.
 * @property {string} claveReferencia - Clave de referencia.
 * @property {string} cadenaDependencia - Cadena de dependencia. --120301
 * @property {string} banco - Banco.
 * @property {string} llavePago - Llave de pago.
 * @property {string} importePago - Importe de pago.
 */
export interface pagoDeDerechos {
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
 * Interface tercerosRelacionados --120301
 * @export
 * @interface tercerosRelacionados
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
export interface HistoricoFabricantesForm {
  exportadorFabricanteMismo: string;
  numeroRegistroFiscal: string;
  fabricantesNacionales: any[]; // Adjust type if there's a specific structure
  fabricantesDatos: any[]; // Adjust type if there's a specific structure
}
export interface FacturaAssociationForm {
  cantidad: string;
}
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
export interface FacturaForm {
  numeroFactura: string;
  cantidadTotal: string;
  unidadDeMedida: string;
  fechaInicioInput: string;
  valorDolares: string;
  emisorConsignatario: EmisorConsignatario;
}

export interface EmisorConsignatario {
  taxId: string;
  razonSocial: string;
  calle: string;
  ciudad: string;
  cp: string;
  pais: string;
}

export interface ElegibilidadDeTextiles {
  importadorForm: ImportadorForm;
  facturaForm: FacturaForm;
  fitosanitarioForm: FitosanitarioForm;
  facturaAssociationForm: FacturaAssociationForm;
  historicoFabricantesForm: HistoricoFabricantesForm;
}




export interface tercerosRelacionados { }
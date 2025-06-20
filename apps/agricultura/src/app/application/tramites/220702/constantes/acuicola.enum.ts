import {DatosDeLaSolicitudInt} from '../modelos/acuicola.model';
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

export const EXPEDICION_FACTURA_FECHA = {
  labelNombre: 'Fecha de inspección',
  required: true,
  habilitado: true,
};

export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago:',
  required: true,
  habilitado: true,
};

export const TITULOMENSAJE =
  'Registro de solicitud de modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

export const INSTRUCCION_DOBLE_CLIC =
  'Al dar clic en el botón "Cargar" se creará una nueva solicitud con los mismos datos de la solcitud 202766288 ';

export const MANDATORY_INSTRUCTION =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

export const TEXTOS_220702 = {
  TEXTOS_SOLICITUD:
    'Al dar doble clic en el registro seleccionado creará una Nueva solicitud con los mismos datos de la solicitud elegida.',

  SECCION_LEYENDA_CONFIRMAR_TEXTOS:
    'Debes declarar la cantidad que ingresa en parcialidad por cada fracción arancelaria. La columna "Saldo pendiente" mostrará el saldo disponible para las siguientes parcialidades.',
};

export const MERCANCIA_SERVICIO = [
  {
    encabezado: 'No. pardita',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna1,
    orden: 1,
  },
  {
    encabezado: 'Tipo de requisito',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna2,
    orden: 2,
  },
  {
    encabezado: 'Requisito',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna3,
    orden: 3,
  },
  {
    encabezado: 'Número Certificado Internacional',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna4,
    orden: 4,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna5,
    orden: 5,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna6,
    orden: 6,
  },
  {
    encabezado: 'Nico',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna7,
    orden: 7,
  },
  {
    encabezado: 'Descripción Nico',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna8,
    orden: 8,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna8,
    orden: 8,
  },
  {
    encabezado: 'Unidad de medida tarifa (UMT)',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna9,
    orden: 9,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna10,
    orden: 10,
  },
  {
    encabezado: 'Unidad de medida de comercializacion (UMC)',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna11,
    orden: 11,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna12,
    orden: 12,
  },
  {
    encabezado: 'Uso',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna13,
    orden: 13,
  },
  {
    encabezado: 'Tipo de Producto',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna14,
    orden: 14,
  },
  {
    encabezado: 'Número de lote ',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna15,
    orden: 15,
  },
  {
    encabezado: 'País de orígen ',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna16,
    orden: 16,
  },

  {
    encabezado: 'País de procedencia ',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna17,
    orden: 17,
  },

  {
    encabezado: 'Certificado Internacional Electrónico ',
    clave: (ele: MercanciaInfo): string => ele.tablaColumna18,
    orden: 18,
  }
];


export interface MercanciaInfo {
  tablaColumna1: string;
  tablaColumna2: string;
  tablaColumna3: string;
  tablaColumna4: string;
  tablaColumna5: string;
  tablaColumna6: string;
  tablaColumna7: string;
  tablaColumna8: string;
  tablaColumna9: string;
  tablaColumna10: string;
  tablaColumna11: string;
  tablaColumna12: string;
  tablaColumna13: string;
  tablaColumna14: string;
  tablaColumna15: string;
  tablaColumna16: string;
  tablaColumna17: string;
  tablaColumna18: string;
  tablaColumna19: string;
  
}

export const EXPORTADOR_SERVICIO = [
  {
    encabezado: 'Nombre/ denominación o razón social',
    clave: (ele: ExportadorInfo): string => ele.nombre,
    orden: 1,
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: ExportadorInfo): string => ele.teleFono,
    orden: 2,
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: ExportadorInfo): string => ele.correo,
    orden: 3,
  },
  {
    encabezado: 'Domicilio',
    clave: (ele: ExportadorInfo): string => ele.domicilio,
    orden: 4,
  },
  {
    encabezado: 'País',
    clave: (ele: ExportadorInfo): string => ele.pais,
    orden: 5,
  },
];


export interface ExportadorInfo {
  nombre: string;
  teleFono: string;
  correo: string;
  domicilio: string;
  pais: string;
 
}

export const DESTINO_SERVICIO = [
  {
    encabezado: 'Nombre/denominación o razón social',
    clave: (ele: DestinoInfo): string => ele.tablaColumna1,
    orden: 1,
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: DestinoInfo): string => ele.tablaColumna2,
    orden: 2,
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: DestinoInfo): string => ele.tablaColumna3,
    orden: 3,
  },
  {
    encabezado: 'Calle',
    clave: (ele: DestinoInfo): string => ele.tablaColumna4,
    orden: 4,
  },
  {
    encabezado: 'Número exterior',
    clave: (ele: DestinoInfo): string => ele.tablaColumna5,
    orden: 5,
  },
  {
    encabezado: 'Número interior',
    clave: (ele: DestinoInfo): string => ele.tablaColumna6,
    orden: 6,
  },
  {
    encabezado: 'País',
    clave: (ele: DestinoInfo): string => ele.tablaColumna7,
    orden: 7,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: DestinoInfo): string => ele.tablaColumna8,
    orden: 8,
  },
  {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: DestinoInfo): string => ele.tablaColumna9,
    orden: 9,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (ele: DestinoInfo): string => ele.tablaColumna10,
    orden: 10,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: DestinoInfo): string => ele.tablaColumna11,
    orden: 11,
  },
];



export interface DestinoInfo {
  tablaColumna1: string;
  tablaColumna2: string;
  tablaColumna3: string;
  tablaColumna4: string;
  tablaColumna5: string;
  tablaColumna6: string;
  tablaColumna7: string;
  tablaColumna8: string;
  tablaColumna9: string;
  tablaColumna10: string;
  tablaColumna11: string;
}


export const MEDIO_SERVICIO = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: MercanciaDatosInfo): string => ele.fraccionArancelaria,
    orden: 1,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: MercanciaDatosInfo): string => ele.descripcionDelaFraccion,
    orden: 2,
  },
  {
    encabezado: 'Nico',
    clave: (ele: MercanciaDatosInfo): string => ele.nico,
    orden: 3,
  },
  {
    encabezado: 'Descripción Nico',
    clave: (ele: MercanciaDatosInfo): string => ele.descripcionNico,
    orden: 4,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: MercanciaDatosInfo): string => ele.unidadDeMedidadeTarifaUMT,
    orden: 5,
  },
  {
    encabezado: 'Cantidad total UMT',
    clave: (ele: MercanciaDatosInfo): string => ele.cantidadTotalUMT,
    orden: 6,
  },
];


export interface MercanciaDatosInfo {
  fraccionArancelaria: string;
  descripcionDelaFraccion:string;
  nico: string;
  descripcionNico: string;
  unidadDeMedidadeTarifaUMT: string;
  cantidadTotalUMT: string;
  
}

export const SECCIONES_TRAMITE_220702 = {
  PASO_1: {
    VALIDACION_SECCION_1: false,
    VALIDACION_SECCION_2: true,
    VALIDACION_SECCION_3: false,
  },
  PASO_2: {
    VALIDACION_SECCION: true,
  },
  PASO_3: {
    requiereValidacion: true,
  },
};
/**
 * Representa el estado de un trámite.
 *
 * @property {string} justificacion - Justificación del trámite.
 * @property {string} certificadosAutorizados - Certificados autorizados relacionados con el trámite.
 * @property {string} horaDeInspeccion - Hora de inspección del trámite.
 * @property {number} aduanaDeIngreso - Identificador de la aduana de ingreso.
 * @property {string} oficinaDeInspeccion - Nombre de la oficina de inspección.
 * @property {string} puntoDeInspeccion - Punto de inspección asociado al trámite.
 * @property {string} nombreInspector - Nombre del inspector asignado.
 * @property {string} primerApellido - Primer apellido del inspector.
 * @property {string} segundoApellido - Segundo apellido del inspector.
 * @property {number} cantidadContenedores - Cantidad de contenedores involucrados.
 * @property {number} tipoContenedor - Tipo de contenedor utilizado.
 * @property {string} medioDeTransporte - Medio de transporte utilizado.
 * @property {string} identificacionTransporte - Identificación del transporte.
 * @property {string} esSolicitudFerros - Indica si la solicitud está relacionada con transporte ferroviario.
 * @property {MercanciaDatosInfo[]} mercanciaDatos - Información de la mercancía involucrada.
 * @property {string} folioDelTramite - Folio del trámite.
 * @property {string} numeroDeGuia - Número de guía del trámite.
 * @property {string} numeroFerrocaril - Número de ferrocarril asociado.
 * @property {string} regimenAlQueDestina - Régimen al que se destina la mercancía.
 * @property {string} datosParaMovilizacion - Datos para la movilización de la mercancía.
 * @property {string} puntoDeVerificacion - Punto de verificación asociado.
 * @property {string} identificacionDelTransporte - Identificación del transporte.
 * @property {string} nombreDeLaEmpresaTransportista - Nombre de la empresa transportista.
 * @property {string} claveDeReferencia - Clave de referencia del trámite.
 * @property {string} cadenaDependencia - Cadena de dependencia asociada.
 * @property {number} banco - Identificador del banco asociado.
 * @property {string} llaveDePago - Llave de pago del trámite.
 * @property {string} fechaPagoDeDerechos - Fecha de pago de derechos.
 * @property {string} importeDePago - Importe del pago de derechos.
 * @property {string} claveDeReferenciaRevision - Clave de referencia para la revisión.
 * @property {string} cadenaDependenciaRevision - Cadena de dependencia para la revisión.
 * @property {string} bancoRevision - Banco asociado a la revisión.
 * @property {string} llaveDePagoRevision - Llave de pago para la revisión.
 * @property {string} fechaPagoDeDerechosRevision - Fecha de pago de derechos para la revisión.
 * @property {string} importeDePagoRevision - Importe del pago de derechos para la revisión.
 * @property {string} claveDeReferenciaDerechos - Clave de referencia para los derechos.
 * @property {string} cadenaDependenciaDerechos - Cadena de dependencia para los derechos.
 * @property {string} bancoDerechos - Banco asociado a los derechos.
 * @property {string} llaveDePagoDerechos - Llave de pago para los derechos.
 * @property {string} fechaDePago - Fecha de pago.
 * @property {number} importeDePagoDerechos - Importe del pago de derechos.
 * @property {string} exentoDePago - Indica si el trámite está exento de pago.
 * @property {ExportadorInfo[]} exportadorTableDatos - Información de los exportadores.
 * @property {DestinoInfo[]} destinoTableDatos - Información de los destinos.
 * @property {DatosDeLaSolicitudInt} DatosDeLaSolicitudInt - Información general de la solicitud.
 */
export interface TramiteState {
  justificacion: string;
  certificadosAutorizados: string;
  horaDeInspeccion: string;
  aduanaDeIngreso: number;
  oficinaDeInspeccion: string;
  puntoDeInspeccion: string;
  nombreInspector: string;
  primerApellido: string;
  segundoApellido: string;
  cantidadContenedores: number;
  tipoContenedor: number;
  medioDeTransporte: string;
  identificacionTransporte: string;
  esSolicitudFerros: string;
  mercanciaDatos: MercanciaDatosInfo[];
  folioDelTramite: string;
  numeroDeGuia: string;
  numeroFerrocaril: string;
  regimenAlQueDestina: string;
  datosParaMovilizacion: string;
  puntoDeVerificacion: string;
  identificacionDelTransporte: string;
  nombreDeLaEmpresaTransportista: string;
  claveDeReferencia: string;
  cadenaDependencia: string;
  banco: number;
  llaveDePago: string;
  fechaPagoDeDerechos: string;
  importeDePago: string;
  claveDeReferenciaRevision: string;
  cadenaDependenciaRevision: string;
  bancoRevision: string;
  llaveDePagoRevision: string;
  fechaPagoDeDerechosRevision: string;
  importeDePagoRevision: string;
  claveDeReferenciaDerechos: string;
  cadenaDependenciaDerechos: string;
  bancoDerechos: string;
  llaveDePagoDerechos: string;
  fechaDePago: string;
  importeDePagoDerechos: number;
  exentoDePago: string;
  exportadorTableDatos: ExportadorInfo[];
  destinoTableDatos: DestinoInfo[];
  DatosDeLaSolicitudInt: DatosDeLaSolicitudInt;
}

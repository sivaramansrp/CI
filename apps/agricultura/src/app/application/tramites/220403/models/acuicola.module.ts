import { PersonaTerceros } from "@libs/shared/data-access-user/src";

/**
 * @interface ListsPasoWizard
 * @description
 * Representa la información de un paso en el wizard del trámite.
 */
export interface ListsPasoWizard {
  /** 
   * @property {number} indice
   * @description
   * Índice del paso dentro del wizard. Determina el orden de aparición del paso.
   * Índice del paso 
   */
  indice: number;
  /** 
   * @property {string} titulo
   * @description
   * Título del paso que se muestra al usuario en la interfaz del wizard.
   * Título del paso */
  titulo: string;
  /**
   * @property {boolean} activo
   * @description
   * Indica si el paso está activo actualmente en el flujo del wizard.
   * Indica si el paso está activo */
  activo: boolean;
  /**
   * @property {boolean} completado
   * @description
   * Indica si el paso ha sido completado por el usuario. 
   * Indica si el paso está completado */
  completado: boolean;
}

/**
 * @interface AccionBoton
 * @description
 * Representa un botón de acción en la interfaz.
 */
export interface AccionBoton {
  /**
   * @property {string} accion
   * @description 
   * Acción que se debe realizar */
  accion: string;
  /**
   * @property {number} valor
   * @description 
   * Valor asociado a la acción */
  valor: number;
}

/**
 * @interface DatosPasos
 * @description
 * Contiene la información de los botones y el estado de los pasos del wizard.
 */
export interface DatosPasos {
  /**
   * @property {string} txtBtnSig
   * @description 
   * Texto del botón siguiente */
  txtBtnSig: string;
  /**
   * @property {string} txtBtnAnt
   * @description 
   * Texto del botón anterior */
  txtBtnAnt: string;
  /**
   * @property {number} indice
   * @description
   *  Índice del paso actual */
  indice: number;
  /**
   * @property {number} nroPasos
   * @description
   *  Número total de pasos */
  nroPasos: number;
}

/**
 * @interface FormularioGrupo
 * @description
 * Agrupa los datos de los diferentes formularios del trámite.
 */
export interface FormularioGrupo {
  /**
   * @property {DatosRealizar} datosRealizar
   * @description
   * Datos requeridos para realizar el trámite.
   */
  datosRealizar: DatosRealizar,
  /**
   * @property {CombinacionRequerida} combinacionRequerida
   * @description
   * Información sobre la combinación requerida para el trámite.
   */
  combinacionRequerida: CombinacionRequerida,
  /**
   * @property {Transporte} transporte
   * @description
   * Información relacionada con el transporte de la mercancía.
   */
  transporte: Transporte,
  /**
   * @property {PagoDerechos} pagoDerechos
   * @description
   * Información referente al pago de derechos del trámite.
   */
  pagoDerechos: PagoDerechos,
  /**
   * @property {ColumnasTabla[]} columnasTabla
   * @description
   * Columnas de la tabla de partidas arancelarias y mercancías.
   */
  datosRealizarValidada: boolean,
  /**
   * @property {boolean} combinacionRequeridaValidada
   * @description
   * Indica si la combinación requerida ha sido validada.
   * */
  combinacionRequeridaValidada: boolean,
  /**
   * @property {boolean} transporteValidada
   * @description
   * Indica si la información de transporte ha sido validada.
   */
  transporteValidada: boolean,
  /**
   * @property {boolean} pagoDerechosValidada
   * @description
   * Indica si el pago de derechos ha sido validado.
   */
  pagoDerechosValidada: boolean,
  /**
   * @property {ColumnasTabla[]} columnasTabla
   * @description
   * Columnas de la tabla de partidas arancelarias y mercancías.
   */
  tercerosRelacionados: PersonaTerceros[];
}

/**
 * @interface DatosRealizar
 * @description
 * Datos requeridos para realizar el trámite.
 */
export interface DatosRealizar {
  /**
   * @property {string} certificadoTipo
   * @description
   * Tipo de certificado requerido para el trámite.
   */
  certificadoTipo: string,
  /**
   * @property {string} especie
   * @description
   * Especie de la mercancía relacionada con el trámite.
   */
  aduanaEmbarque: string,
  /**
   * @property {string} numeroContenedor
   * @description
   * numeroContenedor de la mercancía relacionada con el trámite.
    */
  numeroContenedor: string,
  /**
   * @property {string} parisOrigen
   * @description
   * parisOrigen de la mercancía relacionada con el trámite.
   */
  parisOrigen: string,
  /**
   * @property {string} entidadFederativaOrigen
   * @description
   * entidadFederativaOrigen de la mercancía relacionada con el trámite.
   */
  entidadFederativaOrigen: string,
  /**
   * @property {string} municipioOrigen
   * @description
   * municipioOrigen de la mercancía relacionada con el trámite.
   */
  municipoOrigen: string,
  /**
   * @property {string} paisDestino
   * @description
   * paisDestino de la mercancía relacionada con el trámite.
   */
  paisDestino: string,
}

/**
 * @interface CombinacionRequerida
 * @description
 * Información sobre la combinación requerida para el trámite.
 */
export interface CombinacionRequerida {
  /**
   * @property {string} especie
   * @description
   * Especie de la mercancía relacionada con el trámite.
   */
  especie: string,
  /**
   * @property {string} faseDesarrollo
   * @description
   * Fase de desarrollo de la mercancía relacionada con el trámite.
   */
  paisDeDestino: string,
  /**
   * @property {string} faseDesarrollo
   * @description
   * Fase de desarrollo de la mercancía relacionada con el trámite.
   */
  instalacionAcuicola: string
}

/**
 * @interface Transporte
 * @description
 * Información relacionada con el transporte de la mercancía.
 */
export interface Transporte {
  /**
   * @property {string} medioTransporte
   * @description
   * Medio de transporte utilizado para el envío de la mercancía.
   */
  medioTransporte: string,
  /**
   * @property {string} identificacionMedioTransporte
   * @description
   * Identificación del medio de transporte utilizado.
   */
  identificacionMedioTransporte: string,
  /**
   * @property {string} numeroContenedor
   * @description
   * Número de contenedor asociado al transporte de la mercancía.
   */
  numeroDeContenedor: string,
  /**
   * @property {string} denominacionRazonSocial
   * @description
   * Denominación o razón social del propietario del medio de transporte.
   */
  denominacionRazonSocial: string,
  /**
   * @property {string} numeroFlejes
   * @description
   * Número de flejes utilizados en el transporte de la mercancía.
   */
  numeroFlejes: string,
}

/**
 * @interface PagoDerechos
 * @description
 * Información referente al pago de derechos del trámite.
 */
export interface PagoDerechos {
  /**
   * @property {string} claveReferencia
   * @description
   * Clave de referencia del pago realizado.
   */
  claveReferencia: string,
  /**
   * @property {string} cadenaDependencia
   * @description
   * Cadena de dependencia asociada al pago.
   */
  cadenaDependencia: string,
  /**
   * @property {string} banco
   * @description
   * Banco donde se realizó el pago.
   */
  banco: string,
  /**
   * @property {string} llavePago
   * @description
   * Llave de pago utilizada para identificar la transacción.
   */
  llavePago: string,
  /**
   * @property {string} fechaPago
   * @description
   * Fecha en que se realizó el pago.
   */
  fechaPago: string,
  /**
   * @property {string} importePago
   * @description
   * Importe total del pago realizado.
   */
  importePago: string,
}

/**
 * @interface ColumnasTabla
 * @description
 * Define las columnas de la tabla de partidas arancelarias y mercancías.
 */
export interface ColumnasTabla {
  /**
   * @property {string} noPartida
   * @description
   * Número de partida arancelaria de la mercancía.
   */
  noPartida: string,
  /**
   * @property {string} fraccionArancelaria
   * @description
   * Fracción arancelaria asociada a la mercancía.
   */
  fraccionArancelaria: string,
  /**
   * @property {string} descripcionFrccion
   * @description
   * Descripción de la fracción arancelaria.
   */
  descripcionFrccion: string,
  /**
   * @property {string} descripcion
   * @description
   * Descripción detallada de la mercancía.
   */
  descripcion: string,
  /**
   * @property {string} tipoFactura
   * @description
   * Tipo de factura asociada a la mercancía.
   */
  undidadUmt: string,
  /**
   * @property {string} cantidadUmt
   * @description
   * Cantidad de la mercancía medida en la unidad UMT.
   */
  cantidadUmt: string,
  /**
   * @property {string} unidadUmc
   * @description
   * Unidad de medida comercial (UMC) de la mercancía.
   */
  unidadUmc: string,
  /**
   * @property {string} cantidadUmc
   * @description
   * Cantidad de la mercancía medida en la unidad UMC.
   */
  cantidadUmc: string,
  /**
   * @property {string} valorMercancia
   * @description
   * Valor total de la mercancía.
   */
  tipoMercancia: string,
  /**
   * @property {string} tipoMercancia
   * @description
   * Tipo de mercancía (por ejemplo, acuícola, agrícola).
   */
  uso: string,
  /**
   * @property {string} uso
   * @description
   * Uso previsto de la mercancía (por ejemplo, consumo, industrial).
   */
  nombreCientifico: string,
  /**
   * @property {string} nombreCientifico
   * @description
   * Nombre científico de la especie acuícola o agrícola.
   */
  nombreComun: string,
  /**
   * @property {string} nombreComun
   * @description
   * Nombre común de la especie acuícola o agrícola.
   */
  faseDesarrollo: string,
  /**
   * @property {string} faseDesarrollo
   * @description
   * Fase de desarrollo de la especie acuícola o agrícola (por ejemplo, larva, juvenil).
   */
  presentacion: string,
  /**
   * @property {string} presentacion
   * @description
   * Presentación de la mercancía (por ejemplo, congelada, fresca).
   */
  paisProcedencia: string,
}
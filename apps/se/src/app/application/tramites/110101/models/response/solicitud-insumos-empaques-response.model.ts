/**
 * Contenedor de insumos y empaques
 */
export interface DatosInsumosEmpaques {
  /** Listado de insumos */
  insumos: Insumo[];

  /** Listado de empaques */
  empaques: Empaque[];
}

/**
 * Modelo de insumo
 */
export interface Insumo {
  /** Nombre técnico del insumo */
  nombre: string;

  /** Proveedor del insumo */
  proveedor: string;

  /** Fabricante o productor */
  fabricanteProductor: string;

  /** RFC del fabricante o productor */
  rfcFabricanteProductor: string;

  /** Clave de fracción arancelaria */
  claveFraccionArancelaria: string;

  /** Descripción de la fracción arancelaria */
  descripcionFraccion: string;

  /** Capítulo arancelario */
  capitulo: string;

  /** Nombre del capítulo */
  nombreCapitulo: string;

  /** Partida arancelaria */
  partida: string;

  /** Nombre de la partida */
  nombrePartida: string;

  /** Subpartida arancelaria */
  subpartida: string;

  /** Nombre de la subpartida */
  nombreSubpartida: string;

  /** Valor del insumo */
  valor: number;

  /** Indica si es originario */
  esOriginario: string;

  /** País de origen */
  paisOrigen: string;

  /** Peso del insumo */
  peso: number;

  /** Volumen del insumo */
  volumen: number;
}

/**
 * Modelo de empaque
 */
export interface Empaque {
  /** Nombre técnico del empaque */
  nombre: string;

  /** Proveedor del empaque */
  proveedor: string;

  /** Fabricante o productor */
  fabricanteProductor: string;

  /** Clave de fracción arancelaria */
  claveFraccionArancelaria: string;

  /** Valor del empaque */
  valor: number;

  /** Indica si es originario */
  esOriginario: string;
}

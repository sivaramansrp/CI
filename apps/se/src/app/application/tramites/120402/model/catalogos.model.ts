export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;
  /** Descripción del catálogo. */
  descripcion: string;
  /** Clave opcional del catálogo. */
  clave?: string;
  /** Tamaño opcional del catálogo. */
  relacionadaUmtId?: number;
  /** Identificador relacionado con acotación opcional. */
  relacionadaAcotacionId?: number;
  nombreData: string;
  representaciones?: Catalogo[];
}
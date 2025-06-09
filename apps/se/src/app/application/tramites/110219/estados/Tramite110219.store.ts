import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;

  /** Descripción del catálogo. */
  descripcion: string;
}

/**
 * Representa una mercancía asociada al certificado.
 */
export interface MercanciaCertificado {
  /** Número de orden de la mercancía. */
  numeroOrden: number;

  /** Fracción arancelaria de la mercancía. */
  fraccionArancelaria: string;

  /** Nombre técnico de la mercancía. */
  nombreTecnico: string;

  /** Nombre comercial de la mercancía. */
  nombreComercial: string;

  /** Nombre en inglés de la mercancía. */
  nombreIngles: string;

  /** Descripción complementaria de la mercancía. */
  complementoDescripcion: string;

  /** Número de certificado asociado a la mercancía. */
  numeroCertificado: string;

  /** País o bloque asociado a la mercancía. */
  pais: string;

  /** Tratado o acuerdo asociado a la mercancía. */
  tratado: string;

  /** Fecha de expedición del certificado. */
  fechaExpedicion: string;

  /** Fecha de vencimiento del certificado. */
  fechaVencimiento: string;
}

/**
 * Representa un productor asociado al certificado.
 */
export interface ProductorAsociado {
  /** Identificador único del productor. */
  id: number;

  /** Nombre del productor. */
  nombre: string;

  /** Dirección del productor. */
  direccion: string;

  /** País del productor. */
  pais: string;
}

/**
 * Estado inicial para la interfaz del trámite 110219.
 */
export interface Solicitud110219State {
  /** Lista de catálogos disponibles. */
  catalogos: Catalogo[];

  /** Lista de mercancías asociadas al certificado. */
  mercancias: MercanciaCertificado[];

  /** Lista de productores asociados al certificado. */
  productores: ProductorAsociado[];

  /** Paso actual del asistente. */
  pasoActual: number;

  /** Indica si el certificado de origen está habilitado. */
  certificadoDeOrigen: boolean;

  /** Número de certificado asociado al trámite. */
  numeroCertificado: string;

  /** Lista de países asociados al trámite. */
  pais: Catalogo[];

  /** Lista de tratados asociados al trámite. */
  tratado: Catalogo[];

  /** Fecha inicial del trámite. */
  fechaInicial: string;

  /** Fecha final del trámite. */
  fechaFinal: string;

  /** Motivo de cancelación del trámite. */
  motivoCancelacion: string;

  /** Fecha de expedición del certificado. */
  fechaExpedicion: string;

  /** Fecha de vencimiento del certificado. */
  fechaVencimiento: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 110219.
 * @returns Estado inicial de tipo `Solicitud110219State`.
 */
export function createInitialState(): Solicitud110219State {
  return {
    catalogos: [],
    mercancias: [],
    productores: [],
    pasoActual: 1,
    certificadoDeOrigen: false,
    numeroCertificado: '',
    pais: [],
    tratado: [],
    fechaInicial: '',
    fechaFinal: '',
    motivoCancelacion: '',
    fechaExpedicion: '',
    fechaVencimiento: '',
  };
}

/**
 * Clase que representa el almacén de datos para el trámite 110219.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110219', resettable: true })
export class Tramite110219Store extends Store<Solicitud110219State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el número de certificado en el estado.
   * @param numeroCertificado Número de certificado a actualizar.
   */
  public setNumeroCertificado(numeroCertificado: string): void {
    this.update((state) => ({ ...state, numeroCertificado }));
  }

  /**
   * Actualiza la lista de países en el estado.
   * @param pais Lista de países a actualizar.
   */
  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({ ...state, pais }));
  }

  /**
   * Actualiza la lista de tratados en el estado.
   * @param tratado Lista de tratados a actualizar.
   */
  public setTratado(tratado: Catalogo[]): void {
    this.update((state) => ({ ...state, tratado }));
  }

  /**
   * Actualiza la fecha inicial en el estado.
   * @param fechaInicial Fecha inicial a actualizar.
   */
  public setFechaInicial(fechaInicial: string): void {
    this.update((state) => ({ ...state, fechaInicial }));
  }

  /**
   * Actualiza la fecha final en el estado.
   * @param fechaFinal Fecha final a actualizar.
   */
  public setFechaFinal(fechaFinal: string): void {
    this.update((state) => ({ ...state, fechaFinal }));
  }

  /**
   * Actualiza el motivo de cancelación en el estado.
   * @param motivoCancelacion Motivo de cancelación a actualizar.
   */
  public setMotivoCancelacion(motivoCancelacion: string): void {
    this.update((state) => ({ ...state, motivoCancelacion }));
  }

  /**
   * Actualiza la fecha de expedición en el estado.
   * @param fechaExpedicion Fecha de expedición a actualizar.
   */
  public setFechaExpedicion(fechaExpedicion: string): void {
    this.update((state) => ({ ...state, fechaExpedicion }));
  }

  /**
   * Actualiza la fecha de vencimiento en el estado.
   * @param fechaVencimiento Fecha de vencimiento a actualizar.
   */
  public setFechaVencimiento(fechaVencimiento: string): void {
    this.update((state) => ({ ...state, fechaVencimiento }));
  }
}
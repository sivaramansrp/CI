import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}

/**
 * Representa una mercancía asociada al certificado.
 */
export interface MercanciaCertificado {
  numeroOrden: number;
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  nombreIngles: string;
  complementoDescripcion: string;
  numeroCertificado: string;
  pais: string;
  tratado: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}

/**
 * Representa un productor asociado al certificado.
 */
export interface ProductorAsociado {
  id: number;
  nombre: string;
  direccion: string;
  pais: string;
}
/**
 * Estado inicial para la interfaz del trámite 110219.
 */
export interface Solicitud110219State {
  catalogos: Catalogo[];
  mercancias: MercanciaCertificado[];
  productores: ProductorAsociado[];
  pasoActual: number;
  certificadoDeOrigen: boolean;
  numeroCertificado: string;
  pais: Catalogo[] | null;
  tratado: Catalogo[] | null;
  fechaInicial: string;
  fechaFinal: string;
  certificadoDisponibles: string;
  motivoCancelacion: string;
  mercanciaCertificado: string;
  productoresAsociados: string;
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
    pais: null,
    tratado: null,
    fechaInicial: '',
    fechaFinal: '',
    certificadoDisponibles: '',
    motivoCancelacion: '',
    mercanciaCertificado: '',
    productoresAsociados: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110219', resettable: true })
export class Tramite110219Store extends Store<Solicitud110219State> {
  constructor() {
    super(createInitialState());
  }
  public setNumeroCertificado(numeroCertificado: string) {
    this.update((state) => ({...state,numeroCertificado,}));
  }

  public setPais(pais: Catalogo[]) {
    this.update((state) => ({...state, pais, }));
  }
  public setTratado(tratado: Catalogo[]) {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  public setFechaInicial(fechaInicial: string) {
    this.update((state) => ({
      ...state,
      fechaInicial,
    }));
  }

  public setFechaFinal(fechaFinal: string) {
    this.update((state) => ({
      ...state,
      fechaFinal,
    }));
  }
  public setCertificadodisponsibles(certificadoDisponibles: string) {
    this.update((state) => ({
      ...state,
      certificadoDisponibles,
    }));
  }
  public setMotivoCancelacion(motivoCancelacion: string) {
    this.update((state) => ({
      ...state,
      motivoCancelacion,
    }));
  }
  public setMercanciaCertificado(mercanciaCertificado: string) {
    this.update((state) => ({
      ...state,
      mercanciaCertificado,
    }));
  }
  public setProductoresAsociados(productoresAsociados: string) {
    this.update((state) => ({
      ...state,
      productoresAsociados,
    }));
  }
}

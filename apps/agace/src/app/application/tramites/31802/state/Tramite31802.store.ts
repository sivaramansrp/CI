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
 * Estado inicial para la interfaz del trámite 31803.
 */
export interface Solicitud31802State {
  /** Número de operación asociado a la solicitud. */
  numeroOperacion: number;
  /** Llave única asociada a la solicitud. */
  llave: string;
  /** Primer manifiesto asociado a la solicitud. */
  manifiesto1: string;
  /** Segundo manifiesto asociado a la solicitud. */
  manifiesto2: string;
  /** Segundo manifiesto asociado a la solicitud. */
  manifiesto3: string;
  /** Fecha de pago asociada a la solicitud. */
  fechaPago: string;
  /** Moneda nacional asociada a la solicitud. */
  monedaNacional: string;
  /** Indica si la solicitud es una renovación (`true` o `false`). */
  renovacion: boolean;
  /** Indica si la solicitud es una homologación (`true` o `false`). */
  homologacion: boolean;
}

/**
 * Crea el estado inicial para la solicitud del trámite 31803.
 * @returns Estado inicial de tipo `Solicitud31802State`.
 */
export function createInitialState(): Solicitud31802State {
  return {
    numeroOperacion: 0,
    llave: '',
    manifiesto1: '',
    manifiesto2: '',
    manifiesto3: '',
    fechaPago: '',
    monedaNacional: '',
    renovacion: false,
    homologacion: false,
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 31803.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31802', resettable: true })
export class Tramite31802Store extends Store<Solicitud31802State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el número de operación en el estado.
   * @param numeroOperacion Número de operación de tipo `string`.
   */
  public setNumeroOperacion(numeroOperacion: number) {
    this.update((state) => ({ ...state, numeroOperacion }));
  }

  /**
   * Actualiza la llave en el estado.
   * @param llave Llave única de tipo `string`.
   */
  public setLlave(llave: string) {
    this.update((state) => ({ ...state, llave }));
  }

  /**
   * Actualiza el primer manifiesto en el estado.
   * @param manifiesto1 Primer manifiesto de tipo `string`.
   */
  public setManifiesto1(manifiesto1: string) {
    this.update((state) => ({ ...state, manifiesto1 }));
  }

  /**
   * Actualiza el segundo manifiesto en el estado.
   * @param manifiesto2 Segundo manifiesto de tipo `string`.
   */
  public setManifiesto2(manifiesto2: string) {
    this.update((state) => ({ ...state, manifiesto2 }));
  }
  /**
 * Actualiza el segundo manifiesto en el estado.
 * @param manifiesto3 Segundo manifiesto de tipo `string`.
 */
  public setManifiesto3(manifiesto3: string) {
    this.update((state) => ({ ...state, manifiesto3 }));
  }
  /**
   * Actualiza la fecha de pago en el estado.
   * @param fechaPago Fecha de pago de tipo `string`.
   */
  public setFechaPago(fechaPago: string) {
    this.update((state) => ({ ...state, fechaPago }));
  }
  /**
   * Actualiza el valor de renovación en el estado.
   * @param renovacion Indica si la solicitud es una renovación (`true` o `false`).
   */
  setRenovacion(renovacion: boolean): void {
    this.update((state) => ({
      ...state,
      renovacion,
    }));
  }
  /**
 * Actualiza el valor de homologación en el estado.
 * @param homologacion Indica si la solicitud es una homologación (`true` o `false`).
 */
  setHomologacion(homologacion: boolean): void {
    this.update((state) => ({
      ...state,
      homologacion,
    }));
  }
  /**
 * Actualiza la moneda nacional en el estado.
 * @param monedaNacional Moneda nacional de tipo `string`.
 */
  public setMonedaNacional(monedaNacional: string) {
    this.update((state) => ({ ...state, monedaNacional }));
  }
  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSolicitud() {
    this.reset();
  }
}

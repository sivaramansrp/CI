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
 * Estado inicial para la interfaz del trámite 31803.
 */
export interface Solicitud31803State {
  numeroOperacion: string;
  banco: Catalogo[] | null;
  llave: string;
  manifiesto1: string;
  manifiesto2: string;
  fechaPago: string;
}
/**
 * Crea el estado inicial para la solicitud del trámite 31803.
 * @returns Estado inicial de tipo `Solicitud31803State`.
 */
export function createInitialState(): Solicitud31803State {
  return {
    numeroOperacion: '',
    banco: null,
    llave: '',
    manifiesto1: '',
    manifiesto2: '',
    fechaPago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31803', resettable: true })
export class Tramite31803Store extends Store<Solicitud31803State> {
  constructor() {
    super(createInitialState());
  }
  
  public setBanco(banco: Catalogo[]) {
    this.update((state) => ({...state,banco,}));
  }

  public setNumeroOperacion(numeroOperacion: string) {
    this.update((state) => ({ ...state, numeroOperacion, }));
  }

  public setLlave(llave: string) {
    this.update((state) => ({ ...state, llave, }));
  }

  public setManifiesto1(manifiesto1: string) {
    this.update((state) => ({ ...state, manifiesto1, }));
  }

  public setManifiesto2(manifiesto2: string) {
    this.update((state) => ({ ...state, manifiesto2, }));
  }
 public setFechaPago(fechaPago: string) {
    this.update((state) => ({ ...state, fechaPago, }));
  }
  public limpiarSolicitud() {
    this.reset();
  }
}

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 31501
 * @returns Solicitud31501
 */
export interface Solicitud31501State {
  tipoBusqueda: string;
  rfc: string;
  tipoDeTramite: string;
  tipoDeRequerimiento: string;
  folioDeTramite: string;
  datosDelContenedor: [];
  motivoCancelacion?: string;
}

export function createInitialState(): Solicitud31501State {
  return {
    tipoBusqueda: '',
    rfc: '',
    tipoDeTramite: '',
    tipoDeRequerimiento: '',
    folioDeTramite: '',
    datosDelContenedor: [],
    motivoCancelacion: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31501', resettable: true })
export class Tramite31501Store extends Store<Solicitud31501State> {
  setFraccionRegla(arg0: string): void {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super(createInitialState());
  }

  public setTipoBusqueda(tipoBusqueda: string) {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }

  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setTipoDeTramite(tipoDeTramite: string) {
    this.update((state) => ({
      ...state,
      tipoDeTramite,
    }));
  }

  public setTipoDeRequerimiento(tipoDeRequerimiento: string) {
    this.update((state) => ({
      ...state,
      tipoDeRequerimiento,
    }));
  }

  public setFolioDeTramite(folioDeTramite: string) {
    this.update((state) => ({
      ...state,
      folioDeTramite,
    }));
  }

  public setDelContenedor(datosDelContenedor: []): void {
    this.update((state) => ({
      ...state,
      datosDelContenedor,
    }));
  }

  public setMotivoCancelacion(motivoCancelacion: string): void {
    this.update((state) => ({
      ...state,
      motivoCancelacion,
    }));
  }
}

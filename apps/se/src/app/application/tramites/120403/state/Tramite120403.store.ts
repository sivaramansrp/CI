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
 * Estado inicial para la interfaz del trámite 120403.
 */
export interface Solicitud120403State {
  asignacionRadio:string,
    asignacionsolitud:string,
    numTramite:string,
    fechaFin: string,
    ampliar: string,
    valorSeleccionado: string | null;
}
/**
 * Crea el estado inicial para la solicitud del trámite 120403.
 * @returns Estado inicial de tipo `Solicitud120403State`.
 */
export function createInitialState(): Solicitud120403State {
  return {
    asignacionRadio: '',
        asignacionsolitud: '',
        numTramite: '',
        fechaFin: '',
        ampliar: '',
        valorSeleccionado: null,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120403', resettable: true })
export class Tramite120403Store extends Store<Solicitud120403State> {
  constructor() {
    super(createInitialState());
  }
  public setValorSeleccionado(valorSeleccionado: string) {
    this.update((state) => ({
      ...state,
      valorSeleccionado,
    }));
  }
  public setAsignacionRadio(asignacionRadio: string):void {
    this.update((state) => ({
      ...state,
      asignacionRadio,
    }));
  }

  public setAsignacionsolitud(asignacionsolitud: string):void {
    this.update((state) => ({
      ...state,
      asignacionsolitud,
    }));
  }

  public setNumTramite(numTramite: string):void {
    this.update((state) => ({
      ...state,
      numTramite,
    }));
  }
  public setFechaFin(fechaFin: string):void {
    this.update((state) => ({
      ...state,
      fechaFin,
    }));
  }
  public setAmpliar(ampliar: string):void {
    this.update((state) => ({
      ...state,
      ampliar,
    }));
  }
  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}

import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 301
 * @returns Solicitud301
 */
export interface Solicitud260605State {
  numeroDPmiso: string;
  cstumbresAtuales: string;
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  aduanasDisponibles:[];
  aduanasSeleccionadas:[];
  cantidadSolicitada:string;
}

export function createInitialState(): Solicitud260605State {
  return {
    numeroDPmiso: '',
    cstumbresAtuales:'',
    rfc: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    aduanasDisponibles:[],
    aduanasSeleccionadas:[],
  cantidadSolicitada:''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260605', resettable: true })
export class Tramite260605Store extends Store<Solicitud260605State> {
  /**
   * Crea una instancia de Tramite301Store.
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }

  public setNumeroDPmiso(numeroDPmiso: string) {
    this.update((state) => ({
      ...state,
      numeroDPmiso,
    }));
  }

  public setCstumbresAtuales(cstumbresAtuales: string) {
    this.update((state) => ({
      ...state,
      cstumbresAtuales,
    }));
  }

  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setNombre(nombre: string) {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  public setApellidoPaterno(apellidoPaterno: string) {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  public setApellidoMaterno(apellidoMaterno: string) {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  public setAduanasDisponibles(aduanasDisponibles:[]) {
    this.update((state) => ({
      ...state,
      aduanasDisponibles,
    }));
  }

  public setAduanasSeleccionadas(aduanasSeleccionadas:[]) {
    this.update((state) => ({
      ...state,
      aduanasSeleccionadas,
    }));
  }

  public setCantidadSolicitada(cantidadSolicitada: string) {
    this.update((state) => ({
      ...state,
      cantidadSolicitada,
    }));
  }






  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}

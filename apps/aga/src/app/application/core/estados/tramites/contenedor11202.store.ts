import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Contenedor11202State {
    
    tipoBusqueda: string;
    idSolicitud:string;
    inicialesContenedor:string;
    aduana:string;
    numeroContenedor: string;
    tipoContenedor: string;
   
   
  }

  export function createInitialState():Contenedor11202State
  {
    return{
        idSolicitud:'',
       tipoBusqueda: '',
        inicialesContenedor:'',
        aduana:'',
        numeroContenedor: '',
        tipoContenedor:'',
    };

  }

  @Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'contenedor11202', resettable: true })
  export class Contenedor11202Store extends Store<Contenedor11202State> {
    constructor() {
      super(createInitialState());
    }

    /**
   * Guarda el tipo de solicitud en el estado.
   *
   * @param idSolicitud - El tipo de solicitud que se va a guardar.
   */
  public setIdSolicitud(idSolicitud: string) {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }




  public setInicialesContenedor(inicialesContenedor: string) {
    this.update((state) => ({
      ...state,
      inicialesContenedor,
    }));

  }
  public setAduana(aduana: string) {
    this.update((state) => ({
      ...state,
      aduana,
    }));

  }
  public setTipoBusqueda(tipoBusqueda: string) {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));

  }
  public setNumeroContenedor(numeroContenedor: string) {
    this.update((state) => ({
      ...state,
      numeroContenedor,
    }));

  }
  public setTipoContenedor(tipoContenedor: string) {
    this.update((state) => ({
      ...state,
      tipoContenedor,
    }));

  }
}

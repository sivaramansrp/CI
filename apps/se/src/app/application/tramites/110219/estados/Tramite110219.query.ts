
  import { Injectable } from '@angular/core';
  import { Query } from '@datorama/akita';
import { Solicitud110219State, Tramite110219Store } from './Tramite110219.store';
  
  /**
   * Clase que proporciona consultas reactivas para el estado del trámite 110219.
   * Permite seleccionar partes específicas del estado almacenado en la tienda.
   */
  @Injectable({ providedIn: 'root' })
  export class Tramite110219Query extends Query<Solicitud110219State> {
    /**
     * Constructor de la clase.
     * @param store Instancia de la tienda `Tramite110219Store` que contiene el estado del trámite.
     */
    constructor(protected override store: Tramite110219Store) {
      super(store);
    }
  
    /**
     * Selecciona todo el estado de la solicitud.
     */
    selectSolicitud$ = this.select((state) => {
      return state;
    });
  
    
  }
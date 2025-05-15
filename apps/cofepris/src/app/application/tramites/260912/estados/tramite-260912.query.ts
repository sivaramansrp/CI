import { Tramite260912Store, Tramites260912State } from './tramite-260912.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @description
 * Clase que extiende de Akita Query para gestionar las consultas al estado de Tramite260912.
 * Proporciona selectores para acceder a los atributos del estado de manera reactiva.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260912Query extends Query<Tramites260912State> {
  /**
     * Selector para obtener todo el estado de Tramite260911.
     */
    selectTramite260912$ = this.select((state) => state);
  
    /**
     * Constructor del servicio de consulta.
     * @param tramiteStore Instancia del store de Tramite260911.
     */
    constructor(protected override store: Tramite260912Store) {
      super(store);
    }
  }
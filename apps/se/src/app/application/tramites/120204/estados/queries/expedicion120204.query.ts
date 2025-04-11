import { Expedicion120204State, Expedicion120204Store } from '../../estados/tramites/expedicion120204.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio de consulta para el estado de la entidad `Expedicion120204State`.
 * 
 * Proporciona flujos observables para las propiedades del estado, como 
 * `entidadFederativa` y `representacionFederal`.
 * 
 * @extends Query<Expedicion120204State>
 */
@Injectable({ providedIn: 'root' })
export class Expedicion120204Query extends Query<Expedicion120204State> {

  /**
   * Observable que emite el valor actual de la propiedad `entidadFederativa` 
   * del estado.
   */
  entidadFederativa$ = this.select((state) => state.entidadFederativa);

  /**
   * Observable que emite el valor actual de la propiedad `representacionFederal` 
   * del estado.
   */
  representacionFederal$ = this.select((state) => state.representacionFederal);
   
  /**
   * Observable que emite el valor actual de la propiedad `montoAExpedir` 
   * del estado.
   */

  montoAExpedir$ = this.select((state) => state.montoAExpedir)

  /**
   * Observable que emite el valor actual de la propiedad `montoAExpedirCheck` 
   * del estado.
   */

  montoAExpedirCheck$ = this.select((state) => state.montoAExpedirCheck)
  
  /**
   * Observable que emite el valor actual de la propiedad `totalAExpedir` 
   * del estado.
   */

  totalAExpedir$ = this.select((state) => state.totalAExpedir)

  /**
   * Constructor de la clase `Expedicion120204Query`.
   * 
   * @param store - Instancia del almacén `Expedicion120204Store` que contiene 
   * el estado de la entidad.
   */
  constructor(
    protected override store: Expedicion120204Store) {
    super(store);
  }
}

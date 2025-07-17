import { Tramite32608Store, Tramites32608State } from './tramites32608.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @clase
 * @nombre Tramite32608Query
 * @descripción
 * Clase que extiende de `Query` de Akita para gestionar las consultas relacionadas con el estado de `Tramites32608State`.
 * Proporciona un flujo observable para seleccionar el estado completo del trámite 32608.
 * 
 * @decorador @Injectable
 * @decorador @providedIn: 'root'
 * 
 * @ejemplo
 * this.tramite32608Query.selectTramite32608$.subscribe((state) => {
 *   console.log(state);
 * });
 */
@Injectable({ providedIn: 'root' })
export class Tramite32608Query extends Query<Tramites32608State> {
    /**
   * @propiedad
   * @nombre selectTramite32608$
   * @tipo {Observable<Tramites32608State>}
   * @descripción
   * Observable que emite el estado completo de `Tramites32608State`.
   * 
   * @ejemplo
   * this.tramite32608Query.selectTramite32608$.subscribe((state) => {
   *   console.log(state);
   * });
   */
  selectTramite32608$= this.select((state) => {
    return state;
  });

   /**
   * @constructor
   * @descripción
   * Constructor que inicializa la clase `Tramite32608Query` con la tienda `Tramite32608Store`.
   * 
   * @param {Tramite32608Store} store - La tienda de Akita que contiene el estado de `Tramites32608State`.
   */
  constructor(
    protected override store: Tramite32608Store) {
    super(store);
  }
}
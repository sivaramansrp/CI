import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite110217State,Tramite110217Store } from '../tramites/tramite110217.store';



@Injectable({ providedIn: 'root' })
export class Tramite110217Query extends Query<Tramite110217State> {


  selectSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(
    protected override store: Tramite110217Store) {
    super(store);
  }
    /**
   * Selecciona el catálogo de naciones.
   */
    selectNacion$ = this.select((state) => state.nacion);

     /**
   * Selecciona el catálogo de transportes.
   */
  selectTransporte$ = this.select((state) => state.transporte);

}

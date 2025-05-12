import { Solicitud120501State, Tramite120501Store } from '../../estados/tramites/tramite120501.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite120501Query extends Query<Solicitud120501State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  
    entidadFederativa$ = this.select((state) => state.entidadFederativa);
    representacionFederal$ = this.select((state) => state.representacionFederal);
    montoRecibir$ = this.select((state) => state.montoRecibir);


  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Tramite120501Store) {
    super(store);
  }
}

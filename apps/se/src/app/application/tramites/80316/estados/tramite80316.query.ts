import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud80316State, Tramite80316Store } from './tramite80316.store';

@Injectable({ providedIn: 'root' })
export class Tramite80316Query extends Query<Solicitud80316State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  selectEstado$ = this.select((state) => {
    return state.estado;
  });

  FormaValida$ = this.select((state) => {
   return Object.values(state.formaValida).every(value => value === true);
  })

  selectBuscarDomicilios$ = this.select((state) => {
    return state.buscarDomicilios;
  });

  selectDomicilios$ = this.select((state) => {
    return state.domicilios;
  });

  selectAltaPlanta$ = this.select((state) => {
    return state.altaPlanta;
  });


  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Tramite80316Store) {
    super(store);
  }
}

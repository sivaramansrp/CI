import { Tramite130109State, Tramite130109Store } from '../tramites/tramites130109.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite130109Query extends Query<Tramite130109State> {
  constructor(protected override store: Tramite130109Store) {
    super(store);
  }
  selectSolicitud$ = this.select((state) => {
    return state;
  });
  mostrarTabla$ = this.select((state) => state.mostrarTabla);
  filaSeleccionada$ = this.select(state => state.filaSeleccionada);
  
}

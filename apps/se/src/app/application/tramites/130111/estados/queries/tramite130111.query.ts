import { Tramite130111State, Tramite130111Store } from '../tramites/tramites130111.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite130111Query extends Query<Tramite130111State> {
  constructor(protected override store: Tramite130111Store) {
    super(store);
  }
  selectSolicitud$ = this.select((state) => {
    return state;
  });
  mostrarTabla$ = this.select((state) => state.mostrarTabla);
  filaSeleccionada$ = this.select(state => state.filaSeleccionada);
  
}

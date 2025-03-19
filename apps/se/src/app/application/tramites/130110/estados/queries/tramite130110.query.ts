import { Tramite130109State, Tramite130109Store } from '../tramites/tramites130110.store';
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

  // Observable to watch selected row changes
  filaSeleccionada$ = this.select(state => state.filaSeleccionada);

  // Observable to watch full table data
  //tableData$ = this.select(state => state.tableDataDatos);
 
  
}

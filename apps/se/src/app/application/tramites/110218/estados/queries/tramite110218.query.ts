import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud110218State } from '../tramites/tramite110218.store';
import { Tramite110218Store } from '../tramites/tramite110218.store';


@Injectable({
  providedIn: 'root'
})
export class Tramite110218Query extends Query<Solicitud110218State> {
  
  /**
   * Observable que emite el estado completo del trámite 110218.
   */
  selectTramite110218State$ = this.select((state) => state);

  /**
   * Constructor del servicio.
   * 
   * @param store - Instancia del store que contiene el estado del trámite 110218.
   */
  constructor(
    protected override store: Tramite110218Store
  ) {
    super(store);
  }
    
}


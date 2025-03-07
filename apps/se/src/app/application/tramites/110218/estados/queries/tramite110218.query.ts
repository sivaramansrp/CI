import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud110218State } from '../tramites/tramite110218.store';
import { Tramite110218Store } from '../tramites/tramite110218.store';


@Injectable({
  providedIn: 'root'
})
export class Tramite110218Query extends Query<Solicitud110218State> {
  puertodeEmbarque$ = this.select((state) => state.puertodeEmbarque);
  puertodeDesembarque$ = this.select((state) => state.puertodeDesembarque);
  puertodeTránsito$ = this.select((state) => state.puertodeTránsito);
  nombredelaEmbarcación$ = this.select((state) => state.nombredelaEmbarcación);
  númerodeVuelo$ = this.select((state) => state.númerodeVuelo);


  constructor(protected override store: Tramite110218Store) {
    super(store);
  }
    
}

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Tramite260402State, Tramite260402Store } from './tramite260402.store';


@Injectable({ providedIn: 'root' })
export class Tramite260402Query extends Query<Tramite260402State> {
  selectedEstado$ = this.select((state) => state.selectedEstado);
  selectedClave$ = this.select((state) => state.setClave);
  selectedBanco$ = this.select((state) => state.setBanco);
  selectedClaveDeReferncia$ = this.select((state)=>state.setClaveDeReferncia)
  selectedCadenaDeLaDependencia$ = this.select((state)=>state.setCadenaDeLaDependencia)
  selectedLlaveDePago$=this.select((state)=>state.setLlaveDePago)
  selectedFechaDePago$=this.select((state)=>state.setFechaDePago)
  selectedImporteDePago$ = this.select((state)=>state.setImporteDePago)
  constructor(private tramiteStore: Tramite260402Store) {
    super(tramiteStore);
  }
}

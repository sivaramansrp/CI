import { Tramite630307State, Tramite630307Store } from './tramite630307.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite630307Query extends Query<Tramite630307State> {

selectTramite630307State$ = this.select((state) => state);
  constructor(
    protected override store: Tramite630307Store) {
    super(store);
  }
  marca$ = this.select((state) => state.marca);
  modelo$ = this.select((state) => state.modelo);
  numeroDeSerie$ = this.select((state) => state.numeroDeSerie);
  numeroDeMotor$ = this.select((state) => state.numeroDeMotor);
  descripcionAdicionalDeLaMercancia$ = this.select((state) => state.descripcionAdicionalDeLaMercancia);
  motivooJustificacionDeLaImportacionTemporal$ = this.select((state) => state.motivooJustificacionDeLaImportacionTemporal);
}
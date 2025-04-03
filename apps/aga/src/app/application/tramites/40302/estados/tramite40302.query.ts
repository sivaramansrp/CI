import { Solicitud40302State, Solicitud40302Store } from './tramite40302.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Solicitud40302Query extends Query<Solicitud40302State> {
  selectedDirectorGeneralNombre$ = this.select((state) => state.directorGeneralNombre);
  selectedPrimerApellido$ = this.select((state) => state.primerApellido);
  selectedSegundoApellido$ = this.select((state) => state.segundoApellido);

  constructor(protected override store: Solicitud40302Store) {
    super(store);
  }
}

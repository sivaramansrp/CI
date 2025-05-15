import { DocumentosStates, SolicitudDocumentosState } from '../estados/documentos.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class SolicitudDocumentosQuery extends Query<SolicitudDocumentosState> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(
    protected override store: DocumentosStates) {
    super(store);
  }
}
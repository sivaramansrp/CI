import { EstadoFormularioSolicitud } from '../tramites/dato-solicitud.store';
import { FormularioSolicitudStore } from '../tramites/dato-solicitud.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class FormularioSolicitudQuery extends Query<EstadoFormularioSolicitud> {
  solicitud$ = this.select(estado => estado.solicitud);
  empresaReciclaje$ = this.select(estado => estado.empresaReciclaje);
  lugarReciclaje$ = this.select(estado => estado.lugarReciclaje);

  constructor(protected override store: FormularioSolicitudStore) {
    super(store);
  }
}

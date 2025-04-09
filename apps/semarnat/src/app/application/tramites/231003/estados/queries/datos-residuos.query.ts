import { EstadoFormularioResiduo, FormularioResiduoStore } from '../tramites/datos-residuos.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class FormularioResiduoQuery extends Query<EstadoFormularioResiduo> {

  obtenerFormularioDatos$ = this.select(state => state.formularioDatos);
  obtenerFormularioResiduo$ = this.select(state => state.formularioResiduo);

  constructor(protected override store: FormularioResiduoStore) {
    super(store);
  }
}

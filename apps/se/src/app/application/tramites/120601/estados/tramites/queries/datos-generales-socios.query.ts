import { DatosGeneralesSociosState, DatosGeneralesSociosStore } from '../store/datos-generales-socios.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DatosGeneralesSociosQuery extends Query<DatosGeneralesSociosState> {

  
  selectNacionalidad$ = this.select((state) => {
    return state.nacionalidad;
  });

  selectPersona$ = this.select((state) => {
    return state.persona;
  })

  selectCadenaDependencia$ = this.select((state) => {
    return state.cadenaDependencia;
  })

  constructor(
    protected override store: DatosGeneralesSociosStore) {
    super(store);
  }
}
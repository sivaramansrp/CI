import { Tramite120601Store, Tramites120601State } from './tramite-120601.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite120601Query extends Query<Tramites120601State> {

  
  selectNacionalidad$ = this.select((state) => {
    return state.datosGeneralesSocios.nacionalidad;
  });

  selectPersona$ = this.select((state) => {
    return state.datosGeneralesSocios.persona;
  })

  selectCadenaDependencia$ = this.select((state) => {
    return state.datosGeneralesSocios.cadenaDependencia;
  })

  selectTipoDeEmpresa$ = this.select((state) => {
    return state.datosDeLaSolicitud.tipoDeEmpresa;
  });

  selectEstado$ = this.select((state) => {
    return state.representacionFederal.estado;
  });

  selectRepresentacion$ = this.select((state)=> {
    return state.representacionFederal.representacion;
  })

  constructor(
    protected override store: Tramite120601Store) {
    super(store);
  }
}
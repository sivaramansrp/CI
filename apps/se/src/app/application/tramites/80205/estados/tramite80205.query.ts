import { AmpliacionServiciosState } from './tramite80205.store';
import { AmpliacionServiciosStore } from './tramite80205.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';




@Injectable({ providedIn: 'root' })
export class AmpliacionServiciosQuery extends Query<AmpliacionServiciosState> {

  selectInfoRegistro$ = this.select((state) => state.infoRegistro);

  selectServicios$ = this.select((state) => state.servicios);

  selectEmpresas$ = this.select((state) => state.empresas);

  selectAduanaDeIngreso$ = this.select((state) => state.aduanaDeIngreso);

  selectDatosImmex$ = this.select((state) => state.datosImmex);

  selectDatos$ = this.select((state) => state.datos);

  selectAduanaDeIngresoSelecion$ = this.select((state) => state.aduanaDeIngresoSelecion);

  FormaValida$ = this.select((state) => {
    return Object.values(state.formaValida).every(value => value === true);
   })
   
   selectRfcEmpresa$ = this.select((state) => state.rfcEmpresa);
   selectNumeroPrograma$ = this.select((state) => state.numeroPrograma);
   selectTiempoPrograma$ = this.select((state) => state.tiempoPrograma);

  constructor(protected override store: AmpliacionServiciosStore) {
    super(store);
  }
}

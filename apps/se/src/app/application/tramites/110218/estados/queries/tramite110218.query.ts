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
  nombre$ = this.select((state) => state.nombre);
  primerApellido$ = this.select((state) => state.primerApellido);
  númeroderegistroFiscal$ = this.select((state) => state.númeroderegistroFiscal);
  razónSocial$ = this.select((state) => state.razónSocial);
  calle$ = this.select((state) => state.calle);
  númeroLetra$ = this.select((state) => state.númeroLetra);
  ciudad$ = this.select((state) => state.ciudad);
  correoElectrónico$ = this.select((state) => state.correoElectrónico);
  fax$ = this.select((state) => state.fax);
  teléfono$ = this.select((state) => state.teléfono);
  nombredelRepresentante$ = this.select((state) => state.nombredelRepresentante);
  cargo$ = this.select((state) => state.cargo);
  teléfonos$ = this.select((state) => state.teléfonos);
  faxs$ = this.select((state) => state.faxs);
  correoElectrónicos$ = this.select((state) => state.correoElectrónicos);
  lugar$ = this.select((state) => state.lugar);
  observaciones$ = this.select((state) => state.observaciones);
  tableDataDatos$ = this.select((state) => state.tableDataDatos)

  constructor(protected override store: Tramite110218Store) {
    super(store);
  }
    
}


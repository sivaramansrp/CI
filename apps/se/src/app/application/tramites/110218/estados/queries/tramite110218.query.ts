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
  puertodeTransito$ = this.select((state) => state.puertodeTransito);
  nombredelaEmbarcacion$ = this.select((state) => state.nombredelaEmbarcacion);
  numerodeVuelo$ = this.select((state) => state.numerodeVuelo);
  nombre$ = this.select((state) => state.nombre);
  primerApellido$ = this.select((state) => state.primerApellido);
  numeroderegistroFiscal$ = this.select((state) => state.numeroderegistroFiscal);
  razonSocial$ = this.select((state) => state.razonSocial);
  calle$ = this.select((state) => state.calle);
  numeroLetra$ = this.select((state) => state.numeroLetra);
  ciudad$ = this.select((state) => state.ciudad);
  correoElectronico$ = this.select((state) => state.correoElectronico);
  fax$ = this.select((state) => state.fax);
  telefono$ = this.select((state) => state.telefono);
  nombredelRepresentante$ = this.select((state) => state.nombredelRepresentante);
  cargo$ = this.select((state) => state.cargo);
  telefonos$ = this.select((state) => state.telefonos);
  faxs$ = this.select((state) => state.faxs);
  correoElectronicos$ = this.select((state) => state.correoElectronicos);
  lugar$ = this.select((state) => state.lugar);
  observaciones$ = this.select((state) => state.observaciones);
  tableDataDatos$ = this.select((state) => state.tableDataDatos);
  unidaddeMedidadeComercializacion$ = this.select((state) => state.unidaddeMedidadeComercializacion);
  tipodeFactura$ = this.select((state) => state.tipodeFactura);
  complementoDelaDescripcion$ = this.select((state) => state.complementoDelaDescripcion);
  marca$ = this.select((state) => state.marca);
  valorMercancia$ = this.select((state) => state.valorMercancia);
  numerodeFactura$ = this.select((state) => state.numerodeFactura);
  constructor(protected override store: Tramite110218Store) {
    super(store);
  }
    
}


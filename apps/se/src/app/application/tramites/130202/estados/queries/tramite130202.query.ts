import {Tramite130202State, Tramite130202Store } from '../tramites/tramites130202.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite130202Query extends Query<Tramite130202State> {
  solicitud$ = this.select(state => state.solicitud);
  fraccion$ = this.select(state => state.fraccion);
  producto$ = this.select(state => state.producto);
  descripcion$ = this.select(state => state.descripcion);
  cantidad$ = this.select(state => state.cantidad);
  valorPartidaUSD$ = this.select(state => state.valorPartidaUSD);
  unidadMedida$ = this.select(state => state.unidadMedida);
  defaultSelect$ = this.select(state => state.defaultSelect);
  defaultProducto$ = this.select(state => state.defaultProducto);
  classification$ =this.select(state =>state.classification)
  regimen$=this.select(state=>state.regimen)

  mercanciaState$ = this.select(state => ({
    producto: state.producto,
    descripcion: state.descripcion,
    fraccion: state.fraccion,
    cantidad: state.cantidad,
    valorPartidaUSD: state.valorPartidaUSD,
    unidadMedida: state.unidadMedida,
    defaultProducto: state.defaultProducto,
  }));

  constructor(protected override store: Tramite130202Store) {
    super(store);
  }

}

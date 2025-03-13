import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Cancelaciones140201State, Cancelaciones140201Store } from './cancelaciones.store';

@Injectable({ providedIn: 'root' })
export class Cancelaciones140201Query extends Query<Cancelaciones140201State> {
  entidadFederativa$ = this.select((state) => state.entidadFederativa);
  colonia$ = this.select((state)=>state.colonia);
  localidad$ = this.select((state)=>state.localidad);
  municipio$ =this.select((state)=>state.municipio);
  paisInput$=this.select((state)=>state.paisInput);
  numeroInterior$=this.select((state)=>state.numeroInterior);
  codigoPostal$=this.select((state)=>state.codigoPostal);
  telefona$= this.select((state)=>state.telefona);
  nombre$=this.select((state)=>state.nombre);
  apellidoPaterno$ =this.select((state)=>state.apellidoPaterno);
  correoElectronico$ =this.select((state)=>state.correoElectronico);
  constructor(private Store: Cancelaciones140201Store) {
    
    super(Store);
  }
}
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite630104State } from '../tramites/tramite630104.store';
import { Tramite630104Store } from '../tramites/tramite630104.store';
 
@Injectable({ providedIn: 'root' })
export class Tramite630104Query extends Query<Tramite630104State> {
  esConsultaRep$ = this.select((state) => state.esConsultaRep);
  esExtranjero$ = this.select((state) => state.esExtranjero);
  nombre$ = this.select((state) => state.nombre);
  apellidoPaterno$ = this.select((state) => state.apellidoPaterno);
  apellidoMaterno$ = this.select((state) => state.apellidoMaterno);
  calle$ = this.select((state) => state.calle);
  numeroExterior$ = this.select((state) => state.numeroExterior);
  numeroInterior$ = this.select((state) => state.numeroInterior);
  pais$ = this.select((state) => state.pais);
  estadoLocalidad$ = this.select((state) => state.estadoLocalidad);
  correoElectronico$ = this.select((state) => state.correoElectronico);
  telefono$ = this.select((state) => state.telefono);
  codigoPostal$ = this.select((state) => state.codigoPostal);
  
  

  selectTramite630104$= this.select((state) => {
    return state;
  });
  constructor(private tramiteStore: Tramite630104Store) {
    super(tramiteStore);
  }
}
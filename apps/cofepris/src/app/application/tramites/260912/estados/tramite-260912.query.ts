import { Tramite260912Store, Tramites260912State } from './tramite-260912.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260912Query extends Query<Tramites260912State> {

  btonDeRadio$ = this.select((state) => state.btonDeRadio);
  justificación$ = this.select((state) => state.justificación);
  rfcDel$ = this.select((state) => state.rfcDel);
  denominacion$ = this.select((state) => state.denominacion);
  correo$ = this.select((state) => state.correo);
  códigoPostal$ = this.select((state) => state.códigoPostal);
  estado$ = this.select((state) => state.estado);
  municipioOAlcaldía$ = this.select((state) => state.municipioOAlcaldía);
  localidad$ = this.select((state) => state.localidad);
  colonias$ = this.select((state) => state.colonias);
  calle$ = this.select((state) => state.calle);
  lada$ = this.select((state) => state.lada);
  telefono$ = this.select((state) => state.telefono);
  avisoCheckbox$ = this.select((state) => state.avisoCheckbox);
  regimen$ = this.select((state) => state.regimen);
  aduanasEntradas$ = this.select((state) => state.aduanasEntradas);
  aifaCheckbox$ = this.select((state) => state.aifaCheckbox); 
  manifests$ = this.select((state) => state.manifests);
  acuerdoPublico$ = this.select((state) => state.acuerdoPublico);
  rfc$ = this.select((state) => state.rfc);
  
  selectTramite260912$= this.select((state) => {
    return state;
  });

  constructor(
    protected override store: Tramite260912Store) {
    super(store);
  }
}
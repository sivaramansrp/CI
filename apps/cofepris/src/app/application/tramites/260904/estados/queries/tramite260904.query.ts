import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite260904State } from '../tramites/tramite260904.store';
import { Tramite260904Store } from '../tramites/tramite260904.store';
 
@Injectable({ providedIn: 'root' })
export class Tramite260904Query extends Query<Tramite260904State> {
  btonDeRadio$ = this.select((state) => state.btonDeRadio);
  justificacion$ = this.select((state) => state.justificacion);
  rfcDel$ = this.select((state) => state.rfcDel);
  denominacion$ = this.select((state) => state.denominacion);
  correo$ = this.select((state) => state.correo);
  codigoPostal$ = this.select((state) => state.codigoPostal);
  estado$ = this.select((state) => state.estado);
  municipioOAlcaldia$ = this.select((state) => state.municipioOAlcaldia);
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

  selectTramite260904$= this.select((state) => {
    return state;
  });
  constructor(private tramiteStore: Tramite260904Store) {
    super(tramiteStore);
  }
}
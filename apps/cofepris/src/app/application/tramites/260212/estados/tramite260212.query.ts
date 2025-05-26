import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Tramite260212State, Tramite260212Store } from './tramite260212.store';





@Injectable({ providedIn: 'root' })
export class Tramite260212Query extends Query<Tramite260212State> {
  selectedEstado$ = this.select((state) => state.selectedEstado);
  selectedClave$ = this.select((state) => state.selectedClave);
  selectedDescripcion$ = this.select((state) => state.selectedDescripcion);
  selecteDespecificarClasificacion$ = this.select((state) => state.selecteDespecificarClasificacion);
  selectedBanco$ = this.select((state) => state.banco);
  selectedRfcDelResponsableSanitario$ = this.select((state) => state.setRfcDelResponsableSanitario);
  selectedDenominacionRazonSocial$ = this.select((state) => state.setDenominacionRazonSocial);
  selectedCorreoElectronico$ = this.select((state) => state.setCorreoElectronico);
  selectedMunicipio$ = this.select((state) => state.setMunicipio);
  selectedLocalidad$ =this.select((state) => state.setLocalidad);
  selectedColonia$ =this.select((state) => state.setColonia);
  selectedCalle$ =this.select((state) => state.setCalle);
  selectedLada$ =this.select((state) => state.setLada);
  SelectedTelefono$=this.select((state) => state.setTelefono);
  SelectedCodigoPostal$=this.select((state) => state.setCodigoPostal)
  selectedRegimen$=this.select((state) => state.setRegimen);
  selectedEntradas$=this.select((state) => state.setEntradas);
  // selecteDespecificarClasificacion$ = this.select((state) => state.setDespecificarClasificacion);
  selectedClaveDeReferncia$ = this.select((state)=>state.ClaveDeReferncia)
  selectedCadenaDeLaDependencia$ = this.select((state)=>state.CadenaDeLaDependencia)
  selectedLlaveDePago$=this.select((state)=>state.llaveDePago)
  selectedFechaDePago$=this.select((state)=>state.setFechaDePago)
  selectedImporteDePago$ = this.select((state)=>state.importeDePago)
constructor(private tramiteStore: Tramite260212Store) {
    super(tramiteStore);
  }
}

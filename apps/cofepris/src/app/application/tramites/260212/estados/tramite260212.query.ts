import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Tramite260212State, Tramite260212Store } from './tramite260212.store';





@Injectable({ providedIn: 'root' })
export class Tramite260212Query extends Query<Tramite260212State> {
  selectedEstado$ = this.select((state) => state.estado);
  selectedClave$ = this.select((state) => state.selectedClave);
  selectedDescripcion$ = this.select((state) => state.selectedDescripcion);
  selecteDespecificarClasificacion$ = this.select((state) => state.selecteDespecificarClasificacion);
  selectedBanco$ = this.select((state) => state.banco);
  selectedRfcDelResponsableSanitario$ = this.select((state) => state.rfcDelResponsableSanitario);
  selectedDenominacionRazonSocial$ = this.select((state) => state.denominacionRazonSocial);
  selectedCorreoElectronico$ = this.select((state) => state.correoElectronico);
  selectedMunicipio$ = this.select((state) => state.municipio);
  selectedLocalidad$ =this.select((state) => state.localidad);
  selectedColonia$ =this.select((state) => state.colonia);
  selectedCalle$ =this.select((state) => state.calle);
  selectedLada$ =this.select((state) => state.lada);
  SelectedTelefono$=this.select((state) => state.teléfono);
  SelectedCodigoPostal$=this.select((state) => state.codigoPostal)
  selectedRegimen$=this.select((state) => state.regimen);
  selectedEntradas$=this.select((state) => state.entradas);
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

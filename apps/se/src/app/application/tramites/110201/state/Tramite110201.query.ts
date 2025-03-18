import {
  Solicitud110201State,
  Tramite110201Store,
} from './Tramite110201.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite110201Query extends Query<Solicitud110201State> {
  constructor(protected override store: Tramite110201Store) {
    super(store);
  }

  selectSolicitud$ = this.select((state) => {
    return state;
  });

  selectTratado$ =this.select((state) => state.tratado);
  selectPais$ =this.select((state) => state.pais);
  selectFraccionArancelaria$ =this.select((state) => state.fraccionArancelaria);
  selectNumRegistro$ =this.select((state) => state.numRegistro);
  selectNomComercial$ = this.select((state) => state.nomComercial);
  selectFechInicioB$ = this.select((state) => state.fechInicioB);
  selectFechFinB$ = this.select((state) => state.fechFinB);
  selectArchivo$ = this.select((state) => state.archivo);
  selectObservaciones$ = this.select((state) => state.observaciones);
  selectPresica$ = this.select((state) => state.presica);
  selectPresenta$ = this.select((state) => state.presenta);
  selectIdioma$ = this.select((state) => state.idioma);
  selectEntidad$ = this.select((state) => state.entidad);
  selectRepresentacion$ = this.select((state) => state.representacion);
  selectNombre$ = this.select((state) => state.nombre);
  selectApellidoPrimer$ = this.select((state) => state.apellidoPrimer);
  selectApellidoSegundo$ = this.select((state) => state.apellidoSegundo);
  selectNumeroFiscal$ = this.select((state) => state.numeroFiscal);
  selectRazonSocial$ = this.select((state) => state.razonSocial);
  selectCiudad$ = this.select((state) => state.ciudad);
  selectCalle$ = this.select((state) => state.calle);
  selectNumeroLetra$ = this.select((state) => state.numeroLetra);
  selectLada$ = this.select((state) => state.lada);
  selectTelefono$ = this.select((state) => state.telefono);
  selectFax$ = this.select((state) => state.fax);
  selectCorreoElectronico$ = this.select((state) => state.correoElectronico);
  selectNacion$ = this.select((state) => state.nacion);
  selectTransporte$ = this.select((state) => state.transporte);
  selectUMC$ = this.select((state) => state.umc);
  selectUnidadMedida$ = this.select((state) => state.unidadMedida);
  selectTipoFactura$ = this.select((state) => state.tipoFactura);
}

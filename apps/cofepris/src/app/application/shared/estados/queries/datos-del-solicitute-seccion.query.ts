import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { DatosDelSolicituteSeccionStateStore } from '../stores/datos-del-solicitute-seccion.store';

import { DatosDelSolicituteSeccionState } from '../stores/datos-del-solicitute-seccion.store';


@Injectable({ providedIn: 'root' })
export class DatosDelSolicituteSeccionQuery extends Query<DatosDelSolicituteSeccionState> {
  representanteRfc$ = this.select('representanteRfc');
  representanteNombre$ = this.select('representanteNombre');
  apellidoPaterno$ = this.select('apellidoPaterno');
  apellidoMaterno$ = this.select('apellidoMaterno');
  establecimientoDenominacionRazonSocial$ = this.select('establecimientoDenominacionRazonSocial');
  establecimientoCorreoElectronico$ = this.select('establecimientoCorreoElectronico');
  establecimientoDomicilioCodigoPostal$ = this.select('establecimientoDomicilioCodigoPostal');
  establecimientoDomicilioEstado$ = this.select('establecimientoDomicilioEstado');
  establecimientoMunicipioYAlcaldia$ = this.select('establecimientoMunicipioYAlcaldia');
  establecimientoDomicilioLocalidad$ = this.select('establecimientoDomicilioLocalidad');
  establecimientoDomicilioColonia$ = this.select('establecimientoDomicilioColonia');
  establecimientoDomicilioCalle$ = this.select('establecimientoDomicilioCalle');
  establecimientoDomicilioLada$ = this.select('establecimientoDomicilioLada');
  establecimientoDomicilioTelefono$ = this.select('establecimientoDomicilioTelefono');
  rfcDelProfesionalResponsable$ =this.select('rfcDelProfesionalResponsable');
  nombreDelProfesionalResponsable$ =this.select('nombreDelProfesionalResponsable');
  informacionConfidencialRadio$ = this.select('informacionConfidencialRadio');
  propietarioData$ = this.select('propietarioData');
  constructor(protected override store: DatosDelSolicituteSeccionStateStore) {
    super(store);
  }
}
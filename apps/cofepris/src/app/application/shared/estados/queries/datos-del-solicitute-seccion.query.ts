import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { DatosDelSolicituteSeccionStateStore } from '../stores/datos-del-solicitute-seccion.store';

import { DatosDelSolicituteSeccionState } from '../stores/datos-del-solicitute-seccion.store';

/**
 * Clase `DatosDelSolicituteSeccionQuery`
 * 
 * Esta clase es una consulta (`Query`) que permite acceder al estado de la sección
 * de datos del solicitante. Utiliza Akita para gestionar el estado de la aplicación.
 * 
 * Proporciona observables para acceder a propiedades específicas del estado.
 */
@Injectable({ providedIn: 'root' })
export class DatosDelSolicituteSeccionQuery extends Query<DatosDelSolicituteSeccionState> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });


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
  establecimientoData$ = this.select('establecimientoData');
  ideGenerica$ = this.select('ideGenerica');
  observaciones$ = this.select('observaciones');
  establecimientoRFCResponsableSanitario$ = this.select('establecimientoRFCResponsableSanitario');
  establecimientoRazonSocial$ = this.select('establecimientoRazonSocial');
  establecimientoEstados$ = this.select('establecimientoEstados');
  descripcionMunicipio$ = this.select('descripcionMunicipio');
  localidad$ = this.select('localidad');
  colonias$ = this.select('colonias');
  calle$ = this.select('calle');
  lada$ = this.select('lada');
  telefono$ = this.select('telefono');
  scian$ = this.select('scian');
  establishomentoColonias$ = this.select('establishomentoColonias');
  noLicenciaSanitaria$ = this.select('noLicenciaSanitaria');  
  avisoCheckbox = this.select('avisoCheckbox');  
  licenciaSanitaria = this.select('licenciaSanitaria');  
  regimen = this.select('regimen');  
  aduanasEntradas = this.select('aduanasEntradas');  
  aifaCheckbox = this.select('aifaCheckbox');  
  descripcionScian = this.select('descripcionScian');

  constructor(protected override store: DatosDelSolicituteSeccionStateStore) {
    super(store);
  }
}
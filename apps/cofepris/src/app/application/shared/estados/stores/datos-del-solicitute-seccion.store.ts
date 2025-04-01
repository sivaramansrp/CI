import { Injectable } from '@angular/core';

import { DatosDeLaProductoModel, PropietarioModel } from '../../models/datos-de-la-solicitud.model';

import { Store, StoreConfig } from '@datorama/akita';


export interface DatosDelSolicituteSeccionState {
  representanteRfc: string;
  representanteNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  establecimientoDenominacionRazonSocial: string;
  establecimientoCorreoElectronico: string;
  establecimientoDomicilioCodigoPostal: string;
  establecimientoDomicilioEstado: string;
  establecimientoMunicipioYAlcaldia: string;
  establecimientoDomicilioLocalidad: string;
  establecimientoDomicilioColonia: string;
  establecimientoDomicilioCalle: string;
  establecimientoDomicilioLada: string;
  establecimientoDomicilioTelefono: string;
  rfcDelProfesionalResponsable: string;
  nombreDelProfesionalResponsable: string;
  informacionConfidencialRadio: string;
  propietarioData: PropietarioModel[];
  establecimientoData :DatosDeLaProductoModel[];
}

export function createInitialState(): DatosDelSolicituteSeccionState {
  return {
    representanteRfc: '',
    representanteNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    establecimientoDenominacionRazonSocial: '',
    establecimientoCorreoElectronico: '',
    establecimientoDomicilioCodigoPostal: '',
    establecimientoDomicilioEstado: '',
    establecimientoMunicipioYAlcaldia: '',
    establecimientoDomicilioLocalidad: '',
    establecimientoDomicilioColonia: '',
    establecimientoDomicilioCalle: '',
    establecimientoDomicilioLada: '',
    establecimientoDomicilioTelefono: '',
    rfcDelProfesionalResponsable: '',
    nombreDelProfesionalResponsable: '',
    informacionConfidencialRadio: '',
    propietarioData: [],
    establecimientoData: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'representante' })
export class DatosDelSolicituteSeccionStateStore extends Store<DatosDelSolicituteSeccionState> {
  constructor() {
    super(createInitialState());
  }
}
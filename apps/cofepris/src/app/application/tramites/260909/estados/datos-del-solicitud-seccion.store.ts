/**
 * @fileoverview Estado `DatosDelSolicituteSeccionStateStore`
 * Este archivo define el estado global para gestionar los datos relacionados con la solicitud,
 * incluyendo información del representante, establecimiento, y propietario.
 */

import { Injectable } from '@angular/core';


import { Store, StoreConfig } from '@datorama/akita';

/**
 * @interface DatosDelSolicituteSeccionState
 * Representa la estructura del estado global para los datos de la solicitud.
 */
export interface DatosDelSolicituteSeccionState {


  /**
   * Correo electrónico del establecimiento.
   */
  establecimientoCorreoElectronico: string;

  /**
   * Código postal del domicilio del establecimiento.
   */
  establecimientoDomicilioCodigoPostal: string;

  /**
   * Identificador genérico.
   */
  ideGenerica1: string;

  /**
   * Observaciones adicionales.
   */
  observaciones: string;

  /**
   * RFC del responsable sanitario del establecimiento.
   */
  establecimientoRFCResponsableSanitario: string;

  /**
   * Razón social del establecimiento.
   */
  establecimientoRazonSocial: string;

  /**
   * Estado del establecimiento.
   */
  establecimientoEstados: string;

  /**
   * Descripción del municipio.
   */
  descripcionMunicipio: string;

  /**
   * Localidad del establecimiento.
   */
  localidad: string;

  /**
   * Colonia del establecimiento.
   */
  colonias: string;

  /**
   * Calle del establecimiento.
   */
  calle: string;

  /**
   * Lada del establecimiento.
   */
  lada: string;

  /**
   * Teléfono del establecimiento.
   */
  telefono: string;

  /**
   * Código SCIAN del establecimiento.
   */
  scian: string;

  /**
   * Colonias del establecimiento.
   */
  establishomentoColonias: string;

  /**
   * Número de licencia sanitaria.
   */
  noLicenciaSanitaria: string;

  /**
   * Checkbox de aviso.
   */
  avisoCheckbox: string;

  /**
   * Licencia sanitaria.
   */
  licenciaSanitaria: string;

  /**
   * Régimen del establecimiento.
   */
  regimen: string;

  /**
   * Aduanas de entrada.
   */
  aduanasEntradas: string;

/**
 * * Descripción del SCIAN.
 */
  descripcionScian: string;
}

/**
 * @function createInitialState
 * Crea el estado inicial para `DatosDelSolicituteSeccionState`.
 * @returns {DatosDelSolicituteSeccionState} El estado inicial.
 */
export function createInitialState(): DatosDelSolicituteSeccionState {
  return {
    establecimientoCorreoElectronico: '',
    establecimientoDomicilioCodigoPostal: '',
     scian: '',
          descripcionScian: '',
     ideGenerica1: '',
          observaciones: '',
          establecimientoRFCResponsableSanitario: '',
          establecimientoRazonSocial:'',
          establishomentoColonias:'',
          establecimientoEstados :'',
          descripcionMunicipio: '',
          localidad :'',
          colonias:'',
          calle: '',
          lada: '',
          telefono:'',
       
          noLicenciaSanitaria: '',
          avisoCheckbox: '',
          licenciaSanitaria: '',
          regimen:'',
          aduanasEntradas: '',

  };
}

/**
 * @class DatosDelSolicituteSeccionStateStore
 * @description
 * Clase que representa el estado global para los datos de la solicitud.
 * Utiliza Akita para gestionar el estado de manera reactiva.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'datosDelSolicitud' })
export class DatosDelSolicituteSeccionStateStore extends Store<DatosDelSolicituteSeccionState> {
  /**
   * Constructor de la clase.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

}
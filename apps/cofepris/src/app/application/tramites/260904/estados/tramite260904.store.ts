/**
 * @fileoverview Este archivo define el estado y las operaciones relacionadas con el trámite 260904.
 * Proporciona un store para gestionar el estado de los datos del trámite, incluyendo métodos
 * para actualizar propiedades específicas.
 */
import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * @interface Tramite260904State
 * @description Define la estructura del estado para el trámite 260904.
 */
export interface Tramite260904State {
  /** Botón de radio seleccionado */
  btonDeRadio: string;
  /** Texto de justificación */
  justificacion: string;
  /** RFC del delegado */
  rfcDel: string;
  /** Denominación de la entidad */
  denominacion: string;
  /** Dirección de correo electrónico */
  correo: string;
  /** Código postal */
  codigoPostal: string;
  /** Catálogo del estado */
  estado: Catalogo | null;
  /** Municipio o alcaldía */
  municipioOAlcaldia: string;
  /** Localidad */
  localidad: string;
  /** Colonias */
  colonias: string;
  /** Calle */
  calle: string;
  /** Lada telefónica */
  lada: string;
  /** Teléfono */
  telefono: string;
  /** Checkbox de aviso */
  avisoCheckbox: string;
  /** Catálogo de régimen */
  regimen: Catalogo | null;
  /** Catálogo de aduanas de entrada */
  aduanasEntradas: Catalogo | null;
  /** Checkbox de AIFA */
  aifaCheckbox: string;
  /** Manifiestos */
  manifests: string;
  /** Acuerdo público */
  acuerdoPublico: string;
  /** RFC */
  rfc: string;
  /** Clave de referencia del trámite */
  claveDeReferencia: string;
  /** Cadena de pago de la dependencia */
  cadenaPagoDependencia: string;
  /** Clave del trámite */
  clave: string;
  /** Llave de pago */
  llaveDePago: string;
  /** Fecha de pago */
  fecPago: string;
  /** Importe del pago */
  impPago: string;

}

/**
 * @function createInitialState
 * @description Crea el estado inicial para el trámite 260904.
 * @returns {Tramite260904State} Estado inicial con valores predeterminados.
 */
export function createInitialState(): Tramite260904State {
  return {
    btonDeRadio: '',
    justificacion: '',
    rfcDel: '',
    denominacion: '',
    correo: '',
    codigoPostal: '',
    estado: null,
    municipioOAlcaldia: '',
    localidad: '',
    colonias: '',
    calle: '',
    lada: '',
    telefono: '',
    avisoCheckbox: '',
    regimen: null,
    aduanasEntradas: null,
    aifaCheckbox: '',
    manifests: '',
    acuerdoPublico: '',
    rfc: '',
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    clave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
  };
}

/**
 * @class Tramite260904Store
 * @description Clase que extiende la funcionalidad de Akita Store para gestionar el estado
 * del trámite 260904. Proporciona métodos para actualizar propiedades específicas del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260904', resettable: true })
export class Tramite260904Store extends Store<Tramite260904State> {
  /**
   * @constructor
   * @description Inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }


  /**
   * Actualiza el estado del trámite 630303 con los valores proporcionados.
   * 
   * @param valores - Valores parciales para actualizar el estado.
   */
  setTramite260904State(valores: Partial<Tramite260904State>): void {
    this.update((state => ({
      ...state,
      ...valores,
    })));
  }

}
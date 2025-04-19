/**
 * @module Agregar270301Store
 * @description Módulo que define el estado y las acciones para la solicitud 270301.
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { CatalogoResponse } from '@libs/shared/data-access-user/src';

/**
 * @interface solicitud270301State
 * @description Interfaz que define la estructura del estado para la solicitud 270301.
 */

/**
 * Interfaz que define el estado de la solicitud 270301.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface solicitud270301State {
  /** Certificación asociada a la solicitud. */
  tipoDeOperacion: string;

  /** Identificación del medio de transporte. */
  tipoDeMovimiento: string;

   /** Número de contenedor para el transporte de la mercancía. */
  motivo: string;

  /** Fecha de embarque de la mercancía. */
  pais: string;

  /** Número de flejes de seguridad. */
  ciudad: string;

  /** Datos del certificado asociado a la solicitud. */
  medioTransporte: string;

  /** Fracción arancelaria correspondiente a la mercancía. */
  emprsaTransportista: string;

  /** Fecha de caducidad de la mercancía o certificado. */
  destinofinal: string;

  /** Nombre o identificación del animal o producto. */
  periodoEstancia: string;

  /** Raza del animal, en caso de aplicar. */
  aduanaEntrada: string;

  
}

/**
 * @function createInitialState
 * @description Función que crea el estado inicial para la solicitud 270301.
 * @returns {solicitud270301State} El estado inicial.
 */
export function createInitialState(): solicitud270301State {
  return {
  
   /** Certificación asociada a la solicitud. */
   tipoDeOperacion: '',

    /** Identificación del medio de transporte. */
    tipoDeMovimiento: '',
  
   /** Número de contenedor para el transporte de la mercancía. */
    motivo: '',
  
    /** Fecha de embarque de la mercancía. */
    pais: '',
  
    /** Número de flejes de seguridad. */
    ciudad: '',
  
    /** Datos del certificado asociado a la solicitud. */
    medioTransporte: '',
  
    /** Fracción arancelaria correspondiente a la mercancía. */
    emprsaTransportista: '',
  
    /** Fecha de caducidad de la mercancía o certificado. */
    destinofinal: '',
  
    /** Nombre o identificación del animal o producto. */
    periodoEstancia: '',
  
    /** Raza del animal, en caso de aplicar. */
    aduanaEntrada: '',
  };
  
}

/**
 * @class Agregar270301Store
 * @extends {Store<solicitud270301State>}
 * @description Clase que maneja el estado y las acciones para la solicitud 270301.
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'agregar270301', resettable: true })
export class Agregar270301Store extends Store<solicitud270301State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * @method settipoDeOperacion
   * @description Establece el valor de 'certificada'.
   * @param {string} tipoDeOperacion - El valor de 'certificada'.
   */
  public settipoDeOperacion(tipoDeOperacion: string) {
    this.update((state) => ({
      ...state,
      tipoDeOperacion,
    }));
  }

  /**
   * @method setidentificationDelTransporte
   * @description Establece el valor de 'identificationDelTransporte'.
   * @param {string} identificationDelTransporte - El valor de 'identificationDelTransporte'.
   */
  public settipoDeMovimiento(tipoDeMovimiento: string) {
    this.update((state) => ({
      ...state,
      tipoDeMovimiento,
    }));
  }

  
/**
   * @method setnumerodeContenedor
   * @description Establece el valor de 'numerodeContenedor'.
   * @param {string} numerodeContenedor - El valor de 'numerodeContenedor'.
   */
  public setmotivo(motivo: string) {
    this.update((state) => ({
      ...state,
      
      motivo,
    }));
  }

  /**
   * @method setfetchdeEmbarque
   * @description Establece el valor de 'fechdeEmbarque'.
   * @param {string} fechdeEmbarque - El valor de 'fechdeEmbarque'.
   */
  public setpais(pais: string) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  /**
   * @method setnumerodeFlejes
   * @description Establece el valor de 'numerodeFlejes'.
   * @param {string} numerodeFlejes - El valor de 'numerodeFlejes'.
   */
  public setciudad(ciudad: string) {
    this.update((state) => ({
      ...state,
      ciudad,
    }));
  }

  /**
   * @method setdatoscertificado
   * @description Establece el valor de 'datoscertificado'.
   * @param {string} datoscertificado - El valor de 'datoscertificado'.
   */
  public setmedioTransporte(medioTransporte: string) {
    this.update((state) => ({
      ...state,
      medioTransporte,
    }));
  }

  /**
   * @method setfraccionArancelaria
   * @description Establece el valor de 'fraccionArancelaria'.
   * @param {string} fraccionArancelaria - El valor de 'fraccionArancelaria'.
   */
  public setemprsaTransportista(emprsaTransportista: string) {
    this.update((state) => ({
      ...state,
      emprsaTransportista,
    }));
  }

  /**
   * @method setfechaCaducidad
   * @description Establece el valor de 'fechaCaducidad'.
   * @param {string} fechaCaducidad - El valor de 'fechaCaducidad'.
   */
  public setdestinofinal(destinofinal: string) {
    this.update((state) => ({
      ...state,
      destinofinal,
    }));
  }

  /**
   * @method setnombreIdentificacion
   * @description Establece el valor de 'nombreIdentificacion'.
   * @param {string} nombreIdentificacion - El valor de 'nombreIdentificacion'.
   */
  public setperiodoEstancia(periodoEstancia: string) {
    this.update((state) => ({
      ...state,
      periodoEstancia,
    }));
  }

  /**
   * @method setraza
   * @description Establece el valor de 'raza'.
   * @param {string} raza - El valor de 'raza'.
   */
  public setaduanaEntrada(aduanaEntrada: string) {
    this.update((state) => ({
      ...state,
      aduanaEntrada,
    }));
  }
}
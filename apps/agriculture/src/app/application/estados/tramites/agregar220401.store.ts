/**
 * @module Agregar220401Store
 * @description Módulo que define el estado y las acciones para la solicitud 220401.
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { catalogoResponse } from '@libs/shared/data-access-user/src';

/**
 * @interface solicitud220401State
 * @description Interfaz que define la estructura del estado para la solicitud 220401.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface solicitud220401State {
  certificada: string;
  identificationDelTransporte: string;
  selectedEstado: catalogoResponse | null;
  numerodeContenedor: string;
  fetchdeEmbarque: string;
  numerodeFlejes: string;
  datoscertificado: string;
  fraccionArancelaria: string;
  fechaCaducidad: string;
  nombreIdentificacion: string;
  raza: string;
  edadAnimal: string;
  color: string;
  numeroAutorizacionCITES: string;
  aduana: string;
  osia: string;
  sexo: string;
  otro: string;
  puntoIngreso: string;
  nombreEstablecimientoCheck: string;
  numeroAutorizacionCheck: string;
  tipoActividadCheck: string;
  otroCheck: string;
  fechaArribo: string;
  Justificacion: string;
  exentoDePago: string;
  llaveDePago: string;
  fechaPago: string;
}

/**
 * @function createInitialState
 * @description Función que crea el estado inicial para la solicitud 220401.
 * @returns {solicitud220401State} El estado inicial.
 */
export function createInitialState(): solicitud220401State {
  return {
    certificada: '',
    identificationDelTransporte: '',
    selectedEstado: null,
    numerodeContenedor: '',
    fetchdeEmbarque: '',
    numerodeFlejes: '',
    datoscertificado: '',
    fraccionArancelaria: '',
    fechaCaducidad: '',
    nombreIdentificacion: '',
    raza: '',
    edadAnimal: '',
    color: '',
    numeroAutorizacionCITES: '',
    aduana: '',
    osia: '',
    sexo: '',
    otro: '',
    puntoIngreso: '',
    nombreEstablecimientoCheck: '',
    numeroAutorizacionCheck: '',
    tipoActividadCheck: '',
    otroCheck: '',
    fechaArribo: '',
    Justificacion: '',
    exentoDePago: '',
    llaveDePago: '',
    fechaPago: ''
  };
}

/**
 * @class Agregar220401Store
 * @extends {Store<solicitud220401State>}
 * @description Clase que maneja el estado y las acciones para la solicitud 220401.
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'agregar220401', resettable: true })
export class Agregar220401Store extends Store<solicitud220401State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setCertificada
   * @description Establece el valor de 'certificada'.
   * @param {string} certificada - El valor de 'certificada'.
   */
  public setCertificada(certificada: string) {
    this.update((state) => ({
      ...state,
      certificada,
    }));
  }

  /**
   * @method setidentificationDelTransporte
   * @description Establece el valor de 'identificationDelTransporte'.
   * @param {string} identificationDelTransporte - El valor de 'identificationDelTransporte'.
   */
  public setidentificationDelTransporte(identificationDelTransporte: string) {
    this.update((state) => ({
      ...state,
      identificationDelTransporte,
    }));
  }

  /**
   * @method setJustification
   * @description Establece el valor de 'selectedEstado'.
   * @param {catalogoResponse} selectedEstado - El valor de 'selectedEstado'.
   */
  public setJustification(selectedEstado: catalogoResponse) {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }

  /**
   * @method setnumerodeContenedor
   * @description Establece el valor de 'numerodeContenedor'.
   * @param {string} numerodeContenedor - El valor de 'numerodeContenedor'.
   */
  public setnumerodeContenedor(numerodeContenedor: string) {
    this.update((state) => ({
      ...state,
      
      numerodeContenedor,
    }));
  }

  /**
   * @method setfetchdeEmbarque
   * @description Establece el valor de 'fetchdeEmbarque'.
   * @param {string} fetchdeEmbarque - El valor de 'fetchdeEmbarque'.
   */
  public setfetchdeEmbarque(fetchdeEmbarque: string) {
    this.update((state) => ({
      ...state,
      fetchdeEmbarque,
    }));
  }

  /**
   * @method setnumerodeFlejes
   * @description Establece el valor de 'numerodeFlejes'.
   * @param {string} numerodeFlejes - El valor de 'numerodeFlejes'.
   */
  public setnumerodeFlejes(numerodeFlejes: string) {
    this.update((state) => ({
      ...state,
      numerodeFlejes,
    }));
  }

  /**
   * @method setdatoscertificado
   * @description Establece el valor de 'datoscertificado'.
   * @param {string} datoscertificado - El valor de 'datoscertificado'.
   */
  public setdatoscertificado(datoscertificado: string) {
    this.update((state) => ({
      ...state,
      datoscertificado,
    }));
  }

  /**
   * @method setfraccionArancelaria
   * @description Establece el valor de 'fraccionArancelaria'.
   * @param {string} fraccionArancelaria - El valor de 'fraccionArancelaria'.
   */
  public setfraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * @method setfechaCaducidad
   * @description Establece el valor de 'fechaCaducidad'.
   * @param {string} fechaCaducidad - El valor de 'fechaCaducidad'.
   */
  public setfechaCaducidad(fechaCaducidad: string) {
    this.update((state) => ({
      ...state,
      fechaCaducidad,
    }));
  }

  /**
   * @method setnombreIdentificacion
   * @description Establece el valor de 'nombreIdentificacion'.
   * @param {string} nombreIdentificacion - El valor de 'nombreIdentificacion'.
   */
  public setnombreIdentificacion(nombreIdentificacion: string) {
    this.update((state) => ({
      ...state,
      nombreIdentificacion,
    }));
  }

  /**
   * @method setraza
   * @description Establece el valor de 'raza'.
   * @param {string} raza - El valor de 'raza'.
   */
  public setraza(raza: string) {
    this.update((state) => ({
      ...state,
      raza,
    }));
  }

  /**
   * @method setedadAnimal
   * @description Establece el valor de 'edadAnimal'.
   * @param {string} edadAnimal - El valor de 'edadAnimal'.
   */
  public setedadAnimal(edadAnimal: string) {
    this.update((state) => ({
      ...state,
      edadAnimal,
    }));
  }

  /**
   * @method setcolor
   * @description Establece el valor de 'color'.
   * @param {string} color - El valor de 'color'.
   */
  public setcolor(color: string) {
    this.update((state) => ({
      ...state,
      color,
    }));
  }

  /**
   * @method setnumeroAutorizacionCITES
   * @description Establece el valor de 'numeroAutorizacionCITES'.
   * @param {string} numeroAutorizacionCITES - El valor de 'numeroAutorizacionCITES'.
   */
  public setnumeroAutorizacionCITES(numeroAutorizacionCITES: string) {
    this.update((state) => ({
      ...state,
      numeroAutorizacionCITES,
    }));
  }

  /**
   * @method setaduana
   * @description Establece el valor de 'aduana'.
   * @param {string} aduana - El valor de 'aduana'.
   */
  public setaduana(aduana: string) {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /**
   * @method setosia
   * @description Establece el valor de 'osia'.
   * @param {string} osia - El valor de 'osia'.
   */
  public setosia(osia: string) {
    this.update((state) => ({
      ...state,
      osia,
    }));
  }

  /**
   * @method setsexo
   * @description Establece el valor de 'sexo'.
   * @param {string} sexo - El valor de 'sexo'.
   */
  public setsexo(sexo: string) {
    this.update((state) => ({
      ...state,
      sexo,
    }));
  }

  /**
   * @method setotro
   * @description Establece el valor de 'otro'.
   * @param {string} otro - El valor de 'otro'.
   */
  public setotro(otro: string) {
    this.update((state) => ({
      ...state,
      otro,
    }));
  }

  /**
   * @method setpuntoIngreso
   * @description Establece el valor de 'puntoIngreso'.
   * @param {string} puntoIngreso - El valor de 'puntoIngreso'.
   */
  public setpuntoIngreso(puntoIngreso: string) {
    this.update((state) => ({
      ...state,
      puntoIngreso,
    }));
  }

  /**
   * @method setnombreEstablecimientoCheck
   * @description Establece el valor de 'nombreEstablecimientoCheck'.
   * @param {string} nombreEstablecimientoCheck - El valor de 'nombreEstablecimientoCheck'.
   */
  public setnombreEstablecimientoCheck(nombreEstablecimientoCheck: string) {
    this.update((state) => ({
      ...state,
      nombreEstablecimientoCheck,
    }));
  }

  /**
   * @method setnumeroAutorizacionCheck
   * @description Establece el valor de 'numeroAutorizacionCheck'.
   * @param {string} numeroAutorizacionCheck - El valor de 'numeroAutorizacionCheck'.
   */
  public setnumeroAutorizacionCheck(numeroAutorizacionCheck: string) {
    this.update((state) => ({
      ...state,
      numeroAutorizacionCheck,
    }));
  }

  /**
   * @method settipoActividadCheck
   * @description Establece el valor de 'tipoActividadCheck'.
   * @param {string} tipoActividadCheck - El valor de 'tipoActividadCheck'.
   */
  public settipoActividadCheck(tipoActividadCheck: string) {
    this.update((state) => ({
      ...state,
      tipoActividadCheck,
    }));
  }

  /**
   * @method setotroCheck
   * @description Establece el valor de 'otroCheck'.
   * @param {string} otroCheck - El valor de 'otroCheck'.
   */
  public setotroCheck(otroCheck: string) {
    this.update((state) => ({
      ...state,
      otroCheck,
    }));
  }

  /**
   * @method setfechaArribo
   * @description Establece el valor de 'fechaArribo'.
   * @param {string} fechaArribo - El valor de 'fechaArribo'.
   */
  public setfechaArribo(fechaArribo: string) {
    this.update((state) => ({
      ...state,
      fechaArribo,
    }));
  }

  /**
   * @method setJustificacion
   * @description Establece el valor de 'Justificacion'.
   * @param {string} Justificacion - El valor de 'Justificacion'.
   */
  public setJustificacion(Justificacion: string) {
    this.update((state) => ({
      ...state,
      Justificacion,
    }));
  }

  /**
   * @method setexentoDePago
   * @description Establece el valor de 'exentoDePago'.
   * @param {string} exentoDePago - El valor de 'exentoDePago'.
   */
  public setexentoDePago(exentoDePago: string) {
    this.update((state) => ({
      ...state,
      exentoDePago,
    }));
  }

  /**
   * @method setllaveDePago
   * @description Establece el valor de 'llaveDePago'.
   * @param {string} llaveDePago - El valor de 'llaveDePago'.
   */
  public setllaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * @method setfechaPago
   * @description Establece el valor de 'fechaPago'.
   * @param {string} fechaPago - El valor de 'fechaPago'.
   */
  public setfechaPago(fechaPago: string) {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }
}
/**
 * @fileoverview
 * El `Tramite80206Store` es una clase de Angular que utiliza Akita para gestionar el estado relacionado con la ampliación de servicios.
 * Proporciona métodos para actualizar y gestionar datos como información de registro, aduanas, sectores, empresas y otros campos relacionados.
 * 
 * @module Tramite80206Store
 * @description
 * Este archivo define la estructura del estado inicial, las interfaces necesarias y los métodos para actualizar el estado de la ampliación de servicios.
 */

import { Arancelaria, ArancelariaImportacion, Sector, Servicios } from '../models/datos-info.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define la estructura del estado de ampliación de servicios.
 * @interface AmpliacionServiciosState
 */
export interface AmpliacionServiciosState {
    /** Identificador de la solicitud, puede ser nulo si aún no se ha creado. */
  idSolicitud: number | null;
  /**
   * Información del registro.
   * @property {Servicios} infoRegistro
   */
  infoRegistro: Servicios;

  /**
   * Lista de datos IMMEX.
   * @property {Arancelaria[]} datosImmex
   */
  datosImmex: Arancelaria[];

  /**
   * Lista de datos de importación.
   * @property {ArancelariaImportacion[]} datosImportacion
   */
  datosImportacion: ArancelariaImportacion[];

  /**
   * Lista de datos del sector.
   * @property {Sector[]} datosSector
   */
  datosSector: Sector[];

  /**
   * Lista de datos generales.
   * @property {Arancelaria[]} datos
   */
  datos: Arancelaria[];

  /**
   * Aduana de ingreso seleccionada.
   * @property {Catalogo} aduanaDeIngresoSelecion
   */
  aduanaDeIngresoSelecion: string;

  /**
   * Sector seleccionado.
   * @property {Catalogo} sectorSelecion
   */
  sectorSelecion: string;

  /**
   * Validez del formulario.
   * @property {{ [key: string]: boolean }} formaValida
   */
  formaValida: { [key: string]: boolean };

  /**
   * Fracción seleccionada.
   * @property {string} fraccion
   */
  fraccion: string;

  /**
   * Valor de importación.
   * @property {string} importacion
   */
  importacion: string;

  /**
   * Fracción arancelaria seleccionada.
   * @property {string} fraccionArancelaria
   */
  fraccionArancelaria: string;

  /**
   * Cantidad seleccionada.
   * @property {string} cantidad
   */
  cantidad: string;

  /**
   * Valor seleccionado.
   * @property {string} valor
   */
  valor: string;

  /**
   * Modalidad seleccionada.
   * @property {string} seleccionaLaModalidad
   */
  seleccionaLaModalidad: string;

  /**
   * Regla seleccionada.
   * @property {string} seleccionarRegla
   */
  seleccionarRegla: string;

  /**
   * Sector seleccionado.
   * @property {string} sector
   */
  sector: string;

  /**
   * Lista de sectores desplegables.
   * @property {Catalogo[]} sectorDesplegable
   */
  sectorDesplegable: Catalogo[];

  /**
   * Lista de reglas seleccionadas.
   * @property {Catalogo[]} reglaSeleccionada
   */
  reglaSeleccionada: Catalogo[];

  /**
   * Indica si una regla está seleccionada.
   * @property {boolean} isSelectedRegla
   */
  isSelectedRegla: boolean;
}

/**
 * Estado inicial de la ampliación de servicios.
 * @constant {AmpliacionServiciosState} INITIAL_AMPLIACION_SERVICIOS_STATE
 */
export const INITIAL_AMPLIACION_SERVICIOS_STATE: AmpliacionServiciosState = {
  idSolicitud: 202792606,
  infoRegistro: {
    seleccionaLaModalidad: '',
    folio: '',
    ano: '',
  },
  seleccionaLaModalidad: 'Ampliación 3RS',
  seleccionarRegla: '',
  sector: '',
  sectorDesplegable: [],
  reglaSeleccionada: [],
  isSelectedRegla: false,
  datosImmex: [],
  datosImportacion: [],
  datosSector: [],
  datos: [],
  aduanaDeIngresoSelecion: "",
  sectorSelecion: "",
  formaValida: {
    seleccionarRegla: true,
  },
  fraccion: '',
  importacion: '',
  valor: '',
  cantidad: '',
  fraccionArancelaria: '',
};

/**
 * Clase que representa el store de ampliación de servicios.
 * @export
 * @class Tramite80206Store
 * @extends {Store<AmpliacionServiciosState>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-80206', resettable: true })
export class Tramite80206Store extends Store<AmpliacionServiciosState> {
  /**
   * Constructor del store.
   * @constructor
   */
  constructor() {
    super(INITIAL_AMPLIACION_SERVICIOS_STATE);
  }

  /**
   * Actualiza la información de registro en el estado.
   * @method setInfoRegistro
   * @param {Servicios} infoRegistro - Información de registro.
   */
  setInfoRegistro(infoRegistro: Servicios): void {
    this.update((state) => ({
      ...state,
      infoRegistro,
    }));
  }

  /**
   * Actualiza la lista de aduanas de ingreso en el estado.
   * @method setAduanaDeIngreso
   * @param {Catalogo[]} aduanaDeIngreso - Lista de aduanas de ingreso.
   */
  setAduanaDeIngreso(aduanaDeIngreso: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngreso,
    }));
  }

  /**
   * Actualiza los datos IMMEX en el estado.
   * @method setDatosImmex
   * @param {Arancelaria[]} datosImmex - Datos IMMEX.
   */
  setDatosImmex(datosImmex: Arancelaria[]): void {
    this.update((state) => ({
      ...state,
      datosImmex,
    }));
  }

  /**
   * Actualiza los datos de importación en el estado.
   * @method setDatosImportacion
   * @param {ArancelariaImportacion[]} datosImportacion - Datos de importación.
   */
  setDatosImportacion(datosImportacion: ArancelariaImportacion[]): void {
    this.update((state) => ({
      ...state,
      datosImportacion,
    }));
  }

  /**
   * Actualiza los datos del sector en el estado.
   * @method setDatosSector
   * @param {Sector[]} datosSector - Datos del sector.
   */
  setDatosSector(datosSector: Sector[]): void {
    this.update((state) => ({
      ...state,
      datosSector,
    }));
  }

  /**
   * Actualiza los datos generales en el estado.
   * @method setDatos
   * @param {Arancelaria[]} datos - Datos generales.
   */
  setDatos(datos: Arancelaria[]): void {
    this.update((state) => ({
      ...state,
      datos,
    }));
  }

  /**
   * Actualiza la aduana de ingreso seleccionada en el estado.
   * @method setAduanaDeIngresoSeleccion
   * @param {Catalogo} aduanaDeIngresoSelecion - Aduana seleccionada.
   */
  setAduanaDeIngresoSeleccion(aduanaDeIngresoSelecion: string): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngresoSelecion,
    }));
  }

  /**
   * Actualiza el sector seleccionado en el estado.
   * @method setSectorSeleccion
   * @param {Catalogo} sectorSelecion - Sector seleccionado.
   */
  setSectorSeleccion(sectorSelecion: string): void {
    this.update((state) => ({
      ...state ,
      sectorSelecion,
    }));
  }

  /**
   * Actualiza la validez del formulario en el estado.
   * @method setFormValida
   * @param {{ [key: string]: boolean }} formaValida - Estado de validez del formulario.
   */
  setFormValida(formaValida: { [key: string]: boolean }): void {
    this.update((state) => {
      const IS_VALID = { ...state.formaValida, ...formaValida };
      return {
        ...state,
        formaValida: IS_VALID,
      };
    });
  }

  /**
   * Actualiza la fracción en el estado.
   * @method setRfcEmpresa
   * @param {string} fraccion - Fracción.
   */
  setRfcEmpresa(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * Actualiza el valor de importación en el estado.
   * @method setImportacion
   * @param {string} importacion - Valor de importación.
   */
  setImportacion(importacion: string): void {
    this.update((state) => ({
      ...state,
      importacion,
    }));
  }

  /**
   * Actualiza el valor en el estado.
   * @method setValor
   * @param {string} valor - Valor.
   */
  setValor(valor: string): void {
    this.update((state) => ({
      ...state,
      valor,
    }));
  }

  /**
   * Actualiza la cantidad en el estado.
   * @method setCantidad
   * @param {string} cantidad - Cantidad.
   */
  setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  /**
   * Actualiza la fracción arancelaria en el estado.
   * @method setFraccionArancelaria
   * @param {string} fraccionArancelaria - Fracción arancelaria.
   */
  setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Actualiza la modalidad seleccionada en el estado.
   * @method setSeleccionaLaModalidad
   * @param {string} seleccionaLaModalidad - Modalidad seleccionada.
   */
  setSeleccionaLaModalidad(seleccionaLaModalidad: string): void {
    this.update((state) => ({
      ...state,
      seleccionaLaModalidad,
    }));
  }

  /**
   * Actualiza la regla seleccionada en el estado.
   * @method setSeleccionarRegla
   * @param {string} seleccionarRegla - Regla seleccionada.
   */
  setSeleccionarRegla(seleccionarRegla: string): void {
    this.update((state) => ({
      ...state,
      seleccionarRegla,
    }));
  }

  /**
   * Actualiza el sector en el estado.
   * @method setSector
   * @param {string} sector - Sector.
   */
  setSector(sector: string): void {
    this.update((state) => ({
      ...state,
      sector,
    }));
  }

  /**
   * Actualiza el sector desplegable en el estado.
   * @method setSectorDesplegable
   * @param {Catalogo[]} sectorDesplegable - Lista de sectores desplegables.
   */
  setSectorDesplegable(sectorDesplegable: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      sectorDesplegable,
    }));
  }

  /**
   * Actualiza la regla seleccionada en el estado.
   * @method setReglaSeleccionada
   * @param {Catalogo[]} reglaSeleccionada - Lista de reglas seleccionadas.
   */
  setReglaSeleccionada(reglaSeleccionada: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      reglaSeleccionada,
    }));
  }

  /**
   * Actualiza el estado de selección de regla.
   * @method setIsSelectedRegla
   * @param {boolean} isSelectedRegla - Indica si una regla está seleccionada.
   */
  setIsSelectedRegla(isSelectedRegla: boolean): void {
    this.update((state) => ({
      ...state,
      isSelectedRegla,
    }));
  }
}
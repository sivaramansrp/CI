import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de la Solicitud260605.
 */
export interface Solicitud260605State {
  /**
   * Número de permiso de importación.
   * 
   * @type {string}
   * @memberof Solicitud260605State
   */
  numeroDePermiso: string;

  /**
   * Costumbres actuales.
   * 
   * @type {string}
   * @memberof Solicitud260605State
   */
  costumbresActuales: string;

  /**
   * RFC del solicitante.
   * 
   * @type {string}
   * @memberof Solicitud260605State
   */
  rfc: string;

  /**
   * Nombre del solicitante.
   * 
   * @type {string}
   * @memberof Solicitud260605State
   */
  nombre: string;

  /**
   * Apellido paterno del solicitante.
   * 
   * @type {string}
   * @memberof Solicitud260605State
   */
  apellidoPaterno: string;

  /**
   * Apellido materno del solicitante.
   * 
   * @type {string}
   * @memberof Solicitud260605State
   */
  apellidoMaterno: string;

  /**
   * Aduanas disponibles.
   * 
   * @type {[]}
   * @memberof Solicitud260605State
   */
  aduanasDisponibles: [];

  /**
   * Aduanas seleccionadas.
   * 
   * @type {[]}
   * @memberof Solicitud260605State
   */
  aduanasSeleccionadas: [];

  /**
   * Cantidad solicitada.
   * 
   * @type {string}
   * @memberof Solicitud260605State
   */
  cantidadSolicitada: string;
}

/**
 * Función para crear el estado inicial de la Solicitud260605.
 * @returns {Solicitud260605State} El estado inicial.
 */
export function createInitialState(): Solicitud260605State {
  return {
    numeroDePermiso: '',
    costumbresActuales: '',
    rfc: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    aduanasDisponibles: [],
    aduanasSeleccionadas: [],
    cantidadSolicitada: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260605', resettable: true })
export class Tramite260605Store extends Store<Solicitud260605State> {
  /**
   * Crea una instancia de Tramite260605Store.
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el numeroDPmiso en el estado.
   * @param {string} numeroDPmiso - El numeroDPmiso a establecer.
   */
  public setNumeroDPmiso(numeroDePermiso: string):void {
    this.update((state) => ({
      ...state,
      numeroDePermiso,
    }));
  }

  /**
   * Establece el cstumbresAtuales en el estado.
   * @param {string} cstumbresAtuales - El cstumbresAtuales a establecer.
   */
  public setCstumbresAtuales(cstumbresAtuales: string):void {
    this.update((state) => ({
      ...state,
      cstumbresAtuales,
    }));
  }

  /**
   * Establece el rfc en el estado.
   * @param {string} rfc - El rfc a establecer.
   */
  public setRfc(rfc: string):void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece el nombre en el estado.
   * @param {string} nombre - El nombre a establecer.
   */
  public setNombre(nombre: string):void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  /**
   * Establece el apellidoPaterno en el estado.
   * @param {string} apellidoPaterno - El apellidoPaterno a establecer.
   */
  public setApellidoPaterno(apellidoPaterno: string):void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  /**
   * Establece el apellidoMaterno en el estado.
   * @param {string} apellidoMaterno - El apellidoMaterno a establecer.
   */
  public setApellidoMaterno(apellidoMaterno: string):void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  /**
   * Establece las aduanasDisponibles en el estado.
   * @param {[]} aduanasDisponibles - Las aduanasDisponibles a establecer.
   */
  public setAduanasDisponibles(aduanasDisponibles: []):void {
    this.update((state) => ({
      ...state,
      aduanasDisponibles,
    }));
  }

  /**
   * Establece las aduanasSeleccionadas en el estado.
   * @param {[]} aduanasSeleccionadas - Las aduanasSeleccionadas a establecer.
   */
  public setAduanasSeleccionadas(aduanasSeleccionadas: []):void {
    this.update((state) => ({
      ...state,
      aduanasSeleccionadas,
    }));
  }

  /**
   * Establece la cantidadSolicitada en el estado.
   * @param {string} cantidadSolicitada - La cantidadSolicitada a establecer.
   */
  public setCantidadSolicitada(cantidadSolicitada: string):void {
    this.update((state) => ({
      ...state,
      cantidadSolicitada,
    }));
  }
 /**
   * Establece la cantidadSolicitada en el estado.
   * @param {string} costumbresActuales - La cantidadSolicitada a establecer.
   */
  public setCostumbresActuales(costumbresActuales: string):void {
    this.update((state) => ({
      ...state,
      costumbresActuales,
    }));
  }
  /**
   * Restablece el estado al estado inicial.
   */
  public limpiarSolicitud():void {
    this.reset();
  }
}
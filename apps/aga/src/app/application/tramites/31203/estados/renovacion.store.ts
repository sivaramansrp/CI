import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface
 * @name UnicoState
 * @description
 * Representa el estado de la solicitud en el sistema. Contiene todos los campos necesarios para gestionar los datos relacionados con la solicitud.
 */
export interface UnicoState {
  /**
   * Función para manejar la modalidad.
   * @param modalidad Modalidad a manejar.
   * @returns {unknown} Retorna un valor desconocido.
   */
  modalidad(modalidad: unknown): unknown;

  /**
   * Modalidad de la solicitud.
   * @type {string}
   */
  mapTipoTramite: string;

  /**
   * Declaración de protesta de verdad.
   * @type {string}
   */
  mapDeclaracionSolicitud: string;

  /**
   * Estado del envío del aviso.
   * @type {string}
   */
  envioAviso: string;

  /**
   * Número del aviso.
   * @type {string}
   */
  numeroAviso: string;

  /**
   * Referencia de la solicitud.
   * @type {string}
   */
  claveReferencia: string;

  /**
   * Número de operación asociado a la solicitud.
   * @type {string}
   */
  numeroOperacion: string;

  /**
   * Cadena de dependencia asociada a la solicitud.
   * @type {string}
   */
  cadenaDependencia: string;

  /**
   * Información del banco relacionado.
   * @type {string}
   */
  banco: string;

  /**
   * Llave única de pago asociada a la solicitud.
   * @type {string}
   */
  llavePago: string;

  /**
   * Fecha de pago asociada a la solicitud.
   * @type {string}
   */
  fechaPago: string;

  /**
   * Importe del pago relacionado con la solicitud.
   * @type {string}
   */
  importePago: string;
}

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial de la solicitud. Esta función devuelve un objeto con todos los campos inicializados como cadenas vacías.
 * @returns {UnicoState} El estado inicial de la solicitud.
 */

export function createInitialState(): UnicoState {
  return {
    /**
     * Modalidad de la solicitud.
     * @type {string}
     */
    mapTipoTramite: '',

    /**
     * Declaración de protesta de verdad.
     * @type {string}
     */
    mapDeclaracionSolicitud: '',

    /**
     * Estado del envío del aviso.
     * @type {string}
     */
    envioAviso: '',

    /**
     * Número del aviso.
     * @type {string}
     */
    numeroAviso: '',

    /**
     * Referencia de la solicitud.
     * @type {string}
     */
    claveReferencia: '',

    /**
     * Número de operación asociado a la solicitud.
     * @type {string}
     */
    numeroOperacion: '',

    /**
     * Cadena de dependencia asociada a la solicitud.
     * @type {string}
     */
    cadenaDependencia: '',

    /**
     * Información del banco relacionado.
     * @type {string}
     */
    banco: '',

    /**
     * Llave única de pago asociada a la solicitud.
     * @type {string}
     */
    llavePago: '',

    /**
     * Fecha de pago asociada a la solicitud.
     * @type {string}
     */
    fechaPago: '',

    /**
     * Importe del pago relacionado con la solicitud.
     * @type {string}
     */
    importePago: '',

    /**
     * Función para manejar la modalidad.
     * @param _modalidad Modalidad a manejar.
     * @returns {unknown}
     */
    modalidad: function (_modalidad: unknown): unknown {
      throw new Error('Function not implemented.');
    },
  }
}

/**
 * @class
 * @name UnicoStore
 * @description
 * Clase que representa el almacén de estado para la solicitud. Proporciona métodos para actualizar los campos del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'renovacionStore', resettable: true })
export class UnicoStore extends Store<UnicoState> {
  /**
   * Constructor de la clase UnicoStore.
   * Inicializa el almacén con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el campo `mapTipoTramite` en el estado.
   * @param mapTipoTramite Nueva modalidad de la solicitud.
   * @returns {void} No retorna valor.
   */
  public setmapTipoTramite(mapTipoTramite: string): void {
    this.update((state) => ({
      ...state,
      mapTipoTramite,
    }));
  }

  /**
   * Actualiza el campo `mapDeclaracionSolicitud` en el estado.
   * @param mapDeclaracionSolicitud Nueva declaración de protesta de verdad.
   * @returns {void} No retorna valor.
   */
  public setmapDeclaracionSolicitud(mapDeclaracionSolicitud: string): void {
    this.update((state) => ({
      ...state,
      mapDeclaracionSolicitud,
    }));
  }

  /**
   * Actualiza el campo `envioAviso` en el estado.
   * @param envioAviso Nuevo estado de envío del aviso.
   * @returns {void} No retorna valor.
   */
  public setenvioAviso(envioAviso: string): void {
    this.update((state) => ({
      ...state,
      envioAviso,
    }));
  }

  /**
   * Actualiza el campo `numeroAviso` en el estado.
   * @param numeroAviso Nuevo número de aviso.
   * @returns {void} No retorna valor.
   */
  public setnumeroAviso(numeroAviso: string): void {
    this.update((state) => ({
      ...state,
      numeroAviso,
    }));
  }

  /**
   * Actualiza el campo `claveReferencia` en el estado.
   * @param claveReferencia Nueva clave de referencia.
   * @returns {void} No retorna valor.
   */
  public setclaveReferencia(claveReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveReferencia,
    }));
  }

  /**
   * Actualiza el campo `numeroOperacion` en el estado.
   * @param numeroOperacion Nuevo número de operación.
   * @returns {void} No retorna valor.
   */
  public setnumeroOperacion(numeroOperacion: string): void {
    this.update((state) => ({
      ...state,
      numeroOperacion,
    }));
  }

  /**
   * Actualiza el campo `cadenaDependencia` en el estado.
   * @param cadenaDependencia Nueva cadena de dependencia.
   * @returns {void} No retorna valor.
   */
  public setcadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * Actualiza el campo `banco` en el estado.
   * @param banco Nuevo banco.
   * @returns {void} No retorna valor.
   */
  public setbanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Actualiza el campo `llavePago` en el estado.
   * @param llavePago Nueva llave de pago.
   * @returns {void} No retorna valor.
   */
  public setllavePago(llavePago: string): void {
    this.update((state) => ({
      ...state,
      llavePago,
    }));
  }

  /**
   * Actualiza el campo `fechaPago` en el estado.
   * @param fechaPago Nueva fecha de pago.
   * @returns {void} No retorna valor.
   */
  public setfechaPago(fechaPago: string): void {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }

  /**
   * Actualiza el campo `importePago` en el estado.
   * @param importePago Nuevo importe de pago.
   * @returns {void} No retorna valor.
   */
  public setimportePago(importePago: string): void {
    this.update((state) => ({
      ...state,
      importePago,
    }));
  }
}
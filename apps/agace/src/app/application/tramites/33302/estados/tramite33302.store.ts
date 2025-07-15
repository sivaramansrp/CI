/**
 * Importación de modelos relacionados con el aviso de modificación.
 * Estos modelos se utilizan para estructurar los datos dentro del sistema.
 */
import {TipoDevAviso } from '../models/avisomodify.model';

/**
 * Importación de la librería Akita para gestionar el estado global de la aplicación.
 * Se incluyen `Store` y `StoreConfig` para definir y estructurar la tienda de datos.
 */
import { Store, StoreConfig } from '@datorama/akita';

/**
 * Importación de la funcionalidad `Injectable` de Angular.
 * Se usa para definir que la clase puede ser inyectada como un servicio.
 */
import { Injectable } from '@angular/core';

/**
 * Definición de la interfaz `Catalogo`.
 * Representa un objeto con un identificador único y una descripción asociada.
 */
export interface Catalogo {
    /**
     * Identificador único del catálogo.
     */
    id: number;

    /**
     * Descripción del elemento dentro del catálogo.
     */
    descripcion: string;
   
}
/**
 * @interface Tramite33302State
 * @description
 * Representa el estado del trámite 33302, incluyendo datos relacionados con claves de referencia,
 * dependencias, pagos, y otros detalles asociados al trámite.
 */
export interface Tramite33302State {
  /**
   * Clave de referencia del trámite.
   * @type {string}
   */
  claveDeReferencia: string;

  /**
   * Cadena de dependencia asociada al trámite.
   * @type {string}
   */
  cadenaDependencia: string;

  /**
   * Nombre del banco donde se realizó el pago.
   * @type {string}
   */
  banco: string;

  /**
   * Llave única del pago.
   * @type {string}
   */
  llaveDePago: string;

  /**
   * Fecha de pago.
   * @type {string}
   */
  fechaDePago: string;

  /**
   * Importe total del pago.
   * @type {string}
   */
  importeDePago: string;

  /**
   * Número asociado al trámite.
   * @type {string}
   */
  numeroDe: string;
  modalidadCertificacion: string;
  /** Indica si es un cliente o proveedor extranjero */
  foreignClientsSuppliers: boolean,
  /** Indica si es un proveedor nacional */
  nationalSuppliers: boolean,
  /** Indica si hay modificaciones de socios */
  modificationsMembers: boolean,
  /** Indica si hay cambios en los documentos legales */
  changesToLegalDocuments: boolean,
  /** Indica si es un aviso de fusión o escisión */
  mergerOrSplitNotice: boolean,
  /** Indica si hay fracciones adicionales */
  additionFractions: boolean,
  presenten: boolean, 
  contratados: boolean, 
  expirado: boolean, 
  derechos: boolean, 
  /** Aceptación de la sección 253 */
  acepto253: boolean,
  
}

/**
 * @function createInitialState
 * @description
 * Crea el estado inicial del trámite 33302 con valores predeterminados.
 * 
 * @returns {Tramite33302State} El estado inicial del trámite.
 */
export function createInitialState(): Tramite33302State {
  return {
    /**
     * Clave de referencia inicial vacía.
     */
    claveDeReferencia: '',

    /**
     * Cadena de dependencia inicial vacía.
     */
    cadenaDependencia: '',

    /**
     * Nombre del banco inicial vacío.
     */
    banco: '',

    /**
     * Llave de pago inicial vacía.
     */
    llaveDePago: '',

    /**
     * Fecha de pago inicial vacía.
     */
    fechaDePago: '',

    /**
     * Importe de pago inicial vacío.
     */
    importeDePago: '',

    /**
     * Número asociado al trámite inicial vacío.
     */
    numeroDe: '',
    /**
     * Modalidad de certificación inicial vacía.
     */
    modalidadCertificacion: '',
    /** Indica si es un cliente o proveedor extranjero */
    foreignClientsSuppliers: false,
    /** Indica si es un proveedor nacional */
    nationalSuppliers: false,
    /** Indica si hay modificaciones de socios */
    modificationsMembers: false,
    /** Indica si hay cambios en los documentos legales */
    changesToLegalDocuments: false,
    /** Indica si es un aviso de fusión o escisión */
    mergerOrSplitNotice: false,
    /** Indica si hay fracciones adicionales */
    additionFractions: false,
    presenten: false, 
    contratados: false, 
    expirado: false, 
    derechos: false, 
    /** Aceptación de la sección 253 */
    acepto253: false,
  };
}




/**
 * Store del trámite 32301.
 * Este store gestiona el estado del formulario relacionado con el trámite 32301.
 * Utiliza Akita para manejar el estado de manera reactiva.
 * 
 * @export
 * @class Tramite32301Store
 * @extends {Store<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-33301', resettable: true })
export class Tramite33302Store extends Store<Tramite33302State> {
  constructor() {
    super(createInitialState());
  }
  /**
   * Actualiza el estado del store con los valores proporcionados.
   * @param {Partial<Tramite33302State>} valores - Valores parciales del estado a actualizar.
   * @method actualizarEstado
   * @description
   * Actualiza el estado del store con los valores proporcionados.
   * Utiliza el método `update` de Akita para fusionar los nuevos valores con el estado actual.
   * @param {Partial<Tramite33302State>} valores - Valores parciales del estado a actualizar.
   * @returns {void}
   * */

  public actualizarEstado(valores: Partial<Tramite33302State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
  
  
 
}
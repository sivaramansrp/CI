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
   * Establece la clave de referencia en el estado.
   * @param {string} claveDeReferencia - La clave de referencia a establecer.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia: claveDeReferencia,
    }));
  }

  /**
   * Establece la cadena de dependencia en el estado.
   * @param {string} cadenaDependencia - La cadena de dependencia a establecer.
   */
  public setCadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia: cadenaDependencia,
    }));
  }

  /**
   * Establece el nombre del banco en el estado.
   * @param {string} banco - El nombre del banco a establecer.
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco: banco,
    }));
  }

  /**
   * Establece la llave de pago en el estado.
   * @param {string} llaveDePago - La llave de pago a establecer.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago: llaveDePago,
    }));
  }

  /**
   * Establece la fecha de pago en el estado.
   * @param {string} fechaDePago - La fecha de pago a establecer.
   */
  public setFechaDePago(fechaDePago: string): void {
    this.update((state) => ({
      ...state,
      fechaDePago: fechaDePago,
    }));
  }

  /**
   * Establece el importe de pago en el estado.
   * @param {string} importeDePago - El importe de pago a establecer.
   */
  public setImporteDePago(importeDePago: string): void {
    this.update((state) => ({
      ...state,
      importeDePago: importeDePago,
    }));
  }

  /**
   * Establece el número asociado al trámite en el estado.
   * @param {string} numeroDe - El número a establecer.
   */
  public setNumeroDe(numeroDe: string): void {
    this.update((state) => ({
      ...state,
      numeroDe: numeroDe,
    }));
  }

  /**
   * Establece la modalidad de certificación en el estado.
   * @param {string} EV - La modalidad de certificación a establecer.
   */
  public setModalidadCertificacion(EV: string): void {
    this.update((state) => ({
      ...state,
      modalidadCertificacion: EV,
    }));
  }

  /**
   * Establece si es un proveedor extranjero en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El tipo de proveedor extranjero a establecer.
   */
  public setClientesProveedoresExtranjeros(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      foreignClientsSuppliers: tipoDevAviso,
    }));
  }

  /**
   * Establece si es un proveedor nacional en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El tipo de proveedor nacional a establecer.
   */
  public setProveedoresNacionales(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      nationalSuppliers: tipoDevAviso,
    }));
  }

  /**
   * Establece si hubo modificaciones en los miembros en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El tipo de modificación a establecer.
   */
  public setModificacionesMiembros(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      modificationsMembers: tipoDevAviso,
    }));
  }

  /**
   * Establece si hubo cambios en los documentos legales en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El tipo de cambio en los documentos legales.
   */
  public setCambiosDocumentosLegales(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      changesToLegalDocuments: tipoDevAviso,
    }));
  }

  /**
   * Establece si hay una notificación de fusión o escisión en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El tipo de notificación a establecer.
   */
  public setNotifiFusionOescision(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      mergerOrSplitNotice: tipoDevAviso,
    }));
  }

  /**
   * Establece si hay adiciones de fracciones en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El tipo de adición a establecer.
   */
  public setAdicionalesFractions(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      additionFractions: tipoDevAviso,
    }));
  }

  /**
   * Establece si se selecciona 'Presenten' en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El valor de 'Presenten' a establecer.
   */
  public setPresenten(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      presenten: tipoDevAviso,
    }));
  }

  /**
   * Establece si se selecciona 'Contratados' en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El valor de 'Contratados' a establecer.
   */
  public setContratados(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      contratados: tipoDevAviso,
    }));
  }

  /**
   * Establece si se selecciona 'Expirado' en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El valor de 'Expirado' a establecer.
   */
  public setExpirado(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      expirado: tipoDevAviso,
    }));
  }

  /**
   * Establece si se selecciona 'Derechos' en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El valor de 'Derechos' a establecer.
   */
  public setDerechos(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      derechos: tipoDevAviso,
    }));
  }

  /**
   * Establece si se aceptó el artículo 253 en el estado.
   * @param {TipoDevAviso} tipoDevAviso - El tipo de aceptación a establecer.
   */
  public setAceptacion253(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      acepto253: tipoDevAviso,
    }));
  }

  /**
   * Limpia el formulario y restablece el estado a su estado inicial.
   * @method limpiarFormulario
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}
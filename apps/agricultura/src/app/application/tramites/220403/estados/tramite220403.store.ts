import { CombinacionRequerida, DatosRealizar, FormularioGrupo, PagoDerechos, Transporte } from '../models/acuicola.module';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PersonaTerceros } from '@libs/shared/data-access-user/src';

/**
 * Estado inicial del formulario para el trámite 220403.
 * 
 * @constant
 * @type {FormularioGrupo}
 * @description Define los valores por defecto para cada sección del formulario, incluyendo datos de realización, combinación requerida, transporte y pago de derechos, así como los indicadores de validación correspondientes.
 */
export const INITIAL_STATE: FormularioGrupo = {
  datosRealizar: {
    certificadoTipo: 'animal',
    aduanaEmbarque: '',
    numeroContenedor: '',
    parisOrigen: '',
    entidadFederativaOrigen: '',
    municipoOrigen: '',
    paisDestino: '',
  },
  combinacionRequerida: {
    especie: '',
    paisDeDestino: '',
    instalacionAcuicola: ''
  },
  transporte: {
    medioTransporte: '',
    identificacionMedioTransporte: '',
    numeroDeContenedor: '',
    denominacionRazonSocial: '',
    numeroFlejes: '',
  },
  pagoDerechos: {
    claveReferencia: '',
    cadenaDependencia: '',
    banco: '',
    llavePago: '',
    fechaPago: '',
    importePago: '',
  },
  datosRealizarValidada: false,
  combinacionRequeridaValidada: false,
  transporteValidada: false,
  pagoDerechosValidada: false,
  tercerosRelacionados: [],
};

/**
 * Tramite entity store
 *
 * @export
 * @class TramiteStore
 * @extends {Store<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-220403', resettable: true })
export class Tramite220403Store extends Store<FormularioGrupo> {
  constructor() {
    super(INITIAL_STATE);
  }

  /**
   * @method setDatosRealizar
   * @description
   * Establece los datos de modificación en el estado.
   * 
   * @param {DatosRealizar} datosRealizar - Los datos de modificación que se van a establecer en el estado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosRealizar(datosRealizar: DatosRealizar): void {
    this.update((state) => ({
      ...state,
      datosRealizar,
    }));
  }

  /**
   * @method setCombinacionRequerida
   * @description
   * Establece la combinación requerida en el estado.
   * 
   * @param {CombinacionRequerida} combinacionRequerida - La combinación requerida que se va a establecer en el estado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setCombinacionRequerida(combinacionRequerida: CombinacionRequerida): void {
    this.update((state) => ({
      ...state,
      combinacionRequerida,
    }));
  }


  /**
   * @method setTransporte
   * @description
   * Establece el Transporte en el almacén.
   * 
   * @param {Transporte} transporte - El Transporte que se va a establecer en el almacén.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setTransporte(transporte: Transporte): void {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }

  /**
   * @method setPagoDerechos
   * @description
   * Establece el alta de PagoDerechos en el almacén.
   * 
   * @param {PagoDerechos} pagoDerechos - Representa las PagoDerechos a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setPagoDerechos(pagoDerechos: PagoDerechos): void {
    this.update((state) => ({
      ...state,
      pagoDerechos,
    }));
  }

  /**
   * @method setDatosRealizarValidada
   * @description
   * Establece el estado de validación de la sección "Datos a Realizar".
   * 
   * @param {boolean} datosRealizarValidada - Indica si la sección de datos a realizar ha sido validada.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosRealizarValidada(datosRealizarValidada : boolean): void {
    this.update((state) => ({
      ...state,
      datosRealizarValidada,
    }));
  }

  /**
   * @method setCombinacionRequeridaValidada
   * @description
   * Establece el estado de validación de la sección "Combinación Requerida".
   * 
   * @param {boolean} combinacionRequeridaValidada - Indica si la sección de combinación requerida ha sido validada.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setCombinacionRequeridaValidada(combinacionRequeridaValidada : boolean): void {
    this.update((state) => ({
      ...state,
      combinacionRequeridaValidada,
    }));
  }

  /**
   * @method setTransporteValidada
   * @description
   * Establece el estado de validación de la sección "Transporte".
   * 
   * @param {boolean} transporteValidada - Indica si la sección de transporte ha sido validada.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setTransporteValidada(transporteValidada : boolean): void {
    this.update((state) => ({
      ...state,
      transporteValidada,
    }));
  }

  /**
   * @method setPagoDerechosValidada
   * @description
   * Actualiza el estado para indicar si el pago de derechos ha sido validado.
   * 
   * @param {boolean} pagoDerechosValidada - Indica si el pago de derechos ha sido validado.
   * 
   * @returns {void}
   */
  setPagoDerechosValidada(pagoDerechosValidada : boolean): void {
    this.update((state) => ({
      ...state,
      pagoDerechosValidada,
    }));
  }

  /**
   * @method actualizarTercerosRelacionados
   * @description Updates the store with related third parties.
   * @param tercerosRelacionados Array of related third-party persons.
   */
  public actualizarTercerosRelacionados(tercerosRelacionados: PersonaTerceros[]): void {
    this.update(state => ({
      ...state,
      tercerosRelacionados: tercerosRelacionados,
    }));
  }

  /**
   * @method limpiarFormulario
   * @description 
   * Resets the store to its initial state.
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}
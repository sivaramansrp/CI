import { DatosRealizar, FormularioGrupo, PagoDerechos, Transporte } from '../models/acuicola.module';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export const INITIAL_STATE: FormularioGrupo = {
  datosRealizar: {
    certificadoTipo: '',
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
    denodenominacionRazonSocial: '',
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
   * @description Resets the store to its initial state.
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}
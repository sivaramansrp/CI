import { CargaTipo, DatosDomicilioLugar, DatosEmpresa, DatosMercanciaSubmanufactura, DatosQuienRecibe, FormularioGrupo } from '../models/aviso.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export const INITIAL_STATE: FormularioGrupo = {
    datosEmpresa: {
        numeroPrograma: '',
        anoPrograma: '',
        mesCorrespondeAviso: '',
        anoCorrespondeAviso: '',
    },
    cargaTipo: {
        cargaTipo: '',
    },
    datosQuienRecibe: {
        rfc: '',
        numberProgramaQr: '',
        anoProgramaQr: '',
    },
    datosDomicilioLugar: {
        nombreComercial: '',
        entidadFederativa: '',
        alcaldiaMunicipio: '',
        colonias: '',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        codigoPostal: '',
    },
    datosMercanciaSubmanufactura: {
        fracArancelaria: '',
        nico: '',
        unidadMedida: '',
        cantidad: '',
        valorUsd: '',
        descripcionMercancia: '',
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
@StoreConfig({ name: 'tramite-32504', resettable: true })
export class Tramite32504Store extends Store<FormularioGrupo> {
  constructor() {
    super(INITIAL_STATE);
  }

  /**
   * Establece los datos de modificación en el estado.
   * 
   * @param {DatosEmpresa} datosEmpresa - Los datos de modificación que se van a establecer en el estado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosEmpresa(datosEmpresa: DatosEmpresa): void {
    this.update((state) => ({
      ...state,
      datosEmpresa,
    }));
  }

  /**
   * Establece el CargaTipo en el almacén.
   * 
   * @param {CargaTipo} cargaTipo - El CargaTipo que se va a establecer en el almacén.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setCargaTipo(cargaTipo: CargaTipo): void {
    this.update((state) => ({
      ...state,
      cargaTipo,
    }));
  }

  /**
   * Establece el alta de DatosQuienRecibe en el almacén.
   * 
   * @param {DatosQuienRecibe} datosQuienRecibe - Representa las DatosQuienRecibe a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosQuienRecibe(datosQuienRecibe: DatosQuienRecibe): void {
    this.update((state) => ({
      ...state,
      datosQuienRecibe,
    }));
  }

  /**
   * Establece el alta de datosDomicilioLugar en el almacén.
   * 
   * @param {datosDomicilioLugar} datosDomicilioLugar - Representa las datosDomicilioLugar a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosDomicilioLugar(datosDomicilioLugar: DatosDomicilioLugar): void {
    this.update((state) => ({
      ...state,
      datosDomicilioLugar,
    }));
  }

  /**
   * Establece el alta de datosMercanciaSubmanufactura en el almacén.
   * 
   * @param {DatosMercanciaSubmanufactura} datosMercanciaSubmanufactura - Representa las datosMercanciaSubmanufactura a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosMercanciaSubmanufactura(datosMercanciaSubmanufactura: DatosMercanciaSubmanufactura): void {
    this.update((state) => ({
      ...state,
      datosMercanciaSubmanufactura,
    }));
  }

  /**
   * @description Resets the store to its initial state.
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}
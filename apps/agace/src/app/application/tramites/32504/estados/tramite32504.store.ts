import { CargaTipo, DatosDomicilioLugar, DatosEmpresa, DatosMercanciaSubmanufactura, DatosQuienRecibe, FormularioGrupo } from '../models/aviso.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado inicial del formulario del trámite 32504.
 * @type {FormularioGrupo}
 */
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
 * @class Tramite32504Store
 * @description Store para la gestión del estado del formulario del trámite 32504.
 * @extends {Store<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-32504', resettable: true })
export class Tramite32504Store extends Store<FormularioGrupo> {
  /**
   * Crea una instancia de Tramite32504Store e inicializa el estado.
   */
  constructor() {
    super(INITIAL_STATE);
  }

  /**
   * Establece los datos de la empresa en el estado.
   * 
   * @param {DatosEmpresa} datosEmpresa - Los datos de la empresa que se van a establecer en el estado.
   * @returns {void}
   */
  setDatosEmpresa(datosEmpresa: DatosEmpresa): void {
    this.update((state) => ({
      ...state,
      datosEmpresa,
    }));
  }

  /**
   * Establece el tipo de carga en el estado.
   * 
   * @param {CargaTipo} cargaTipo - El tipo de carga que se va a establecer en el estado.
   * @returns {void}
   */
  setCargaTipo(cargaTipo: CargaTipo): void {
    this.update((state) => ({
      ...state,
      cargaTipo,
    }));
  }

  /**
   * Establece los datos de quien recibe en el estado.
   * 
   * @param {DatosQuienRecibe} datosQuienRecibe - Los datos de quien recibe que se van a establecer en el estado.
   * @returns {void}
   */
  setDatosQuienRecibe(datosQuienRecibe: DatosQuienRecibe): void {
    this.update((state) => ({
      ...state,
      datosQuienRecibe,
    }));
  }

  /**
   * Establece los datos del domicilio del lugar en el estado.
   * 
   * @param {DatosDomicilioLugar} datosDomicilioLugar - Los datos del domicilio del lugar que se van a establecer en el estado.
   * @returns {void}
   */
  setDatosDomicilioLugar(datosDomicilioLugar: DatosDomicilioLugar): void {
    this.update((state) => ({
      ...state,
      datosDomicilioLugar,
    }));
  }

  /**
   * Establece los datos de la mercancía para submanufactura en el estado.
   * 
   * @param {DatosMercanciaSubmanufactura} datosMercanciaSubmanufactura - Los datos de la mercancía para submanufactura que se van a establecer en el estado.
   * @returns {void}
   */
  setDatosMercanciaSubmanufactura(datosMercanciaSubmanufactura: DatosMercanciaSubmanufactura): void {
    this.update((state) => ({
      ...state,
      datosMercanciaSubmanufactura,
    }));
  }

  /**
   * Actualiza el estado general del formulario con los datos proporcionados.
   * 
   * @param {FormularioGrupo} datos - Los nuevos datos del formulario que se utilizarán para actualizar el estado.
   * @returns {void}
   */
  setEstadoGeneral(datos: FormularioGrupo): void {
    this.update((state) => ({
      ...state,
      datos,
    }));
  }

  /**
   * Restaura el estado del store a su estado inicial.
   * @returns {void}
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}
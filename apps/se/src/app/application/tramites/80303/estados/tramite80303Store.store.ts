import {
  AnexoExportacion,
  AnexoImportacion,
  DatosContribuyente,
  DatosEmpresaSubmanufacturera,
  DatosPlantaManufacturera,
  Federatario,
  FederatarioRealizaranLasOperaciones,
  Sensible,
  ServicioImmex,
} from '../models/complementaria.model';
import {
  Bitacora,
  EmpresaSubmanufacturera,
  ModificacionDatos,
} from '../models/modificacion-programa-immex-baja-submanufacturera.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';


/**
 * Representa el estado de Tramite80303 en la aplicación.
 * Este estado contiene información relacionada con diferentes tablas de datos y configuraciones específicas del trámite.
 */
export interface Tramite80303State {
  /**
   * Identificador del tab actualmente seleccionado.
   * @type {number | undefined}
   */
  tabSeleccionado?: number;

  /**
   * Identificador del sub-tab actualmente seleccionado.
   * @type {number | undefined}
   */
  subTabSeleccionado?: number;

  /**
   * Datos de la tabla de anexos de exportación.
   * @type {AnexoExportacion[]}
   */
  anexoExportacionTablaDatos: AnexoExportacion[];

  /**
   * Datos de la tabla de anexos de importación.
   * @type {AnexoImportacion[]}
   */
  anexoImportacionTablaDatos: AnexoImportacion[];

  /**
   * Datos de la tabla de productos sensibles.
   * @type {Sensible[]}
   */
  sensiblesTablaDatos: Sensible[];

  /**
   * Datos de la tabla de accionistas.
   * @type {DatosContribuyente[]}
   */
  accionistasTablaDatos: DatosContribuyente[];

  /**
   * Datos de la tabla de federatarios.
   * @type {Federatario[]}
   */
  federatariosTablaDatos: Federatario[];

  /**
   * Datos de las plantas IMMEX que realizarán las operaciones.
   * @type {FederatarioRealizaranLasOperaciones[]}
   */
  plantasIMMEXDatos: FederatarioRealizaranLasOperaciones[];

  /**
   * Datos de la tabla de empresas submanufactureras.
   * @type {DatosEmpresaSubmanufacturera[]}
   */
  empresasSubmanufacturerasTablaDatos: DatosEmpresaSubmanufacturera[];

  /**
   * Datos de la tabla de plantas manufactureras.
   * @type {DatosPlantaManufacturera[]}
   */
  plantasManufacturerasTablaDatos: DatosPlantaManufacturera[];

  /**
   * Datos de la tabla de servicios IMMEX.
   * @type {ServicioImmex[]}
   */
  serviciosImmexTablaDatos: ServicioImmex[];

  /**
   * Datos de la tabla de bitácora.
   * @type {Bitacora[]}
   */
  bitacoraTablaDatos: Bitacora[];

  /**
   * Datos de la tabla de empresas submanufactureras.
   * @type {EmpresaSubmanufacturera[]}
   */
  submanufacturerasTablaDatos: EmpresaSubmanufacturera[];

  /**
   * Información relacionada con la modificación de datos.
   * @type {ModificacionDatos}
   */
  modificacionDatos: ModificacionDatos;
}

/**
 * Crea el estado inicial para el trámite 80303.
 *
 * @function createInitialState
 * @returns {Tramite80303State} El estado inicial del store.
 */
export function createInitialState(): Tramite80303State {
  return {
    tabSeleccionado: 1,
    subTabSeleccionado: 1,
    anexoExportacionTablaDatos: [],
    anexoImportacionTablaDatos: [],
    sensiblesTablaDatos: [],
    accionistasTablaDatos: [],
    federatariosTablaDatos: [],
    plantasIMMEXDatos: [],
    empresasSubmanufacturerasTablaDatos: [],
    plantasManufacturerasTablaDatos: [],
    serviciosImmexTablaDatos: [],
    bitacoraTablaDatos: [],
    submanufacturerasTablaDatos: [],
    modificacionDatos: {
      rfc: '',
      representacionFederal: '',
      tipoModificacion: '',
      modificacionPrograma: '',
    },
  };
}

/**
 * Store que maneja el estado del trámite 80303.
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite80303', resettable: true })
export class Tramite80303Store extends Store<Tramite80303State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Cambia la pestaña actualmente seleccionada.
   *
   * @method updateTabSeleccionado
   * @param {number} tabSeleccionado - Índice de la nueva pestaña seleccionada.
   * @returns {void}
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }

  /**
   * Cambia la pestaña actualmente seleccionada.
   *
   * @method updateSubTabSeleccionado
   * @param {number} tabSeleccionado - Índice de la nueva pestaña seleccionada.
   * @returns {void}
   */
  public updateSubTabSeleccionado(subTabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      subTabSeleccionado,
    }));
  }

  /**
   * Actualiza la lista de datos de anexo de exportación.
   *
   * @method updateAnexoExportacionTablaDatos
   * @param {AnexoExportacion[]} anexoExportacionTablaDatos - Nueva lista de datos de anexo de exportación.
   * @returns {void}
   */
  public updateAnexoExportacionTablaDatos(
    anexoExportacionTablaDatos: AnexoExportacion[]
  ): void {
    this.update((state) => ({
      ...state,
      anexoExportacionTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de anexo de importación.
   *
   * @method updateAnexoImportacionTablaDatos
   * @param {AnexoImportacion[]} anexoImportacionTablaDatos - Nueva lista de datos de anexo de importación.
   * @returns {void}
   */
  public updateAnexoImportacionTablaDatos(
    anexoImportacionTablaDatos: AnexoImportacion[]
  ): void {
    this.update((state) => ({
      ...state,
      anexoImportacionTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos sensibles.
   *
   * @method updateSensiblesTablaDatos
   * @param {Sensible[]} sensiblesTablaDatos - Nueva lista de datos sensibles.
   * @returns {void}
   */
  public updateSensiblesTablaDatos(sensiblesTablaDatos: Sensible[]): void {
    this.update((state) => ({
      ...state,
      sensiblesTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de accionistas.
   *
   * @method updateAccionistasTablaDatos
   * @param {DatosContribuyente[]} accionistasTablaDatos - Nueva lista de datos de accionistas.
   * @returns {void}
   */
  public updateAccionistasTablaDatos(
    accionistasTablaDatos: DatosContribuyente[]
  ): void {
    this.update((state) => ({
      ...state,
      accionistasTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de federatarios.
   *
   * @method updateFederatariosTablaDatos
   * @param {Federatario[]} federatariosTablaDatos - Nueva lista de datos de federatarios.
   * @returns {void}
   */
  public updateFederatariosTablaDatos(
    federatariosTablaDatos: Federatario[]
  ): void {
    this.update((state) => ({
      ...state,
      federatariosTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de plantas IMMEX.
   *
   * @method updatePlantasIMMEXDatos
   * @param {FederatarioRealizaranLasOperaciones[]} plantasIMMEXDatos - Nueva lista de datos de plantas IMMEX.
   * @returns {void}
   */
  public updatePlantasIMMEXDatos(
    plantasIMMEXDatos: FederatarioRealizaranLasOperaciones[]
  ): void {
    this.update((state) => ({
      ...state,
      plantasIMMEXDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de empresas submanufactureras.
   *
   * @method updateEmpresasSubmanufacturerasTablaDatos
   * @param {DatosEmpresaSubmanufacturera[]} empresasSubmanufacturerasTablaDatos - Nueva lista de datos de empresas submanufactureras.
   * @returns {void}
   */
  public updateEmpresasSubmanufacturerasTablaDatos(
    empresasSubmanufacturerasTablaDatos: DatosEmpresaSubmanufacturera[]
  ): void {
    this.update((state) => ({
      ...state,
      empresasSubmanufacturerasTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de plantas manufactureras.
   *
   * @method updatePlantasManufacturerasTablaDatos
   * @param {DatosPlantaManufacturera[]} plantasManufacturerasTablaDatos - Nueva lista de datos de plantas manufactureras.
   * @returns {void}
   */
  public updatePlantasManufacturerasTablaDatos(
    plantasManufacturerasTablaDatos: DatosPlantaManufacturera[]
  ): void {
    this.update((state) => ({
      ...state,
      plantasManufacturerasTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de servicios IMMEX.
   *
   * @method updateServiciosImmexTablaDatos
   * @param {ServicioImmex[]} serviciosImmexTablaDatos - Nueva lista de datos de servicios IMMEX.
   * @returns {void}
   */
  public updateServiciosImmexTablaDatos(
    serviciosImmexTablaDatos: ServicioImmex[]
  ): void {
    this.update((state) => ({
      ...state,
      serviciosImmexTablaDatos,
    }));
  }

  /**
   * Actualiza la lista de datos de bitácora.
   *
   * @method updateBitacoraTablaDatos
   * @param {Bitacora[]} bitacoraTablaDatos - Nueva lista de datos de bitácora.
   * @returns {void}
   */
  public updateBitacoraTablaDatos(bitacoraTablaDatos: Bitacora[]): void {
    this.update((state) => ({
      ...state,
      bitacoraTablaDatos,
    }));
  }
  /**
   * Actualiza la lista de datos de submanufactureras.
   *
   * @method updateSubmanufacturerasTablaDatos
   * @param {EmpresaSubmanufacturera[]} submanufacturerasTablaDatos - Nueva lista de datos de submanufactureras.
   * @returns {void}
   * */

  public updateSubmanufacturerasTablaDatos(
    submanufacturerasTablaDatos: EmpresaSubmanufacturera[]
  ): void {
    this.update((state) => ({
      ...state,
      submanufacturerasTablaDatos,
    }));
  }
}

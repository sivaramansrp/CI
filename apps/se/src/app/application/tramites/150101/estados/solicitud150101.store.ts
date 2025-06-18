import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que define el estado inicial de la tienda `Solicitud150101Store`.
 */
export interface Solicitud150101State {
  /**
   * Fecha de inicio del reporte anual.
   */
  reporteAnualFechaInicio: string;

  /**
   * Fecha de fin del reporte anual.
   */
  reporteAnualFechaFin: string;

  /**
   * Folio del programa.
   */
  folioPrograma: string;

  /**
   * Modalidad del programa.
   */
  modalidad: string;

  /**
   * Tipo de programa.
   */
  tipoPrograma: string;

  /**
   * Estatus actual.
   */
  estatus: string;

  /**
   * Ventas totales.
   */
  ventasTotales: string;

  /**
   * Total de exportaciones.
   */
  totalExportaciones: number;

  /**
   * Total de importaciones.
   */
  totalImportaciones: number;

  /**
   * Saldo actual.
   */
  saldo: number;

  /**
   * Porcentaje de exportación.
   */
  porcentajeExportacion: number;
}

/**
 * Función que crea el estado inicial de la tienda `Solicitud150101Store`.
 * @returns {Solicitud150101State} El estado inicial de la tienda.
 */
export function createInitialState(): Solicitud150101State {
  return {
    /**
     * Fecha de inicio del reporte anual.
     */
    reporteAnualFechaInicio: '',

    /**
     * Fecha de fin del reporte anual.
     */
    reporteAnualFechaFin: '',

    /**
     * Folio del programa.
     */
    folioPrograma: '',

    /**
     * Modalidad del programa.
     */
    modalidad: '',

    /**
     * Tipo de programa.
     */
    tipoPrograma: '',

    /**
     * Estatus actual.
     */
    estatus: '',

    /**
     * Ventas totales.
     */
    ventasTotales: '',

    /**
     * Total de exportaciones.
     */
    totalExportaciones: 0,

    /**
     * Total de importaciones.
     */
    totalImportaciones: 0,

    /**
     * Saldo actual.
     */
    saldo: 0,

    /**
     * Porcentaje de exportación.
     */
    porcentajeExportacion: 0
  };
}

/**
 * Servicio que representa la tienda `Solicitud150101Store`.
 * Proporciona métodos para actualizar el estado de la tienda.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud150101Store', resettable: true })
export class Solicitud150101Store extends Store<Solicitud150101State> {
  /**
   * Constructor de la tienda `Solicitud150101Store`.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la fecha de fin del reporte anual.
   * @param reporteAnualFechaFin Fecha de fin del reporte anual.
   */
  setReporteAnualFechaFin(reporteAnualFechaFin: string): void {
    this.update((state) => ({
      ...state,
      reporteAnualFechaFin
    }));
  }

  /**
   * Actualiza el folio del programa.
   * @param folioPrograma Folio del programa.
   */
  actualizarFolioPrograma(folioPrograma: string): void {
    this.update((state) => ({
      ...state,
      folioPrograma,
    }));
  }

  /**
   * Actualiza la modalidad del programa.
   * @param modalidad Modalidad del programa.
   */
  actualizarModalidad(modalidad: string): void {
    this.update((state) => ({
      ...state,
      modalidad,
    }));
  }

  /**
   * Actualiza el tipo de programa.
   * @param tipoPrograma Tipo de programa.
   */
  actualizarTipoPrograma(tipoPrograma: string): void {
    this.update((state) => ({
      ...state,
      tipoPrograma,
    }));
  }

  /**
   * Actualiza el estatus actual.
   * @param estatus Estatus actual.
   */
  actualizarEstatus(estatus: string): void {
    this.update((state) => ({
      ...state,
      estatus,
    }));
  }

  /**
   * Actualiza la fecha de inicio del reporte anual.
   * @param reporteAnualFechaInicio Fecha de inicio del reporte anual.
   */
  setReporteAnualFechaInicio(reporteAnualFechaInicio: string): void {
    this.update((state) => ({
      ...state,
      reporteAnualFechaInicio
    }));
  }

  /**
   * Actualiza las ventas totales.
   * @param ventasTotales Ventas totales.
   */
  actualizarVentasTotales(ventasTotales: string): void {
    this.update((state) => ({
      ...state,
      ventasTotales,
    }));
  }

  /**
   * Actualiza el total de exportaciones.
   * @param totalExportaciones Total de exportaciones.
   */
  actualizarTotalExportaciones(totalExportaciones: number): void {
    this.update((state) => ({
      ...state,
      totalExportaciones,
    }));
  }

  /**
   * Actualiza el total de importaciones.
   * @param totalImportaciones Total de importaciones.
   */
  actualizarTotalImportaciones(totalImportaciones: number): void {
    this.update((state) => ({
      ...state,
      totalImportaciones,
    }));
  }

  /**
   * Actualiza el saldo actual.
   * @param saldo Saldo actual.
   */
  actualizarSaldo(saldo: number): void {
    this.update((state) => ({
      ...state,
      saldo,
    }));
  }

  /**
   * Actualiza el porcentaje de exportación.
   * @param porcentajeExportacion Porcentaje de exportación.
   */
  actualizarPorcentajeExportacion(porcentajeExportacion: number): void {
    this.update((state) => ({
      ...state,
      porcentajeExportacion,
    }));
  }

  /**
   * Actualiza el estado de la solicitud anual con nuevos datos.
   * @param nuevoDatos Nuevo estado de la solicitud anual.
   */
  public setRegistroSolicitudAnualState(nuevoDatos: Solicitud150101State): void {
    this.update(nuevoDatos);
  }
}

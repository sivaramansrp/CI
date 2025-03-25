import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Solicitud150101State {
  reporteAnualFechaInicio: string;
  reporteAnualFechaFin: string;
  folioPrograma: string;
  modalidad: string;
  tipoPrograma: string;
  estatus: string;
  ventasTotales: string;
  totalExportaciones: string;
  totalImportaciones: string;
  saldo: string;
  porcentajeExportacion: string;
}

export function createInitialState(): Solicitud150101State {
  return {
    reporteAnualFechaInicio: '',
    reporteAnualFechaFin: '',
    folioPrograma: '',
    modalidad: '',
    tipoPrograma: '',
    estatus: '',
    ventasTotales: '',
    totalExportaciones: '',
    totalImportaciones: '',
    saldo: '',
    porcentajeExportacion: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud150101Store', resettable: true })
export class Solicitud150101Store extends Store<Solicitud150101State> {
  constructor() {
    super(createInitialState());
  }

  setReporteAnualFechaFin(reporteAnualFechaFin: string): void {
    this.update((state) => ({
      ...state,
      reporteAnualFechaFin
    }));
  }

  actualizarFolioPrograma(folioPrograma: string): void {
    this.update((state) => ({
      ...state,
      folioPrograma,
    }));
  }

  actualizarModalidad(modalidad: string): void {
    this.update((state) => ({
      ...state,
      modalidad,
    }));
  }

  actualizarTipoPrograma(tipoPrograma: string): void {
    this.update((state) => ({
      ...state,
      tipoPrograma,
    }));
  }

  actualizarEstatus(estatus: string): void {
    this.update((state) => ({
      ...state,
      estatus,
    }));
  }

  setReporteAnualFechaInicio(reporteAnualFechaInicio: string): void {
    this.update((state) => ({
      ...state,
      reporteAnualFechaInicio
    }));
  }

  actualizarVentasTotales(ventasTotales: string): void {
    this.update((state) => ({
      ...state,
      ventasTotales,
    }));
  }

actualizarTotalExportaciones(totalExportaciones: string): void {
    this.update((state) => ({
      ...state,
      totalExportaciones,
    }));
  }

actualizarTotalImportaciones(totalImportaciones: string): void {
    this.update((state) => ({
      ...state,
      totalImportaciones,
    }));
  }

actualizarSaldo(saldo: string): void {
    this.update((state) => ({
      ...state,
      saldo,
    }));
  }

actualizarPorcentajeExportacion(porcentajeExportacion: string): void {
    this.update((state) => ({
      ...state,
      porcentajeExportacion,
    }));
  }
}

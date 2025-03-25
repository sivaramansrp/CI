import { BienesProducidos } from '../models/programas-reporte.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Solicitud150102State {
  inicio: string;
  fin: string;
  folioPrograma: string;
  modalidad: string;
  tipoPrograma: string;
  estatus: string;
  ventasTotales: string;
  totalExportaciones: string;
  totalImportaciones: string;
  saldo: string;
  porcentajeExportacion: string;
  producidosDatos: BienesProducidos[];
}

export function createInitialState(): Solicitud150102State {
  return {
    inicio: '',
    fin: '',
    folioPrograma: '',
    modalidad: '',
    tipoPrograma: '',
    estatus: '',
    ventasTotales: '',
    totalExportaciones: '',
    totalImportaciones: '',
    saldo: '0',
    porcentajeExportacion: '0',
    producidosDatos:[]
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud150102Store', resettable: true })
export class Solicitud150102Store extends Store<Solicitud150102State> {
  constructor() {
    super(createInitialState());
  }

  actualizarFin(fin: string): void {
    this.update((state) => ({
      ...state,
      fin,
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

  actualizarInicio(inicio: string): void {
    this.update((state) => ({
      ...state,
      inicio,
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

  actualizarProducidosDatos(producidosDatos: BienesProducidos[]): void {
    this.update((state) => ({
      ...state,
      producidosDatos,
    }));
  }

}

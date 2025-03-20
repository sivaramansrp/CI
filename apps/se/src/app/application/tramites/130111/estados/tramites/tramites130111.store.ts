import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface Tramite130111State {
  filaSeleccionada: null;
  cantidad: string;
  valorPartidaUSD: number;
  descripcion: string;
  fraccion: string;
  valorFacturaUSD: string;
  unidadMedida: string;
  bloque: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  entidad: string;
  representacion: string;
  mostrarTabla: boolean;
}

export function createInitialState(): Tramite130111State {
  return {
    filaSeleccionada: null,
    cantidad: '',
    valorPartidaUSD: 0,
    descripcion: '',
    fraccion:'',
    valorFacturaUSD:'',
    unidadMedida:'',
    bloque:'',
    usoEspecifico:'',
    justificacionImportacionExportacion:'',
    observaciones:'',
    entidad:'',
    representacion:'',
    mostrarTabla: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130111' })
export class Tramite130111Store extends Store<Tramite130111State> {
  constructor() {
    super(createInitialState());
  }

  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }
  public setvalorPartidaUSD(valorPartidaUSD: number) : void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }
  public setDescripcion(descripcion: string) : void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }
  public setFraccion(fraccion: string): void { 
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }
  public setValorFacturaUSD(valorFacturaUSD: string): void { 
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }
  public setUnidadMedida(unidadMedida: string): void { 
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }
  public setBloque(bloque: string): void { 
    this.update((state) => ({
      ...state,
      bloque,
    }));
  }
  public setUsoEspecifico(usoEspecifico: string): void { 
    this.update((state) => ({
      ...state,
      usoEspecifico,
    }));
  }
  public setJustificacionImportacionExportacion(justificacionImportacionExportacion: string): void { 
    this.update((state) => ({
      ...state,
      justificacionImportacionExportacion,
    }));
  }
  public setObservaciones(observaciones: string): void { 
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }
  public setEntidad(entidad: string): void { 
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }
  public setRepresentacion(representacion: string): void { 
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }
  setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }
  storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}

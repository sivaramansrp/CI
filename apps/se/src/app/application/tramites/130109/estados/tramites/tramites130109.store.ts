import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface Tramite130109State {
  filaSeleccionada: null;
  cantidad : string,
  valorPartidaUSD : number,
  descripcion : string,
  fraccion: string,
  valorFacturaUSD:string,
  unidadMedida:string
  bloque:string,
  descripcioneSpecffico:string,
  descripcionJustificacion:string,
  observaciones:string,
  entidad:string,
  representacion:string

}

export function createInitialState(): Tramite130109State {
  return {
    filaSeleccionada: null,
    cantidad: '',
    valorPartidaUSD: 0,
    descripcion: '',
    fraccion: '',
    valorFacturaUSD:'',
    unidadMedida:'',
    bloque:'',
    descripcioneSpecffico:'',
    descripcionJustificacion:'',
    observaciones:'',
    entidad:'',
    representacion:''

  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130109' })
export class Tramite130109Store extends Store<Tramite130109State> {
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
  public setFraccion(fraccion: string): void { // New method
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }
  public setValorFacturaUSD(valorFacturaUSD: string): void { // New method
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }
  public setUnidadMedida(unidadMedida: string): void { // New method
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }
  public setBloque(bloque: string): void { // New method
    this.update((state) => ({
      ...state,
      bloque,
    }));
  }
  public setDescripcioneSpecffico(descripcioneSpecffico: string): void { // New method
    this.update((state) => ({
      ...state,
      descripcioneSpecffico,
    }));
  }
  public setDescripcionJustificacion(descripcionJustificacion: string): void { // New method
    this.update((state) => ({
      ...state,
      descripcionJustificacion,
    }));
  }
  public setObservaciones(observaciones: string): void { // New method
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }
  public setEntidad(entidad: string): void { // New method
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }
  public setRepresentacion(representacion: string): void { // New method
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }
  storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}

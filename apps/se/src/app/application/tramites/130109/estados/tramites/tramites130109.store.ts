import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface Tramite130109State {
  regimenDestinoMercancia: string;
  clasificacionDelRegimen:string;
  opcion:string;
  filaSeleccionada: null;
  cantidad: string;
  valorPartidaUSD: number;
  descripcion: string;
  fraccion: string;
  valorFacturaUSD: string;
  cantidadMercancia: string;
  valorPartidaUSDMercancia:string;
  descripcionMercancia:string;
  unidadMedida: string;
  bloque: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  entidad: string;
  representacion: string;
  mostrarTabla: boolean;
}

export function createInitialState(): Tramite130109State {
  return {
    regimenDestinoMercancia:'',
    clasificacionDelRegimen:'',
    opcion:'',
    filaSeleccionada: null,
    cantidad: '',
    valorPartidaUSD: 0,
    descripcion: '',
    fraccion:'',
    valorFacturaUSD:'',
    cantidadMercancia:'',
    valorPartidaUSDMercancia:'',
    descripcionMercancia:'',
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
@StoreConfig({ name: 'tramite130109', resettable: true })
export class Tramite130109Store extends Store<Tramite130109State> {
  constructor() {
    super(createInitialState());
  }
  public setRegimenDestinoMercancia(regimenDestinoMercancia: string): void { 
    this.update((state) => ({
      ...state,
      regimenDestinoMercancia,
    }));
  }
  public setClasificacionDelRegimen(clasificacionDelRegimen: string): void { 
    this.update((state) => ({
      ...state,
      clasificacionDelRegimen,
    }));
  }
  public setOpcion(opcion: string): void { 
    this.update((state) => ({
      ...state,
      opcion,
    }));
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
  public setCantidadMercancia(cantidadMercancia: string): void { 
    this.update((state) => ({
      ...state,
      cantidadMercancia,
    }));
  }
  public setValorPartidaUSDMercancia(valorPartidaUSDMercancia: string): void { 
    this.update((state) => ({
      ...state,
      valorPartidaUSDMercancia,
    }));
  }
  public setDescripcionMercancia(descripcionMercancia: string): void { 
    this.update((state) => ({
      ...state,
      descripcionMercancia,
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

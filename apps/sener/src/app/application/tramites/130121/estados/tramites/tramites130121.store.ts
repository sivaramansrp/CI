import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite130121State {
  plazo: string;
  descripcion: string;
  fraccion: string;
  umt: string;
  nico: string;
  cantidad: string;
  valorPartidaUSD: number;
  unidadMedida: string;
  solicitud: string;
  defaultSelect: string;
  defaultPlazo: string;
  regimen: string;
  clasificacion: string;
  filaSeleccionada: null;
  cantidadPartidasDeLaMercancia: string;
  valorPartidaUSDPartidasDeLaMercancia: number;
  descripcionPartidasDeLaMercancia: string;
  valorFacturaUSD: string;
  bloque: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  entidad: string;
  representacion: string;
  mostrarTabla: boolean;
}

export function createInitialState(): Tramite130121State {
  return {
    filaSeleccionada: null,
    mostrarTabla: false,
    solicitud: '',
    fraccion: '',
    umt: '',
    nico: '',
    defaultSelect: 'Inicial',
    plazo: '',
    descripcion: '',
    cantidad: '',
    valorPartidaUSD: 0,
    unidadMedida: '',
    defaultPlazo: 'Largo plazo (5 años)',
    regimen: '',
    clasificacion: '',
    cantidadPartidasDeLaMercancia: '',
    valorPartidaUSDPartidasDeLaMercancia: 0,
    descripcionPartidasDeLaMercancia: '',
    valorFacturaUSD: '',
    bloque: '',
    usoEspecifico: '',
    justificacionImportacionExportacion: '',
    observaciones: '',
    entidad: '',
    representacion: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130121' })
export class Tramite130121Store extends Store<Tramite130121State> {
  constructor() {
    super(createInitialState());
  }

  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }
  public setUmt(umt: string): void {
    this.update((state) => ({
      ...state,
      umt,
    }));
  }
  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }
  public updateState(updates: Partial<Tramite130121State>): void {
    this.update(updates);
  }

  public setProducto(plazo: string): void {
    this.update({ plazo });
  }

  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }
  public updateDefaultProducto(defaultPlazo: string): void {
    this.update({ defaultPlazo });
  }
  public setregimen(regimen: string): void {
    this.update({ regimen });
  }
  public setclasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }
  public setDescripcionPartidasDeLaMercancia(
    descripcionPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionPartidasDeLaMercancia,
    }));
  }

  public setCantidadPartidasDeLaMercancia(
    cantidadPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      cantidadPartidasDeLaMercancia,
    }));
  }
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }
  public setValorPartidaUSDPartidasDeLaMercancia(
    valorPartidaUSDPartidasDeLaMercancia: number
  ): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSDPartidasDeLaMercancia,
    }));
  }
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }
  public storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
  
}

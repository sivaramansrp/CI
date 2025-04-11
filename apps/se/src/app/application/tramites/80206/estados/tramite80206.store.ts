import { Arancelaria, ArancelariaImportacion, Sector, Servicios } from '../models/datos-info.model'; 
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';

export interface AmpliacionServiciosState {
  infoRegistro: Servicios;
  datosImmex: Arancelaria[];
  datosImportacion: ArancelariaImportacion[];
  datosSector: Sector[];
  datos: Arancelaria[];
  aduanaDeIngresoSelecion: Catalogo;
  sectorSelecion: Catalogo;
  formaValida: { [key: string]: boolean };
 
  fraccion: string;
  importacion: string;
  fraccionArancelaria: string;
  cantidad: string;
  valor: string;
  seleccionaLaModalidad: string;
  seleccionarRegla: string;
  sector: string;
  sectorDesplegable: Catalogo[];
  reglaSeleccionada: Catalogo[];
  isSelectedRegla: boolean;
}

export const INITIAL_AMPLIACION_SERVICIOS_STATE: AmpliacionServiciosState = {
  infoRegistro: {
    seleccionaLaModalidad: '',
    folio: '',
    ano: '',
  },
  seleccionaLaModalidad: 'Ampliación 3RS',
  seleccionarRegla: '',
  sector: '',
  sectorDesplegable: [],
  reglaSeleccionada: [],
  isSelectedRegla: false,
  datosImmex: [],
  datosImportacion: [],
  datosSector: [],
  datos: [],
  aduanaDeIngresoSelecion: {
    id: -1,
    descripcion: '',
  },
  sectorSelecion: {
    id: -1,
    descripcion: '',
  },
  formaValida: {
    seleccionarRegla: true,
  },
  fraccion: '',
  importacion: '',
  valor: '',
  cantidad: '',
  fraccionArancelaria: '',
};

/**
 * AmpliacionServicios Store
 * @export
 * @class AmpliacionServiciosStore
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ampliacion-servicios', resettable: true })
export class AmpliacionServiciosStore extends Store<AmpliacionServiciosState> {
  constructor() {
    super(INITIAL_AMPLIACION_SERVICIOS_STATE);
  }

  setInfoRegistro(infoRegistro: Servicios): void {
    this.update((state) => ({
      ...state,
      infoRegistro,
    }));
  }

  setAduanaDeIngreso(aduanaDeIngreso: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngreso,
    }));
  }

  setDatosImmex(datosImmex: Arancelaria[]): void {
    this.update((state) => ({
      ...state,
      datosImmex,
    }));
  }

  setDatosImportacion(datosImportacion: ArancelariaImportacion[]): void {
    this.update((state) => ({
      ...state,
      datosImportacion,
    }));
  }

  setDatosSector(datosSector: Sector[]): void {
    this.update((state) => ({
      ...state,
      datosSector,
    }));
  }

  setDatos(datos: Arancelaria[]): void {
    this.update((state) => ({
      ...state,
      datos,
    }));
  }

  setAduanaDeIngresoSeleccion(aduanaDeIngresoSelecion: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngresoSelecion,
    }));
  }

  setSectorSeleccion(sectorSelecion: Catalogo): void {
    this.update((state) => ({
      ...state,
      sectorSelecion,
    }));
  }

  setDatosImmexSeleccion(datosImmex: Arancelaria[]): void {
    this.update((state) => ({
      ...state,
      datosImmex,
    }));
  }

  setFormValida(formaValida: { [key: string]: boolean }): void {
    this.update((state) => {
      const IS_VALID = { ...state.formaValida, ...formaValida };
      return {
        ...state,
        formaValida: IS_VALID,
      };
    });
  }

  setRfcEmpresa(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * Actualiza el valor de importación en el estado.
   * @method setImportacion
   * @param {string} importacion - Valor de importación.
   */
  setImportacion(importacion: string): void {
    this.update((state) => ({
      ...state,
      importacion,
    }));
  }

  setValor(valor: string): void {
    this.update((state) => ({
      ...state,
      valor,
    }));
  }

  setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  setCamposEmpresa(fraccion: string, numeroPrograma: string, tiempoPrograma: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
      numeroPrograma,
      tiempoPrograma,
    }));
  }

  
  setSeleccionaLaModalidad(seleccionaLaModalidad: string): void {
    this.update((state) => ({
      ...state,
      seleccionaLaModalidad,
    }));
  }

  setSeleccionarRegla(seleccionarRegla: string): void {
    this.update((state) => ({
      ...state,
      seleccionarRegla,
    }));
  }

  setSector(sector: string): void {
    this.update((state) => ({
      ...state,
      sector,
    }));
  }

  setSectorDesplegable(sectorDesplegable: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      sectorDesplegable,
    }));
  }

  setReglaSeleccionada(reglaSeleccionada: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      reglaSeleccionada,
    }));
  }

  setIsSelectedRegla(isSelectedRegla: boolean): void {
    this.update((state) => ({
      ...state,
      isSelectedRegla,
    }));
  }
}
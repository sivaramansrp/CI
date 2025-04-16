import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { datosDeLaTabla } from '../../tramites/32101/models/datos-tramite.model';

export interface Catalogo {
  id: number;
  descripcion: string;
}

/**
 * Creacion del estado inicial para la interfaz de tramite 32101
 * @returns Solicitud32502
 */
export interface Solicitud32101State {
  tipoDeInversion: Catalogo[] | null;
  valorEnPesos: number;
  descripcionGeneral: string;
  listaDeDocumentos: string;
  datosDelContenedor: datosDeLaTabla[];
  
}

export function createInitialState(): Solicitud32101State {
  return {
    tipoDeInversion: null,
    valorEnPesos: 0,
    descripcionGeneral: '',
    listaDeDocumentos: '',
    datosDelContenedor: []
    
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32101', resettable: true })
export class Tramite32101Store extends Store<Solicitud32101State> {
  setFraccionRegla(arg0: string): void {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super(createInitialState());
  }

  public setTipoDeInversion(tipoDeInversion: Catalogo[]) {
    this.update((state) => ({
      ...state,
      tipoDeInversion,
    }));
  }

  public setValorEnPesos(valorEnPesos: number) {
    this.update((state) => ({
      ...state,
      valorEnPesos,
    }));
  }

  public setDescripcionGeneral(descripcionGeneral: string) {
    this.update((state) => ({
      ...state,
      descripcionGeneral,
    }));
  }

    public setListaDeDocumentos(listaDeDocumentos: string) {
    this.update((state) => ({
      ...state,
      listaDeDocumentos,
    }));
  }

    public setDatosDelContenedor(datosDelContenedor: datosDeLaTabla[]) {
    this.update((state) => ({
      ...state,
      datosDelContenedor,
    }));
  }
}
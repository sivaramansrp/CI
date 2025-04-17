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
  abc: datosDeLaTabla | null;
  manifiesto1: string;
  manifiesto2: string;
  manifiesto3: string;
  claveDeReferencia: number;
  importeDePago: number;
  cadenaDeLaDependencia: string;
  numeroDeOperacion: number;
  banco: Catalogo[] | null;
  llaveDePago: number;
  fechaInicialInput: string;

}

export function createInitialState(): Solicitud32101State {
  return {
    tipoDeInversion: null,
    valorEnPesos: 0,
    descripcionGeneral: '',
    listaDeDocumentos: '',
    datosDelContenedor: [],
    abc: null,
    manifiesto1: '',
    manifiesto2: '',  
    manifiesto3: '',
    claveDeReferencia: 0,
    importeDePago: 0,
    cadenaDeLaDependencia: '',
    numeroDeOperacion: 0,
    banco: null,
    llaveDePago: 0,
    fechaInicialInput: '',
    
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

  public setAbc(abc: datosDeLaTabla) {
    this.update((state) => ({
      ...state,
      abc,
    }));
  }

  public setManifiesto1(manifiesto1: string) {
    this.update((state) => ({
      ...state,
      manifiesto1,
    }));
  }

  public setManifiesto2(manifiesto2: string) {
    this.update((state) => ({
      ...state,
      manifiesto2,
    }));
  }

  public setManifiesto3(manifiesto3: string) {
    this.update((state) => ({
      ...state,
      manifiesto3,
    }));
  }

    public setClaveDeReferencia(claveDeReferencia: number) {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

      public setImporteDePago(importeDePago: number) {
    this.update((state) => ({
      ...state,
      importeDePago,
    }));
  }

      public setCadenaDeLaDependencia(cadenaDeLaDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaDeLaDependencia,
    }));
  }

        public setNumeroDeOperacion(numeroDeOperacion: number) {
    this.update((state) => ({
      ...state,
      numeroDeOperacion,
    }));
  }

    public setBanco(banco: Catalogo[]) {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

      public setLlaveDePago(llaveDePago: number) {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

        public setFechaInicialInput(fechaInicialInput: string) {
    this.update((state) => ({
      ...state,
      fechaInicialInput,
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
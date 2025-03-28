import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TableData } from '../../models/aviso-siglos.models';

import { catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite270201State {
  operacion: catalogoResponse | null;
  movimiento: catalogoResponse | null;
  motivo: catalogoResponse | null;
  pais: catalogoResponse | null;
  ciudad: string;
  transporte: catalogoResponse | null;
  aduana: catalogoResponse | null;
  autor: string;
  titulo: string;
  tecnica: string;
  alto: string;
  ancho: string;
  profundidad: string;
  diametro: string;
  variables: string;
  anoDeCreacion: string;
  avaluo: string;
  moneda: catalogoResponse | null;
  propietario: string;
  fraccionArancelaria: catalogoResponse | null;
  descripcionArancelaria: string;

  ObraDeArte: TableData[];
}

export function createInitialState(): Tramite270201State {
  return {
    operacion: null,
    movimiento: null,
    motivo: null,
    pais: null,
    ciudad: '',
    transporte: null,
    aduana: null,
    autor: '',
    titulo: '',
    tecnica: '',
    alto: '',
    ancho: '',
    profundidad: '',
    diametro: '',
    variables: '',
    anoDeCreacion: '',
    avaluo: '',
    moneda: null,
    propietario: '',
    fraccionArancelaria: null,
    descripcionArancelaria: '',

    ObraDeArte: [],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'avisoSiglosState', resettable: true })
export class Tramite270201Store extends Store<Tramite270201State> {
  constructor() {
    super(createInitialState());
  }

  public setOperacion(selectedOperacion: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedOperacion,
    }));
  }

  public setMovimiento(selectedMovimiento: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedMovimiento,
    }));
  }

  public setMotivo(selectedMotivo: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedMotivo,
    }));
  }

  public setPais(selectedPais: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedPais,
    }));
  }

  public setCiudad(selectedCiudad: string): void {
    this.update((state) => ({
      ...state,
      selectedCiudad,
    }));
  }

  public setTransporte(selectedTransporte: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedTransporte,
    }));
  }

  public setAduana(selectedAduana: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedAduana,
    }));
  }

  public setAutor(selectedAutor: string): void {
    this.update((state) => ({
      ...state,
      selectedAutor,
    }));
  }

  public setTitulo(selectedTitulo: string): void {
    this.update((state) => ({
      ...state,
      selectedTitulo,
    }));
  }

  public setTecnica(selectedTecnica: string): void {
    this.update((state) => ({
      ...state,
      selectedTecnica,
    }));
  }

  public setAlto(selectedAlto: string): void {
    this.update((state) => ({
      ...state,
      selectedAlto,
    }));
  }

  public setAncho(selectedAncho: string): void {
    this.update((state) => ({
      ...state,
      selectedAncho,
    }));
  }

  public setProfundidad(selectedProfundidad: string): void {
    this.update((state) => ({
      ...state,
      selectedProfundidad,
    }));
  }

  public setDiametro(selectedDiametro: string): void {
    this.update((state) => ({
      ...state,
      selectedDiametro,
    }));
  }

  public setVariables(selectedVariables: string): void {
    this.update((state) => ({
      ...state,
      selectedVariables,
    }));
  }

  public setAnoDeCreacion(selectedAnoDeCreacion: string): void {
    this.update((state) => ({
      ...state,
      selectedAnoDeCreacion,
    }));
  }

  public setAvaluo(selectedAvaluo: string): void {
    this.update((state) => ({
      ...state,
      selectedAvaluo,
    }));
  }

  public setMoneda(selectedMoneda: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedMoneda,
    }));
  }

  public setPropietario(selectedPropietario: string): void {
    this.update((state) => ({
      ...state,
      selectedPropietario,
    }));
  }

  public setFraccionArancelaria(
    selectedFraccionArancelaria: catalogoResponse
  ): void {
    this.update((state) => ({
      ...state,
      selectedFraccionArancelaria,
    }));
  }

  public setDescripcionArancelaria(
    selectedDescripcionArancelaria: string
  ): void {
    this.update((state) => ({
      ...state,
      selectedDescripcionArancelaria,
    }));
  }

  public setObraDeArte(obraDeArte: TableData[]): void {
    this.update((state) => ({
      ...state,
      ObraDeArte: obraDeArte,
    }));
  }
}

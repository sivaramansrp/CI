import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 220402
 * @returns Solicitud220402
 */
export interface Solicitud220402State {
  tipoDeCertificado: string;
  seccionAduanera: string;
  puntoDestino: string;
  paisDeDestino: string;
  paisDeProcedencia: string;
  rangoDeFechas: string;
  fechaInicio: string;
  fechaFinal: string;
  fraccionArancelaria: string;
  descdelaFraccion: string;
  cantidadUMT: string;
  UMT: string;
  cantidadUMC: string;
  UMC: string;
  paisdeOrigen: string;
  entidadFederativadeOrigen: string;
  municipiodeOrigen: string;
  datosOrigen: string[];
  marcasDistintivas: string;
  USO: string;
  numero: string;
  empaques: string;
  unidadDeVerify: string;
  terceroEspecialista: string;
  entidadFederative: string;
}

export function createInitialSolicitudState(): Solicitud220402State {
  return {
    tipoDeCertificado: '',
    seccionAduanera: '',
    puntoDestino: '',
    paisDeDestino: '',
    paisDeProcedencia: '',
    rangoDeFechas: '',
    fechaInicio: '',
    fechaFinal: '',
    fraccionArancelaria: '',
    descdelaFraccion: '',
    cantidadUMT: '',
    UMT: '',
    cantidadUMC: '',
    UMC: '',
    paisdeOrigen: '',
    entidadFederativadeOrigen: '',
    municipiodeOrigen: '',
    datosOrigen: [],
    marcasDistintivas: '',
    USO: '',
    numero: '',
    empaques: '',
    unidadDeVerify: '',
    terceroEspecialista: '',
    entidadFederative: ''
}
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud220402', resettable: true })
export class Solicitud220402Store extends Store<Solicitud220402State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  public setTipoDeCertificado(tipoDeCertificado: string) {
    this.update((state) => ({
      ...state,
      tipoDeCertificado
    }));
  }

  public setPuntoDestino(puntoDestino: string) {
    this.update((state) => ({
      ...state,
      puntoDestino
    }));
  }

  public setSeccionAduanera(seccionAduanera: string) {
    this.update((state) => ({
      ...state,
      seccionAduanera
    }));
  }

  public setPaisDeDestino(paisDeDestino: string) {
    this.update((state) => ({
      ...state,
      paisDeDestino
    }));
  }

  public setPaisDeProcedencia(paisDeProcedencia: string) {
    this.update((state) => ({
      ...state,
      paisDeProcedencia
    }));
  }

  public setRangoDeFechas(rangoDeFechas: string) {
    this.update((state) => ({
      ...state,
      rangoDeFechas
    }));
  }

  public setFechaInicio(fechaInicio: string) {
    this.update((state) => ({
      ...state,
      fechaInicio
    }));
  }

  public setFechaFinal(fechaFinal: string) {
    this.update((state) => ({
      ...state,
      fechaFinal
    }));
  }
  

}
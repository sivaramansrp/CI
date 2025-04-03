import { DatosSolicitante } from '../../tramites/32503/models/aviso-traslado.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Tramite32503State {

  pasoActivo: number;
  pestanaActiva: number;
  datosSolicitante: DatosSolicitante
}

export function createInitialState(): Tramite32503State {
  return {
    pasoActivo: 1,
    pestanaActiva: 2,
    datosSolicitante: {
      rfc: "",
      denominacion: "",
      actividadEconomica: "",
      correoElectronico: "",
      pais: "",
      codigoPostal: "",
      entidadFederativa: "",
      municipio: "",
      localidad: "",
      colonia: "",
      calle: "",
      nExt: "",
      nInt: "",
      lada: "",
      telefono: "",
      adace: "",
    },
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32503', resettable: true })
export class Tramite32503Store extends Store<Tramite32503State> {

  constructor() {
    super(createInitialState());
  }

  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }

  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }

  public setDatosSolicitante(datosSolicitante: DatosSolicitante): void {
    this.update((state) => ({
      ...state,
      datosSolicitante
    }));
  }
}

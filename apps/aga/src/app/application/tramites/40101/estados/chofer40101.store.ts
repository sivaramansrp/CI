import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface Choferesnacionales40101State {
  choferes: string [];
  choferesextranjero: string[];
  vehiculos: string[];
  unidadesdearrastre: string[];
}

export function createChoferState(): Choferesnacionales40101State {
  const STORED_DATA = localStorage.getItem('choferesList');
  return {
    choferes: STORED_DATA ? JSON.parse(STORED_DATA) : [],
    choferesextranjero: [],
    vehiculos: [],
    unidadesdearrastre: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chofer40101', resettable: true })
export class Chofer40101Store extends Store<Choferesnacionales40101State> {
  constructor() {
    super(createChoferState());
  }

  set(nacionalArray: string[]) {
    this.update((state) => ({
      ...state,
      choferes: nacionalArray,
    }));
  }
  setVehiculos(vehiculosArray: string[]) {
    this.update((state) => ({
      ...state,
      vehiculos: [...vehiculosArray],
    }));
  }

  setUnidadesdeArrastre(unidadesdearrastreArray: string[]) {
    this.update((state) => ({
      ...state,
      unidadesdearrastre: unidadesdearrastreArray, 
    }));
  }
  public setsolicitudVehiculoTipoVehiculo(solicitudVehiculo: string) {
    console.log('Updating Store:', solicitudVehiculo); 
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }
  public setsolicitudVehiculoPaisEmisor(paisEmisor: string) {
    console.log('Updating Store:', paisEmisor); 
    this.update((state) => ({
      ...state,
      paisEmisor,
    }));
  }
  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }
  public clearChoferes() {
    this.reset(); 
  }
}

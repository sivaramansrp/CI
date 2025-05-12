import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

export interface Tramite40102State {
  choferes: string[];
  choferesextranjero: string[];
  vehiculos: string[];
  unidadesdearrastre: string[];
  estado: Catalogo[];
  seccion: boolean[];
  formaValida: boolean[];
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
}

export function create4012State(): Tramite40102State {
  const STORED_DATA = localStorage.getItem('choferesList');
  return {
    choferes: STORED_DATA ? JSON.parse(STORED_DATA) : [],
    choferesextranjero: [],
    vehiculos: [],
    unidadesdearrastre: [],
    estado: [],
    seccion: [],
    formaValida: [],
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite40102', resettable: true })
export class Tramite40102Store extends Store<Tramite40102State> {
  constructor() {
    super(create4012State());
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
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }
    public setsolicitudVehiculoPaisEmisor(solicitudVehiculo: string) {
      this.update((state) => ({
        ...state,
        solicitudVehiculo,
      }));
    }
    public solicitudVehiculoColor(vehiculoColor: string) {
      this.update((state) => ({
        ...state,
        vehiculoColor,
      }));
    }
    public VehiculoPaisEmisor2daPlaca(PaisEmisor2daPlaca: string) {
      this.update((state) => ({
        ...state,
        PaisEmisor2daPlaca,
      }));
    }
    public setanioVehiculoVEH(VehiculoVEH: string) {
      this.update((state) => ({
        ...state,
        VehiculoVEH,
      }));
    }
  setEstado(estado: Catalogo[]) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }
  
  public clearChoferes() {
    this.reset();
  }
}

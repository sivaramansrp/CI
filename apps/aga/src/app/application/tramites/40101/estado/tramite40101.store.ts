import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import {StoreConfig } from '@datorama/akita';
export interface Tramite40101State {
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

export function create40101State(): Tramite40101State {
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
@StoreConfig({ name: 'tramite40101', resettable: true })
export class Tramite40101Store extends Store<Tramite40101State> {
  constructor() {
    super(create40101State());
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
   /**
   * Guarda un elemento por cada sección que se encuentre.
   * @param seccion La validación de la sección.
   */
   public establecerSeccion(seccion: boolean[]) {
    this.update((state) => ({
      ...state,
      seccion,
    }));
  }

  /**
   * Agrega elementos por cada sección indicando si el formulario es válido o no.
   * @param formaValida La validación del formulario.
   */
  public establecerFormaValida(formaValida: boolean[]) {
    this.update((state) => ({
      ...state,
      formaValida,
    }));
  }
  
  public clearChoferes() {
    this.reset();
  }
}

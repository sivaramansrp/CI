import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
export interface Choferesnacionales40103State {
  choferes: string[];
  choferesExtranjero: string[];
  vehiculos: string[];
  unidadesDeArrastre: string[];
  estado: Catalogo[];
  seccion: boolean[];
  formaValida: boolean[];
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
}

export function createChoferState(): Choferesnacionales40103State {
  const STORED_DATA = localStorage.getItem('choferesList');
  return {
    choferes: STORED_DATA ? JSON.parse(STORED_DATA) : [],
    choferesExtranjero: [],
    vehiculos: [],
    unidadesDeArrastre: [],
    estado: [],
    seccion: [],
    formaValida: [],
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chofer40103', resettable: true })
export class Chofer40103Store extends Store<Choferesnacionales40103State> {
  constructor() {
    super(createChoferState());
  }

  /**
   * Establece la lista de choferes nacionales.
   * @param nacionalArray La lista de choferes nacionales.
   */
  set(nacionalArray: string[]) {
    this.update((state) => ({
      ...state,
      choferes: nacionalArray,
    }));
  }

  /**
   * Establece la lista de vehículos.
   * @param vehiculosArray La lista de vehículos.
   */
  setVehiculos(vehiculosArray: string[]) {
    this.update((state) => ({
      ...state,
      vehiculos: [...vehiculosArray],
    }));
  }

  /**
   * Establece la lista de unidades de arrastre.
   * @param unidadesdearrastreArray La lista de unidades de arrastre.
   */
  setUnidadesdeArrastre(unidadesdearrastreArray: string[]) {
    this.update((state) => ({
      ...state,
      unidadesdearrastre: unidadesdearrastreArray,
    }));
  }

  /**
   * Establece el tipo de vehículo de la solicitud.
   * @param solicitudVehiculo El tipo de vehículo de la solicitud.
   */
  public setsolicitudVehiculoTipoVehiculo(solicitudVehiculo: string) {
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }

  /**
   * Establece el país emisor del vehículo de la solicitud.
   * @param solicitudVehiculo El país emisor del vehículo de la solicitud.
   */
  public setsolicitudVehiculoPaisEmisor(solicitudVehiculo: string) {
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }

  /**
   * Establece el color del vehículo de la solicitud.
   * @param vehiculoColor El color del vehículo de la solicitud.
   */
  public solicitudVehiculoColor(vehiculoColor: string) {
    this.update((state) => ({
      ...state,
      vehiculoColor,
    }));
  }

  /**
   * Establece el país emisor de la segunda placa del vehículo.
   * @param PaisEmisor2daPlaca El país emisor de la segunda placa del vehículo.
   */
  public VehiculoPaisEmisor2daPlaca(PaisEmisor2daPlaca: string) {
    this.update((state) => ({
      ...state,
      PaisEmisor2daPlaca,
    }));
  }

  /**
   * Establece el año del vehículo.
   * @param VehiculoVEH El año del vehículo.
   */
  public setanioVehiculoVEH(VehiculoVEH: string) {
    this.update((state) => ({
      ...state,
      VehiculoVEH,
    }));
  }

  /**
   * Establece la lista de estados.
   * @param estado La lista de estados.
   */
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

  /**
   * Limpia la lista de choferes.
   */
  public clearChoferes():void {
    this.reset();
  }
}

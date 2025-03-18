import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Injectable } from '@angular/core';
import { Store} from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
export interface Choferesnacionales40101State {
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

export function createChoferState(): Choferesnacionales40101State {
  const STORED_DATA = localStorage.getItem('choferesList');
  return {
    choferes: STORED_DATA ? JSON.parse(STORED_DATA) : [],
    choferesextranjero: [],
    vehiculos: [],
    unidadesdearrastre: [],
    estado: [],
    seccion: [],
    formaValida: [],
    nombre: "",
    primerApellido: "",
    segundoApellido: ""
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chofer40101', resettable: true })
export class Chofer40101Store extends Store<Choferesnacionales40101State> {
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
    console.log('Updating Store:', solicitudVehiculo);
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
    console.log('Updating Store:', solicitudVehiculo);
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
    console.log('Updating Store:', vehiculoColor);
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
    console.log('Updating Store:', PaisEmisor2daPlaca);
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
    console.log('Updating Store:', VehiculoVEH);
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
  public clearChoferes() {
    this.reset();
  }
}
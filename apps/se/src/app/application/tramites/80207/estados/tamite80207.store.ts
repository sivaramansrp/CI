import {
  DatosSubcontratista,
  InfoRegistro,
  SubmanufacturerDatos,
  SubmanufacturerDireccionModelo,
} from '../modelos/submanufacturer-modelos';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export function createInitialState(): SubmanufacturerDatos {
  const INFO_REGISTRO: InfoRegistro = {
    modalidad: '',
    folio: '',
    ano: 0,
  };
  const DATOS_SUBCONTRATISTA: DatosSubcontratista = {
    rfc: '',
    estado: '',
  };
  return {
    infoRegistro: INFO_REGISTRO,
    datosSubcontratista: DATOS_SUBCONTRATISTA,
    plantasSubfabricantesAgregar: [],
    plantasSubfabricantesEliminar: [],
  };
}

/**
 * Tramite entity store
 *
 * @export
 * @class Tramites80207Store
 * @extends {Store<TramiteState>}
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite-80207', resettable: true })
export class Tramites80207Store extends Store<SubmanufacturerDatos> {
  /**
   * Actualiza el estado del store con la información del registro proporcionada.
   *
   * Este método recibe un objeto de tipo `InfoRegistro` y actualiza la propiedad `infoRegistro`
   * en el estado actual utilizando el método `update`.
   *
   * @method setInfoRegistro
   * @param {InfoRegistro} infoRegistro - Información del registro que se quiere almacenar en el estado.
   */
  public setInfoRegistro(infoRegistro: InfoRegistro): void {
    this.update((state) => ({
      ...state,
      infoRegistro: infoRegistro,
    }));
  }

  /**
   * Actualiza el estado del store con los datos del subcontratista proporcionados.
   *
   * Este método recibe un objeto de tipo `DatosSubcontratista` y actualiza la propiedad
   * `datosSubcontratista` en el estado actual utilizando el método `update`.
   *
   * @method setDatosContr
   * @param {DatosSubcontratista} datosSubcontratista - Datos del subcontratista que se quieren almacenar en el estado.
   */
  setDatosContr(datosSubcontratista: DatosSubcontratista): void {
    this.update((state) => ({
      ...state,
      datosSubcontratista: datosSubcontratista,
    }));
  }

  /**
   * Actualiza el estado del store con la lista de plantas subfabricantes a agregar.
   *
   * Este método recibe un arreglo de objetos de tipo `SubmanufacturerDireccionModelo` y
   * actualiza la propiedad `plantasSubfabricantesAgregar` en el estado actual utilizando el método `update`.
   *
   * @method setPlantasSubfabricantesAgregar
   * @param {SubmanufacturerDireccionModelo[]} plantasSubfabricantesAgregar - Lista de plantas subfabricantes a agregar al estado.
   */
  setPlantasSubfabricantesAgregar(
    plantasSubfabricantesAgregar: SubmanufacturerDireccionModelo[]
  ): void {
    this.update((state) => ({
      ...state,
      plantasSubfabricantesAgregar: plantasSubfabricantesAgregar,
    }));
  }

  /**
   * Actualiza el estado del store con la lista de plantas subfabricantes a eliminar.
   *
   * Este método recibe un arreglo de objetos de tipo `SubmanufacturerDireccionModelo` y
   * actualiza la propiedad `plantasSubfabricantesEliminar` en el estado actual utilizando el método `update`.
   *
   * @method setPlantasSubfabricantesEliminar
   * @param {SubmanufacturerDireccionModelo[]} plantasSubfabricantesEliminar - Lista de plantas subfabricantes a eliminar del estado.
   */
  setPlantasSubfabricantesEliminar(
    plantasSubfabricantesEliminar: SubmanufacturerDireccionModelo[]
  ): void {
    this.update((state) => ({
      ...state,
      plantasSubfabricantesEliminar: plantasSubfabricantesEliminar,
    }));
  }

  /**
   * Constructor que inicializa el estado del store con el valor inicial.
   *
   * Este constructor llama al método `super` para establecer el estado inicial del store utilizando
   * la función `createInitialState`.
   *
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }
}

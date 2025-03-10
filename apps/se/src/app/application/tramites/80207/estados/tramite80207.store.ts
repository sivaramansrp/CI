import {
  DatosSubcontratista,
  InfoRegistro,
  SubfabricanteDireccionModelo,
  Tramite80207State,
} from '../modelos/subfabricante.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export function createInitialState(): Tramite80207State {
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
    formaValida: {
      esDatosSubcontratistaValido: false
    },
    plantasBuscadas:[],
    plantasSubfabricantesAgregar: [],
    

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
export class Tramites80207Store extends Store<Tramite80207State> {
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
   * Este método recibe un arreglo de objetos de tipo `SubfabricanteDireccionModelo` y
   * actualiza la propiedad `plantasSubfabricantesAgregar` en el estado actual utilizando el método `update`.
   *
   * @method setPlantasSubfabricantesAgregar
   * @param {SubfabricanteDireccionModelo[]} plantasSubfabricantesAgregar - Lista de plantas subfabricantes a agregar al estado.
   */
  setPlantasSubfabricantesAgregar(
    plantasSubfabricantesAgregar: SubfabricanteDireccionModelo[]
  ): void {
    this.update((state) => ({
      ...state,
      plantasSubfabricantesAgregar: plantasSubfabricantesAgregar,
    }));
  }

   /**
   * Establece el estado de validación del formulario en el almacén.
   * 
   * @param {Object} formaValida - Un objeto donde las claves son los nombres de los campos del formulario y los valores son booleanos que indican si el campo es válido o no.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
   setFormValida(formaValida: { [key: string]: boolean }) :void {
    this.update(state => {
      const IS_VALID = {...state.formaValida, ...formaValida}
      return {
        ...state,
        formaValida: IS_VALID
      }
    })
  }

  setPlantasBuscadas(plantasBuscadas:SubfabricanteDireccionModelo[]):void{
    this.update((state) => ({
      ...state,
      plantasBuscadas: plantasBuscadas,
    }));
  }

    eliminarPlantas(eliminarPlantas:SubfabricanteDireccionModelo[]): void {
      this.update(state => {
        const PLANTAS = [...state.plantasSubfabricantesAgregar].filter(ele => 
          !eliminarPlantas.some((plantas)=>plantas.calle===ele.calle)
        );
        return {
          ...state,
          plantasSubfabricantesAgregar: PLANTAS
        }
      })
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

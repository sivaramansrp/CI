import {
  DatosSubcontratista,
  DomicilioPayload,
  InfoRegistro,
  PlantasDireccionModelo,
  SubfabricanteDireccionModelo,
  Tramite80207State,
} from '../modelos/subfabricante.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * @function createInitialState
 * @description Crea el estado inicial para el trámite 80207.
 * 
 * @returns {Tramite80207State} El estado inicial del trámite 80207.
 * 
 * @property {InfoRegistro} infoRegistro - Información del registro inicial, incluyendo modalidad, folio y año.
 * @property {DatosSubcontratista} datosSubcontratista - Información del subcontratista, incluyendo RFC y estado.
 * @property {Object} formaValida - Validación de la forma, indicando si los datos del subcontratista son válidos.
 * @property {boolean} formaValida.esDatosSubcontratistaValido - Indica si los datos del subcontratista son válidos.
 * @property {Array} plantasBuscadas - Lista inicial de plantas buscadas (vacía por defecto).
 * @property {Array} plantasSubfabricantesAgregar - Lista inicial de plantas subfabricantes a agregar (vacía por defecto).
 */
export function createInitialState(): Tramite80207State {

  const INFO_REGISTRO: InfoRegistro = {
    /**
     * Modalidad del registro.
     * @property {string} modalidad
     */
    modalidad: '',

    /**
     * Folio asociado al registro.
     * @property {string} folio
     */
    folio: '',

    /**
     * Año del registro.
     * @property {number} ano
     */
    ano: 0,
  };

  const DATOS_SUBCONTRATISTA: DatosSubcontratista = {
    rfc: '',
    estado: '-1',
  };

  return {
    idSolicitud: 202792606,

    /**
     * Información del registro inicial.
     * @property {InfoRegistro} infoRegistro
     */
    infoRegistro: INFO_REGISTRO,

    /**
     * Información del subcontratista.
     * @property {DatosSubcontratista} datosSubcontratista
     */
    datosSubcontratista: DATOS_SUBCONTRATISTA,

    /**
     * Validación de la forma.
     * @property {Object} formaValida
     */
    formaValida: {
      /**
       * Indica si los datos del subcontratista son válidos.
       * @property {boolean} esDatosSubcontratistaValido
       */
      esDatosSubcontratistaValido: false,
    },

    /**
     * Lista inicial de plantas buscadas.
     * @property {SubfabricanteDireccionModelo[]} plantasBuscadas
     */
    plantasBuscadas: [],
     
    /**
     * Lista de plantas que se agregarán al subfabricante.
     * @property {PlantasDireccionModelo[]}
      plantas
      */

    plantas: [],

    /**
     * Lista inicial de plantas subfabricantes a agregar.
     * @property {SubfabricanteDireccionModelo[]} plantasSubfabricantesAgregar
     */
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

/**
 * @description
 * Este archivo contiene la definición de la clase `Tramites80207Store`, que extiende la funcionalidad de la clase `Store` 
 * para gestionar el estado relacionado con los trámites del tipo 80207. Proporciona métodos para actualizar y manipular 
 * diferentes propiedades del estado, como información de registro, datos de subcontratistas, plantas subfabricantes, 
 * validación de formularios y más.
 **/
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
    * Guarda el ID de la solicitud en el estado.
    *
    * @param idSolicitud - El ID de la solicitud que se va a guardar.
    */
  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
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
    plantasSubfabricantesAgregar: PlantasDireccionModelo[]
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

  /**
   * Establece la lista de plantas buscadas en el estado de la tienda.
   *
   * @param plantasBuscadas - Un arreglo de objetos del tipo `SubfabricanteDireccionModelo` 
   * que representa las plantas buscadas.
   */
  setPlantasBuscadas(plantasBuscadas:SubfabricanteDireccionModelo[]):void{
    this.update((state) => ({
      ...state,
      plantasBuscadas: plantasBuscadas,
    }));
  }

 /**
 * @method setPlantas
 * @description
 * Establece la lista de plantas en el estado actual, reemplazando cualquier valor existente.
 * 
 * @param {PlantasDireccionModelo[]} plantas - Lista de plantas a establecer en el estado.
 */
setPlantas(plantas: PlantasDireccionModelo[]): void {
  this.update((state) => ({ 
    ...state,
    plantas: plantas
  }));
}

/**
 * @method addPlantas
 * @description
 * Agrega una lista de plantas al estado actual, manteniendo las plantas existentes.
 * 
 * @param {PlantasDireccionModelo[]} plantas - Lista de plantas a agregar al estado.
 */
addPlantas(plantas: PlantasDireccionModelo[]): void {
  this.update((state) => ({
    ...state,
    plantas: [...state.plantas, ...plantas],
  }));
}

/**
 * @method addPlantasBuscadas
 * @description
 * Agrega una lista de plantas buscadas al estado actual, manteniendo las plantas buscadas existentes.
 * 
 * @param {SubfabricanteDireccionModelo[]} plantasBuscadas - Lista de plantas buscadas a agregar al estado.
 */
addPlantasBuscadas(plantasBuscadas: SubfabricanteDireccionModelo[]): void {
  this.update((state) => ({
    ...state,
    plantasBuscadas: [...state.plantasBuscadas, ...plantasBuscadas],
  }));
}

/**
 * @method eliminarPlantas
 * @description
 * Elimina una o más plantas del estado actual.
 * 
 * @param {PlantasDireccionModelo[]} plantasAEliminar - Lista de plantas a eliminar.
 */
eliminarPlantas(plantasAEliminar: PlantasDireccionModelo[]): void {
  this.update((state) => ({
    ...state,
    plantas: state.plantas.filter(
      (planta) => !plantasAEliminar.some((eliminar) => eliminar.calle=== planta.calle)
    ),
  }));
}
      



    /**
     * Elimina las plantas especificadas de la lista de plantasSubfabricantesAgregar en el estado.
     *
     * @param eliminarPlantas - Un arreglo de objetos del tipo `SubfabricanteDireccionModelo` que representa
     * las plantas que se deben eliminar. Se comparan las propiedades `calle` de los objetos para determinar
     * cuáles eliminar.
     *
     * @remarks
     * Este método actualiza el estado utilizando el patrón inmutable, creando una nueva lista de plantas
     * que excluye las plantas especificadas en el parámetro `eliminarPlantas`.
     */
    /*
    eliminarPlantas(eliminarPlantas:PlantasDireccionModelo[]): void {
      this.update(state => {
        const PLANTAS = [...state.plantas].filter(ele => 
          !eliminarPlantas.some((plantas)=>plantas.calle===ele.calle)
        );
        return {
          ...state,
          plantas: PLANTAS
        }
      })
    }
*/
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

export const DEFAULT_DOMICILIO: DomicilioPayload = {
  idDomicilio: 0,
  calle: '',
  numeroExterior: '',
  numeroInterior: '',
  codigoPostal: '',
  informacionExtra: '',
  clave: '',
  cveLocalidad: '',
  cveDelegMun: '',
  cveEntidad: '',
  cvePais: '',
  ciudad: '',
  telefono: '',
  fax: '',
  municipio: '',
  colonia: '',
  descUbicacion: '',
  cveCatalogo: '',
  telefonos: '',
  tipoDomicilio: 0,
};

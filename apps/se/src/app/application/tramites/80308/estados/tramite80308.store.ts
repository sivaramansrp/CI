import { DatosModificacion, DomicilioInfo } from '../models/plantas-consulta.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';

export interface TramiteState {
  datosModificacion: DatosModificacion;
  altaPlanta: Catalogo[];
  estado: Catalogo;
  formaValida: { [key: string]: boolean };
  domicilios: DomicilioInfo[];
  buscarDomicilios: DomicilioInfo[];
}

export const INITIAL_STATE: TramiteState = {
  datosModificacion: {
    rfc: '',
    representacionFederal: '',
    tipoModalidad: '',
    descripcionModalidad: '',
  },
  altaPlanta: [],
  estado: {
    id: -1,
    descripcion: '',
  },
  formaValida: {
    entidadFederativa: false
  },
  domicilios:[],
  buscarDomicilios: []
};

/**
 * Tramite entity store
 *
 * @export
 * @class TramiteStore
 * @extends {Store<TramiteState>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-80308', resettable: true })
export class Tramite80308Store extends Store<TramiteState> {
  constructor() {
    super(INITIAL_STATE);
  }

  /**
   * Establece los datos de modificación en el estado.
   * 
   * @param {DatosModificacion} datosModificacion - Los datos de modificación que se van a establecer en el estado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosModificacion(datosModificacion: DatosModificacion): void {
    this.update((state) => ({
      ...state,
      datosModificacion,
    }));
  }

  /**
   * Establece el estado en el almacén.
   * 
   * @param {Catalogo} estado - El estado que se va a establecer en el almacén.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Establece el alta de plantas en el almacén.
   * 
   * @param {Catalogo[]} altaPlanta - Un array de objetos `Catalogo` que representa las plantas a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setaltaPlanta(altaPlanta: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      altaPlanta,
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
   * Establece la lista de domicilios en el almacén.
   * 
   * @param {DomicilioInfo[]} domicilios - Un array de objetos `DomicilioInfo` que representa la lista de domicilios.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDomicilios(domicilios: DomicilioInfo[]): void {
    this.update((state) => ({
      ...state,
      domicilios,
    }));
  }

  /**
   * Elimina un domicilio de la lista de domicilios en el almacén.
   * 
   * @param {DomicilioInfo} eliminarDomicilios - El objeto `DomicilioInfo` que representa el domicilio a eliminar.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  eliminarDomicilios(eliminarDomicilios: DomicilioInfo): void {
    this.update(state => {
      const DOMICILIOS = [...state.domicilios].filter(ele => ele.id !== eliminarDomicilios.id);
      return {
        ...state,
        domicilios: DOMICILIOS
      }
    })
  }

  /**
   * Agrega un domicilio a la lista de domicilios en el almacén.
   * 
   * @param {DomicilioInfo} domicilios - El objeto `DomicilioInfo` que representa el domicilio a agregar.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  aggregarDomicilios(domicilios: DomicilioInfo): void {
    this.update(state => {
      const DOMICILIOS = [...state.domicilios , domicilios];
      return {
        ...state,
        domicilios: DOMICILIOS
      }
    })
  }

  /**
   * Establece los domicilios que se van a buscar en el almacén.
   * 
   * @param {DomicilioInfo[]} buscarDomicilios - Un array de objetos `DomicilioInfo` que representa la lista de domicilios que se van a buscar.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setbuscarDomicilios(buscarDomicilios: DomicilioInfo[]): void {
    this.update((state) => ({
      ...state,
      buscarDomicilios,
    }));
  }
}

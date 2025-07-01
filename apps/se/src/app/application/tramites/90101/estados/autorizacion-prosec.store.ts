import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

/**
 * @interface ProsecState
 * @description
 * Interfaz que define la estructura del estado utilizado en el flujo del trámite de autorización PROSEC.
 * Contiene todas las propiedades necesarias para almacenar la información y el estado de validación de cada sección del formulario.
 * 
 * - modalidad: Modalidad seleccionada en el trámite.
 * - Estado: Lista de estados seleccionados.
 * - RepresentacionFederal: Lista de representaciones federales seleccionadas.
 * - ActividadProductiva: Lista de actividades productivas seleccionadas.
 * - Sector: Lista de sectores seleccionados.
 * - Fraccion_arancelaria: Fracción arancelaria seleccionada.
 * - contribuyentes: Contribuyentes registrados.
 * - domiciliosFormaValida: Indica si el formulario de domicilios es válido.
 * - productorFromValida: Indica si el formulario del productor es válido.
 * - sectoresFromValida: Indica si el formulario de sectores es válido.
 */
export interface ProsecState {
  /**
   * @property {string} modalidad
   * @description
   * Modalidad seleccionada en el trámite.
   */
  modalidad: string;

  /**
   * @property {Catalogo[]} Estado
   * @description
   * Lista de estados seleccionados.
   */
  Estado: Catalogo[];

  /**
   * @property {Catalogo[]} RepresentacionFederal
   * @description
   * Lista de representaciones federales seleccionadas.
   */
  RepresentacionFederal: Catalogo[];

  /**
   * @property {Catalogo[]} ActividadProductiva
   * @description
   * Lista de actividades productivas seleccionadas.
   */
  ActividadProductiva: Catalogo[];

  /**
   * @property {Catalogo[]} Sector
   * @description
   * Lista de sectores seleccionados.
   */
  Sector: Catalogo[];

  /**
   * @property {string} Fraccion_arancelaria
   * @description
   * Fracción arancelaria seleccionada.
   */
  Fraccion_arancelaria: string;

  /**
   * @property {string} contribuyentes
   * @description
   * Contribuyentes registrados.
   */
  contribuyentes: string;

  /**
   * @property {boolean} domiciliosFormaValida
   * @description
   * Indica si el formulario de domicilios es válido.
   */
  domiciliosFormaValida: boolean;

  /**
   * @property {boolean} productorFromValida
   * @description
   * Indica si el formulario del productor es válido.
   */
  productorFromValida: boolean;

  /**
   * @property {boolean} sectoresFromValida
   * @description
   * Indica si el formulario de sectores es válido.
   */
  sectoresFromValida: boolean;
}

/**
 * @function createInitialState
 * @method createInitialState
 * @description
 * Retorna el estado inicial para el store de autorización PROSEC.
 * Inicializa todas las propiedades del estado con valores por defecto, asegurando que el formulario comience limpio y sin datos previos.
 * 
 * @returns {ProsecState} Estado inicial con valores por defecto para cada campo del trámite PROSEC.
 */
export function createInitialState(): ProsecState {
  return {
    modalidad: '',
    Estado: [],
    RepresentacionFederal: [],
    ActividadProductiva: [],
    Sector: [],
    Fraccion_arancelaria: '',
    contribuyentes: '',
    domiciliosFormaValida: false,
    productorFromValida: false,
    sectoresFromValida: false,
  };
}

/**
 * @class AutorizacionProsecStore
 * @description
 * Store encargado de gestionar el estado del formulario PROSEC.
 * Permite almacenar y actualizar la información relacionada con el trámite de autorización PROSEC,
 * incluyendo modalidad, estados, representaciones federales, actividades productivas, sectores, fracción arancelaria,
 * contribuyentes y la validez de los formularios de domicilios, productor y sectores.
 * Utiliza Akita para el manejo reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class AutorizacionProsecStore extends Store<ProsecState> {
  /**
   * @constructor
   * @description Inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setModalidad
   * @description
   * Establece la modalidad seleccionada en el estado.
   * @param {string} modalidad Modalidad seleccionada.
   * @returns {void}
   */
  public setModalidad(modalidad: string): void {
    this.update((state) => ({ ...state, modalidad }));
  }

  /**
   * @method setEstado
   * @description
   * Establece los estados seleccionados en el estado.
   * @param {Catalogo[]} Estado Lista de estados.
   * @returns {void}
   */
  public setEstado(Estado: Catalogo[]): void {
    this.update((state) => ({ ...state, Estado }));
  }

  /**
   * @method setRepresentacionFederal
   * @description
   * Establece la representación federal en el estado.
   * @param {Catalogo[]} RepresentacionFederal Lista de representaciones.
   * @returns {void}
   */
  public setRepresentacionFederal(RepresentacionFederal: Catalogo[]): void {
    this.update((state) => ({ ...state, RepresentacionFederal }));
  }

  /**
   * @method setActividadProductiva
   * @description
   * Establece la actividad productiva en el estado.
   * @param {Catalogo[]} ActividadProductiva Lista de actividades.
   * @returns {void}
   */
  public setActividadProductiva(ActividadProductiva: Catalogo[]): void {
    this.update((state) => ({ ...state, ActividadProductiva }));
  }

  /**
   * @method setSector
   * @description
   * Establece los sectores seleccionados en el estado.
   * @param {Catalogo[]} Sector Lista de sectores.
   * @returns {void}
   */
  public setSector(Sector: Catalogo[]): void {
    this.update((state) => ({ ...state, Sector }));
  }

  /**
   * @method setFraccionArancelaria
   * @description
   * Establece la fracción arancelaria en el estado.
   * @param {string} Fraccion_arancelaria Fracción seleccionada.
   * @returns {void}
   */
  public setFraccionArancelaria(Fraccion_arancelaria: string): void {
    this.update((state) => ({ ...state, Fraccion_arancelaria }));
  }

  /**
   * @method setcontribuyentes
   * @description
   * Establece los contribuyentes registrados en el estado.
   * @param {string} contribuyentes RFC o nombre.
   * @returns {void}
   */
  public setcontribuyentes(contribuyentes: string): void {
    this.update((state) => ({ ...state, contribuyentes }));
  }

  /**
   * @method setDomiciliosFormaValida
   * @description
   * Valida el formulario de domicilios y actualiza el estado.
   * @param {boolean} domiciliosFormaValida Valor booleano.
   * @returns {void}
   */
  public setDomiciliosFormaValida(domiciliosFormaValida: boolean): void {
    this.update((state) => ({ ...state, domiciliosFormaValida }));
  }

  /**
   * @method setProductorFromValida
   * @description
   * Valida el formulario del productor y actualiza el estado.
   * @param {boolean} productorFromValida Valor booleano.
   * @returns {void}
   */
  public setProductorFromValida(productorFromValida: boolean): void {
    this.update((state) => ({ ...state, productorFromValida }));
  }

  /**
   * @method setSectoresFromValida
   * @description
   * Valida el formulario de sectores y actualiza el estado.
   * @param {boolean} sectoresFromValida Valor booleano.
   * @returns {void}
   */
  public setSectoresFromValida(sectoresFromValida: boolean): void {
    this.update((state) => ({ ...state, sectoresFromValida }));
  }
}

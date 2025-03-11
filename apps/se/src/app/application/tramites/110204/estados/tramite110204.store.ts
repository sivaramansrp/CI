/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Mercancia } from '../models/plantas-consulta.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';

export interface TramiteState {
  idiomaDatos: Catalogo[];
  entidadFederativaDatos: Catalogo[];
  representacionFederalDatos: Catalogo[];
  altaPlanta: Catalogo[];
  estado: Catalogo;
  paisBloques: Catalogo[];
  paisBloque: Catalogo;
  formaValida: { [key: string]: boolean };
  buscarMercancia: Mercancia[];
  
}
export interface Solicitud110204State{
  regimenMercancia: string;
  clasifiRegimen: string;
  valueTA: string;
  fraccionArancelaria: string;
  nico: string;
  unidadMedidaTarifaria: string;
  cantidadTarifaria: number;
  valorFacturaUSD: number;
  precioUnitarioUSD: string;
  paisOrigen: string;
  paisDestino: string;
  lote: string;
  fechaSalida: string;
  observaciones: string;
  observacionMerc: string;
  tipoPersona: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial: string;
  molino: string;
  domicilio: string;
  estado: string;
  paisBloque:string
  representacionFederal: string;
}
export const INITIAL_STATE: TramiteState = {
  altaPlanta: [],
  paisBloques: [],
  estado: {
    id: -1,
    descripcion: '',
  },
  formaValida: {
    entidadFederativa: false
  },
  buscarMercancia: [],
  paisBloque: {
    id: -1,
    descripcion: '',
  },
  idiomaDatos: [],
  entidadFederativaDatos: [],
  representacionFederalDatos: [],

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
export class Tramite110204Store extends Store<TramiteState> {
  constructor() {
    super(INITIAL_STATE);
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
   * @param {Catalogo[]} paisBloques - Un array de objetos `Catalogo` que representa las plantas a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
    setBloque(paisBloques: Catalogo[]): void {
      this.update((state) => ({
        ...state,
        paisBloques,
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

  setbuscarMercancia(buscarMercancia: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      buscarMercancia,
    }));
  }
  public setRegimenMercancia(regimenMercancia: string) {
    this.update((state) => ({
      ...state,
      regimenMercancia,
    }));
  }

  public setClasifiRegimen(clasifiRegimen: string) {
    this.update((state) => ({
      ...state,
      clasifiRegimen,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setNico(nico: string) {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  public setUnidadMedidaTarifaria(unidadMedidaTarifaria: string) {
    this.update((state) => ({
      ...state,
      unidadMedidaTarifaria,
    }));
  }

  public setPaisOrigen(paisOrigen: string) {
    this.update((state) => ({
      ...state,
      paisOrigen,
    }));
  }

  public setPaisDestino(paisDestino: string) {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }

  public setMolino(molino: string) {
    this.update((state) => ({
      ...state,
      molino,
    }));
  }
  public setRepresentacionFederal(representacionFederal: string) {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }

  setRepresentacionFederalDatos(representacionFederalDatos: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      representacionFederalDatos,
    }));
  }
setEntidadFederativaDatos(entidadFederativaDatos: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      entidadFederativaDatos,
    }));
  }
  public setIdiomaDatos(idiomaDatos: Catalogo[]):void {
    this.update((state) => ({
      ...state,
      idiomaDatos,
    }));
  }

}

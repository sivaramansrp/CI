import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import {Mercancia } from '../models/plantas-consulta.model';
export interface TramiteState {
  idiomaDatos: Catalogo[];
  entidadFederativaDatos: Catalogo[];
  representacionFederalDatos: Catalogo[];
  altaPlanta: Catalogo[];
  estado: Catalogo;
  paisBloques: Catalogo[];
  paisBloque: Catalogo;
  formCertificado: { [key: string]: undefined | boolean | string | number | object };
  formDatesCerticado: { [key: string]: undefined | boolean | string | number | object };
  buscarMercancia: Mercancia[];
  formaValida: { [key: string]: boolean };
  
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
  formaValida:{},
  formCertificado: {
    entidadFederativa:'',
    tercerOperador:false ,
    bloque:'',
    nombreComercialForm: '',
    registroProductoForm: '',
    fracciónArancelariaForm: '',
  },
  formDatesCerticado: {
    observacionesDates:'',
    idiomaDates:'',
    EntidadFederativaDates:'',
    representacionFederalDates:'',
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
  setFormDatesCerticado(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update(state => ({
      formDatesCerticado: {
        ...state.formDatesCerticado,
        ...values
      }
    }));
  }
  
  setFormCertificado(values: {[key: string]: undefined | boolean | string | number | object}): void {
    this.update(state => ({
      formCertificado: {
        ...state.formCertificado,
        ...values
      }
    }));
  }

  setbuscarMercancia(buscarMercancia: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      buscarMercancia,
    }));
  }
  public setRegimenMercancia(regimenMercancia: string):void {
    this.update((state) => ({
      ...state,
      regimenMercancia,
    }));
  }

  public setClasifiRegimen(clasifiRegimen: string):void {
    this.update((state) => ({
      ...state,
      clasifiRegimen,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string):void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setNico(nico: string):void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  public setUnidadMedidaTarifaria(unidadMedidaTarifaria: string):void {
    this.update((state) => ({
      ...state,
      unidadMedidaTarifaria,
    }));
  }

  public setPaisOrigen(paisOrigen: string):void {
    this.update((state) => ({
      ...state,
      paisOrigen,
    }));
  }

  public setPaisDestino(paisDestino: string):void {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }

  public setMolino(molino: string):void {
    this.update((state) => ({
      ...state,
      molino,
    }));
  }
  public setRepresentacionFederal(representacionFederal: string):void {
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

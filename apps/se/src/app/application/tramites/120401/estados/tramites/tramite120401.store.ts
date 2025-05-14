import { Injectable } from '@angular/core';
 
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { SeleccionDelCupoTabla } from '../../models/asignacion-directa-cupo.model';


/**
 * Representa el estado de la aplicación para el trámite 120401.
 * 
 * @interface Tramite120401State
 * 
 * @property {Catalogo | null} entidad - Entidad asociada al trámite, puede ser nula.
 * @property {Catalogo | null} representacion - Representación asociada al trámite, puede ser nula.
 * @property {Catalogo | null} regimen - Régimen asociado al trámite, puede ser nulo.
 * @property {Catalogo | null} tratado - Tratado asociado al trámite, puede ser nulo.
 * @property {Catalogo | null} producto - Producto asociado al trámite, puede ser nulo.
 * @property {Catalogo | null} subproducto - Subproducto asociado al trámite, puede ser nulo.
 * @property {string} cantidadSolicitada - Cantidad solicitada en el trámite.
 */
export interface Tramite120401State {
  datos : SeleccionDelCupoTabla[];
  entidad: Catalogo | null;
  representacion: Catalogo | null;
  regimen: Catalogo | null;
  tratado: Catalogo | null;
  producto: Catalogo | null;
  subproducto: Catalogo | null;
  cantidadSolicitada: string;
}



/**
 * Crea el estado inicial para el trámite 120401.
 *
 * @returns {Tramite120401State} El estado inicial del trámite, que incluye:
 * - `entidad`: Valor inicial nulo para la entidad.
 * - `representacion`: Valor inicial nulo para la representación.
 * - `regimen`: Valor inicial nulo para el régimen.
 * - `tratado`: Valor inicial nulo para el tratado.
 * - `producto`: Valor inicial nulo para el producto.
 * - `subproducto`: Valor inicial nulo para el subproducto.
 * - `cantidadSolicitada`: Cadena vacía como valor inicial para la cantidad solicitada.
 */
export function createInitialState(): Tramite120401State {
  return {
    datos:[],
    entidad: null,
    representacion: null,
    regimen: null,
    tratado: null,
    producto: null,
    subproducto: null,
    cantidadSolicitada: '',
  };
}

/**
 * @fileoverview
 * Este archivo contiene la definición de la clase `Tramite120401Store`, 
 * que extiende la funcionalidad de la clase `Store` para gestionar el estado 
 * de un trámite específico. Proporciona métodos para actualizar diferentes 
 * propiedades del estado relacionadas con catálogos y otros datos relevantes 
 * del trámite.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120401', resettable: true })
export class Tramite120401Store extends Store<Tramite120401State> {
  constructor() {
    super(createInitialState());
  }
 
  /**
   * Establece el valor del catálogo de entidad en el estado.
   * @param entidad Catálogo seleccionado para la entidad.
   */
  public setEntidad(entidad: Catalogo) : void {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  /**
   * Establece el valor del catálogo de representación en el estado.
   * @param representacion Catálogo seleccionado para la representación.
   */
  public setRepresentacion(representacion: Catalogo) : void {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }

  /**
   * Establece el valor del catálogo de régimen en el estado.
   * @param regimen Catálogo seleccionado para el régimen.
   */
  public setRegimen(regimen: Catalogo) : void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Establece el valor del catálogo de tratado en el estado.
   * @param tratado Catálogo seleccionado para el tratado.
   */
  public setTratado(tratado: Catalogo) : void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

   /**
   * Establece el valor del catálogo de producto en el estado.
   * @param producto Catálogo seleccionado para el producto.
   */
  public setProducto(producto: Catalogo): void {
    this.update((state) => ({
      ...state,
      producto,
    }));
  }

   /**
   * Establece el valor del catálogo de subproducto en el estado.
   * @param subproducto Catálogo seleccionado para el subproducto.
   */
  public setSubproducto(subproducto: Catalogo) : void {
    this.update((state) => ({
      ...state,
      subproducto,
    }));
  }

   /**
   * Establece el valor de la cantidad solicitada en el estado.
   * @param cantidadSolicitada Cadena que representa la cantidad solicitada.
   */

  public setCantidadSolicitada(cantidadSolicitada: string) : void{
    this.update((state) => ({
      ...state,
      cantidadSolicitada,
    }));
  }
}

import { Tramite140104State, Tramite140104Store } from './Tramite140104.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio para consultar el estado de Tramite140104.
 */
@Injectable({ providedIn: 'root' })
export class Tramite140104Query extends Query<Tramite140104State> {

  /**
   * Observable para seleccionar el estado completo del formulario.
   * @returns {Observable<Tramite140104State>} Estado completo del formulario Tramite140104.
   */
  selectTramite$ = this.select((state) => state);

  /**
   * Observable para obtener el régimen aduanero seleccionado.
   * @returns {Observable<string>} Régimen aduanero
   */
  selectRegimenAduanero$ = this.select(state => state.regimenAduanero);

  /**
   * Observable para obtener el mecanismo de asignación seleccionado.
   * @returns {Observable<string>} Mecanismo de asignación
   */
  selectMecanismoAsignacion$ = this.select(state => state.mecanismoAsignacion);

  /**
   * Observable para obtener el tratado o bloque comercial seleccionado.
   * @returns {Observable<string>} Tratado o bloque comercial
   */
  selectTratadoBloqueComercial$ = this.select(state => state.tratadoBloqueComercial);

  /**
   * Observable para obtener el nombre del producto.
   * @returns {Observable<string>} Nombre del producto
   */
  selectNombreProducto$ = this.select(state => state.nombreProducto);

  /**
   * Observable para obtener el nombre del subproducto.
   * @returns {Observable<string>} Nombre del subproducto
   */
  selectNombreSubproducto$ = this.select(state => state.nombreSubproducto);

  /**
   * Observable para obtener la representación federal.
   * @returns {Observable<string>} Representación federal
   */
  selectRepresentacionFederal$ = this.select(state => state.representacionFederal);

  /**
   * Constructor de Tramite140104Query.
   * @param {Tramite140104Store} store - Store que mantiene el estado del formulario Tramite140104
   */
  constructor(protected override store: Tramite140104Store) {
    super(store);
  }
}

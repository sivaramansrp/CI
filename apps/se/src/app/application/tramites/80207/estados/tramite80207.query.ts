import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite80207State } from '../modelos/subfabricante.model';
import { Tramites80207Store } from './tramite80207.store';

/**
 * @description
 * Esta clase `Tramites80207Queries` extiende de la clase base `Query` y proporciona
 * selectores para acceder a diferentes partes del estado de la aplicación relacionado
 * con el trámite 80207. Los selectores permiten observar cambios en el estado y
 * reaccionar a ellos de manera reactiva.
 *
 * @export
 * @class Tramites80207Queries
 * @extends {Query<Tramite80207State>}
 */
@Injectable({
  providedIn: 'root',
})
export class Tramites80207Queries extends Query<Tramite80207State> {
  /**
   * Selector para obtener la información del registro desde el estado.
   * @property {Observable<any>} infoRegisterEstado$
   */
  infoRegisterEstado$ = this.select((state) => {
    return state.infoRegistro;
  });

  /**
   * Selector para obtener los datos del subcontratista desde el estado.
   * @property {Observable<any>} datosSubcontratistaEstado$
   */
  datosSubcontratistaEstado$ = this.select((state) => {
    return state.datosSubcontratista;
  });

  /**
   * Selector para obtener las plantas subfabricantes que se van a agregar desde el estado.
   * @property {Observable<any>} plantasSubfabricantesAgregar$
   */
  plantasSubfabricantesAgregar$ = this.select((state) => {
    return state.plantasSubfabricantesAgregar;
  });

  /**
   * Selector para obtener las plantas buscadas desde el estado.
   * @property {Observable<any>} plantasBuscadas$
   */
  plantasBuscadas$ = this.select((state) => {
    return state.plantasBuscadas;
  });

  /**
   * Selector que evalúa si todos los valores del objeto `formaValida` en el estado son `true`.
   * @property {Observable<boolean>} formaValida$
   */
  formaValida$ = this.select((state) => {
    return Object.values(state.formaValida).every((value) => value === true);
  });

  /**
   * Crea una instancia de Tramites80207Queries.
   * @constructor
   * @param {Tramites80207Store} store - La instancia del store que contiene el estado del trámite 80207.
   */
  constructor(protected override store: Tramites80207Store) {
    super(store);
  }
}
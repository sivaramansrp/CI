import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite80207State } from '../modelos/subfabricante.model';
import { Tramites80207Store } from './tramite80207.store';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<Tramites80207Queries>}
 */
@Injectable({
  providedIn: 'root',
})
/**
 * @description
 * Esta clase `Tramites80207Queries` extiende de la clase base `Query` y proporciona
 * selectores para acceder a diferentes partes del estado de la aplicación relacionado
 * con el trámite 80207. Los selectores permiten observar cambios en el estado y
 * reaccionar a ellos de manera reactiva.
 *
 * @class Tramites80207Queries
 * @extends Query<Tramite80207State>
 */
export class Tramites80207Queries extends Query<Tramite80207State> {
  
  /* @property {Observable<any>} infoRegisterEstado$ - Selector para obtener la información
   * del registro desde el estado.
   */
  infoRegisterEstado$ = this.select((state) => {
    return state.infoRegistro;
  });

  /* @property {Observable<any>} datosSubcontratistaEstado$ - Selector para obtener los datos
   * del subcontratista desde el estado.
   */
  datosSubcontratistaEstado$ = this.select((state) => {
    return state.datosSubcontratista;
  });

  /* @property {Observable<any>} plantasSubfabricantesAgregar$ - Selector para obtener las
   * plantas subfabricantes que se van a agregar desde el estado.
   */
  plantasSubfabricantesAgregar$ = this.select((state) => {
    return state.plantasSubfabricantesAgregar;
  });

  /* @property {Observable<any>} plantasBuscadas$ - Selector para obtener las plantas buscadas
   * desde el estado.
   */
  plantasBuscadas$ = this.select((state) => {
    return state.plantasBuscadas;
  });

  /* @property {Observable<boolean>} formaValida$ - Selector que evalúa si todos los valores
   * del objeto `formaValida` en el estado son `true`.
   */
  formaValida$ = this.select((state) => {
    return Object.values(state.formaValida).every((value) => value === true);
  });

  /* @constructor
   * @param {Tramites80207Store} store - La instancia del store que contiene el estado del
   * trámite 80207.
   */
  constructor(protected override store: Tramites80207Store) {
    super(store);
  }
}

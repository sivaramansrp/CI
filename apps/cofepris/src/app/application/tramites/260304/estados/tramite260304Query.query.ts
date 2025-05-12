import {
  Tramite260304State,
  Tramite260304Store,
} from './tramite260304Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @class
 * @name Tramite260304Query
 * @description
 * Clase que proporciona consultas para acceder al estado del trámite 260304.
 * Extiende la clase `Query` de Akita para realizar selecciones del estado almacenado.
 *
 * @extends {Query<Tramite260304State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite260304Query extends Query<Tramite260304State> {
  /**
   * @constructor
   * @description
   * Inicializa la consulta con la tienda correspondiente.
   *
   * @param {Tramite260304Store} store - La tienda que contiene el estado del trámite 260304.
   */
  constructor(protected override store:Tramite260304Store) {
    super(store);
  }
  /**
   * @property {Observable<Tramite260304State>} selectTramiteState$
   * @description
   * Selecciona el estado completo del trámite 260304.
   */
  selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * @property {Observable<Fabricante[]>} getdestinatarioTablaDatos$
   * @description
   * Selecciona la lista de fabricantes del estado.
   */
  public getdestinatarioTablaDatos$ = this.select(
    (state) => state.destinatarioTableDatos
  );
  
  /**
   * @property {Observable<number | undefined>} getTabSeleccionado$
   * @description
   * Selecciona el índice de la pestaña actualmente seleccionada en el estado.
   */
  public getTabSeleccionado$ = this.select((state) => state.tabSeleccionado);


  /**
   * @description Obtiene un observable que selecciona el estado `otrosTablaDatos` desde el estado global.
   * @returns Un observable que emite los datos de la tabla "otrosTablaDatos".
   */
  getOtrasTablaDatos$ = this.select(
    (state) => state.otrosTablaDatos
  );
}

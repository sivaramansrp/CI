import {
  Tramite260302State,
  Tramite260302Store,
} from './tramite260302Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @class
 * @name Tramite260302Query
 * @description
 * Clase que proporciona consultas para acceder al estado del trámite 260302.
 * Extiende la clase `Query` de Akita para realizar selecciones del estado almacenado.
 *
 * @extends {Query<Tramite260302State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite260302Query extends Query<Tramite260302State> {
  /**
   * @constructor
   * @description
   * Inicializa la consulta con la tienda correspondiente.
   *
   * @param {Tramite260302Store} store - La tienda que contiene el estado del trámite 260302.
   */
  constructor(protected override store:Tramite260302Store) {
    super(store);
  }
  /**
   * @property {Observable<Tramite260302State>} selectTramiteState$
   * @description
   * Selecciona el estado completo del trámite 260302.
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

import {
  Tramite260103State,
  Tramite260103Store,
} from './tramite260103Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @class
 * @name Tramite260103Query
 * @description
 * Clase que proporciona consultas para acceder al estado del trámite 260103.
 * Extiende la clase `Query` de Akita para realizar selecciones del estado almacenado.
 *
 * @extends {Query<Tramite260103State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite260103Query extends Query<Tramite260103State> {
  /**
   * @constructor
   * @description
   * Inicializa la consulta con la tienda correspondiente.
   *
   * @param {Tramite260103Store} store - La tienda que contiene el estado del trámite 260103.
   */
  constructor(protected override store:Tramite260103Store) {
    super(store);
  }
  /**
   * @property {Observable<Tramite260103State>} selectTramiteState$
   * @description
   * Selecciona el estado completo del trámite 260103.
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
  getFabricanteTablaDatos$ = this.select(
    (state) => state.fabricanteTablaDatos
  );
}

import {
  Tramite260208State,
  Tramite260208Store,
} from './tramite260208Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @class
 * @name Tramite260208Query
 * @description
 * Clase que proporciona consultas para acceder al estado del trámite 260208.
 * Extiende la clase `Query` de Akita para realizar selecciones del estado almacenado.
 *
 * @extends {Query<Tramite260208State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite260208Query extends Query<Tramite260208State> {
  /**
   * @constructor
   * @description
   * Inicializa la consulta con la tienda correspondiente.
   *
   * @param {Tramite260208Store} store - La tienda que contiene el estado del trámite 260208.
   */
  constructor(protected override store: Tramite260208Store) {
    super(store);
  }
  /**
   * @property {Observable<Tramite260208State>} selectTramiteState$
   * @description
   * Selecciona el estado completo del trámite 260208.
   */
  selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * @property {Observable<number | undefined>} getTabSeleccionado$
   * @description
   * Selecciona el índice de la pestaña actualmente seleccionada en el estado.
   */
  public getTabSeleccionado$ = this.select((state) => state.tabSeleccionado);

  /**
   * Observable que selecciona y retorna datos de terceros desde el estado.
   * @returns {Observable<TercerosRelacionadosDatos>} 
   * Un observable con los datos de fabricante, destinatario final, proveedor y facturador.
   */
  public getTercerosDatos$ = this.select((state) => ({
    fabricanteTablaDatos: state.fabricanteTablaDatos,
    destinatarioFinalTablaDatos: state.destinatarioFinalTablaDatos,
    proveedorTablaDatos: state.proveedorTablaDatos,
    facturadorTablaDatos: state.facturadorTablaDatos,
  }));
      /**
     * @propiedad selectImmexRegistro$
     * @tipo Observable<ImmexRegistroState>
     * @descripción Selector que permite obtener el estado completo de `ImmexRegistroState`.
     */
    selectImmexRegistro$ = this.select((state) => {
        return state;
    });
}

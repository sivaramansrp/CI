import {
  Tramite260301State,
  Tramite260301Store,
} from './tramite260301Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @class
 * @name Tramite260301Query
 * @description
 * Clase que proporciona consultas para acceder al estado del trámite 260301.
 * Extiende la clase `Query` de Akita para realizar selecciones del estado almacenado.
 *
 * @extends {Query<Tramite260301State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite260301Query extends Query<Tramite260301State> {
  /**
   * @constructor
   * @description
   * Inicializa la consulta con la tienda correspondiente.
   *
   * @param {Tramite260301Store} store - La tienda que contiene el estado del trámite 260301.
   */
  constructor(protected override store: Tramite260301Store) {
    super(store);
  }
  /**
   * @property {Observable<Tramite260301State>} selectTramiteState$
   * @description
   * Selecciona el estado completo del trámite 260301.
   */
  selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * @property {Observable<Fabricante[]>} getFabricanteTablaDatos$
   * @description
   * Selecciona la lista de fabricantes del estado.
   */
  public getFabricanteTablaDatos$ = this.select(
    (state) => state.fabricanteTablaDatos
  );
  /**
   * @property {Observable<Destinatario[]>} getCertificadoTablaDatos$
   * @description
   * Selecciona la lista de destinatarios finales del estado.
   */
  public getCertificadoTablaDatos$ = this.select(
    (state) => state.certificadoTablaDatos
  );
  /**
   * @property {Observable<Proveedor[]>} getProveedorTablaDatos$
   * @description
   * Selecciona la lista de proveedores del estado.
   */
  public getProveedorTablaDatos$ = this.select(
    (state) => state.proveedorTablaDatos
  );
  /**
   * @property {Observable<Facturador[]>} getFacturadorTablaDatos$
   * @description
   * Selecciona la lista de facturadores del estado.
   */
  public getFacturadorTablaDatos$ = this.select(
    (state) => state.facturadorTablaDatos
  );
  /**
   * @property {Observable<number | undefined>} getTabSeleccionado$
   * @description
   * Selecciona el índice de la pestaña actualmente seleccionada en el estado.
   */
  public getTabSeleccionado$ = this.select((state) => state.tabSeleccionado);

  getOtrasTablaDatos$ = this.select(
    (state) => state.otrosTablaDatos
  );
}

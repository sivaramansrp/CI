import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import {
  Tramite260203State,
  Tramite260203Store,
} from '../stores/tramite260203Store.store';

@Injectable({ providedIn: 'root' })
export class Tramite260203Query extends Query<Tramite260203State> {
  /**
   * Constructor para el servicio de consulta del estado del trámite 260203.
   * @param {Tramite260203Store} store - Almacén de datos del trámite 260203
   */
  constructor(protected override store: Tramite260203Store) {
    super(store);
  }
  /**
   * Selecciona el estado completo de la solicitud.
   * @returns {Observable<Tramite260203State>} El estado completo del trámite
   */
  selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * Obtiene los datos de la tabla de fabricantes.
   * @returns {Observable<Fabricante[]>} Los datos de los fabricantes
   */
  public getFabricanteTablaDatos$ = this.select(
    (state) => state.fabricanteTablaDatos
  );

  /**
   * Obtiene los datos de la tabla de destinatarios finales.
   * @returns {Observable<Destinatario[]>} Los datos de los destinatarios finales
   */
  public getDestinatarioFinalTablaDatos$ = this.select(
    (state) => state.destinatarioFinalTablaDatos
  );

  /**
   * Obtiene los datos de la tabla de proveedores.
   * @returns {Observable<Proveedor[]>} Los datos de los proveedores
   */
  public getProveedorTablaDatos$ = this.select(
    (state) => state.proveedorTablaDatos
  );

  /**
   * Obtiene los datos de la tabla de facturadores.
   * @returns {Observable<Facturador[]>} Los datos de los facturadores
   */
  public getFacturadorTablaDatos$ = this.select(
    (state) => state.facturadorTablaDatos
  );

  /**
   * Obtiene los detalles de la tabla de mercancía.
   * @returns {Observable<DetalleMercancia[]>} Los detalles de la mercancía
   */
  public getDetalleMercancia$ = this.select(
    (state) => state.detalleMercanciaTabla
  );

  /**
   * Obtiene el índice previo de la ruta.
   * @returns {Observable<number>} El índice previo de la ruta
   */
  public indicePrevioRuta$ = this.select((state) => state.indice);
}

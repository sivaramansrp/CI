import { Tramite260212State, Tramite260212Store } from '../estados/tramite260212.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio que permite consultar (leer) el estado del Trámite 260212
 * usando el patrón de Akita para manejo de estado.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260212Query extends Query<Tramite260212State> {
  /**
   * Constructor que inicializa el query con el store correspondiente.
   * @param store Instancia del store para el Trámite 260212.
   */
  constructor(protected override store: Tramite260212Store) {
    super(store);
  }

  /**
   * Observable que emite el estado completo de la solicitud.
   */
  public selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * Observable que emite los datos de la tabla de fabricantes.
   */
  public getFabricanteTablaDatos$ = this.select(
    (state) => state.fabricanteTablaDatos
  );

  /**
   * Observable que emite los datos de la tabla de destinatarios finales.
   */
  public getDestinatarioFinalTablaDatos$ = this.select(
    (state) => state.destinatarioFinalTablaDatos
  );

  /**
   * Observable que emite los datos de la tabla de proveedores.
   */
  public getProveedorTablaDatos$ = this.select(
    (state) => state.proveedorTablaDatos
  );

  /**
   * Observable que emite los datos de la tabla de facturadores.
   */
  public getFacturadorTablaDatos$ = this.select(
    (state) => state.facturadorTablaDatos
  );

  /**
   * Observable que emite la pestaña actualmente seleccionada.
   */
  public getTabSeleccionado$ = this.select((state) => state.tabSeleccionado);
}

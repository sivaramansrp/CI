import { Tramite260104State,Tramite260104Store } from '../stores/tramite260104.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
/**
 * Servicio de consulta para el estado de Tramite260104.
 * 
 * Proporciona métodos para seleccionar y observar partes específicas del estado
 * relacionado con el trámite 260104.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260104Query extends Query<Tramite260104State> {

  /**
   * Constructor de la clase Tramite260104Query.
   * 
   * @param store - La tienda (store) que contiene el estado del trámite 260104.
   */
  constructor(protected override store: Tramite260104Store) {
    super(store);
  }

  /**
   * Selecciona el estado completo del trámite.
   * 
   * @returns Un observable que emite el estado completo del trámite.
   */
  selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * Obtiene los datos de la tabla de fabricantes desde el estado.
   * 
   * @returns Un observable que emite los datos de la tabla de fabricantes.
   */
  public getFabricanteTablaDatos$ = this.select(
    (state) => state.fabricanteTablaDatos
  );

  /**
   * Obtiene los datos de la tabla de destinatarios finales desde el estado.
   * 
   * @returns Un observable que emite los datos de la tabla de destinatarios finales.
   */
  public getDestinatarioFinalTablaDatos$ = this.select(
    (state) => state.destinatarioFinalTablaDatos
  );
}

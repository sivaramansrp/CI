import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite230501State } from '../stores/tramite230501Store.store';
import { Tramite230501Store } from '../stores/tramite230501Store.store';

/**
 * @class Tramite230501Query
 * @description Servicio de consulta para obtener el estado del trámite 230501.
 * Proporciona accesos selectores para consultar diferentes partes del estado de la solicitud y los datos asociados.
 */
@Injectable({ providedIn: 'root' })
export class Tramite230501Query extends Query<Tramite230501State> {
  /**
   * Constructor del servicio que inyecta el store y llama al constructor de la clase Query.
   *
   * @param store - El store asociado al trámite 230501.
   */
  constructor(protected override store: Tramite230501Store) {
    super(store); // Llama al constructor de la clase base (Query) con el store.
  }

  /**
   * Selector para obtener el estado completo del trámite.
   *
   * @returns Un observable que emite el estado completo de la solicitud (Tramite230501State).
   */
  selectTramiteState$ = this.select((state) => {
    return state; // Devuelve el estado completo del trámite 230501.
  });
    /**
   * Selecciona si todos los valores de la forma son válidos.
   * Verifica si todas las propiedades de `formaValida` son `true`.
   * @returns {Observable<boolean>} - Observable que indica si la forma es válida.
   */
    FormaValida$ = this.select((state) => {
      return Object.values(state.formaValida).every(value => value === true);
    });

  /**
   * Selector para obtener el estado de pago de derechos.
   *
   * @returns Un observable que emite el estado de pago de derechos.
   */
  seletPagoDerechosState$ = this.select((state) => {
    return state.pagoDerechosState; // Devuelve solo el estado de pago de derechos.
  });

  /**
   * Selector para obtener los datos de la tabla de destinatarios finales.
   *
   * @returns Un observable que emite los datos de la tabla de destinatarios finales.
   */
  public getDestinatarioFinalTablaDatos$ = this.select(
    (state) => state.destinatarioFinalTablaDatos
  );

  /**
   * Selector para obtener los datos de la tabla de representantes legales.
   *
   * @returns Un observable que emite los datos de la tabla de representantes legales.
   */
  public getRepresentanteTablaDatos$ = this.select(
    (state) => state.representanteLegalTablaDatos
  );

  /**
   * Selector para obtener los datos de la tabla de usuarios.
   *
   * @returns Un observable que emite los datos de la tabla de usuarios.
   */
  public getUsuarioTablaDatos$ = this.select(
    (state) => state.usuarioTablaDatos
  );

  /**
   * Selector para obtener los datos de la tabla de usos.
   *
   * @returns Un observable que emite los datos de la tabla de usos.
   */
  public getusoTablaDatos$ = this.select(
    (state) => state.usoTablaDatos
  );

  /**
   * Observable que indica si el destinatario final está en modo de edición.
   * 
   * Este observable selecciona el estado `esDestinatarioFinalElModoDeEdicion` 
   * del store para determinar si el destinatario final se encuentra en modo de edición.
   * 
   * @returns Un observable que emite un valor booleano indicando el estado del modo de edición.
   */
  public esDestinatarioFinalElModoDeEdicion$ = this.select(
    (state) => state.esDestinatarioFinalElModoDeEdicion
  );

  public esrepResentanteLegalElModoDeEdicion$ = this.select(
    (state) => state.esDestinatarioFinalElModoDeEdicion
  );
}

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite120402State } from '../tramites/tramite120402.store';
import { Tramite120402Store } from '../tramites/tramite120402.store';

 
@Injectable({ providedIn: 'root' })
export class Tramite120402Query extends Query<Tramite120402State> {
  /**
   * Selecciona la entidad del trámite.
   */
  // entidad$ = this.select((state) => state.entidad);
  // representacion$ = this.select((state) => state.representacion);
  // regimen$ = this.select((state) => state.regimen);
  // tratado$ = this.select((state) => state.tratado);
  // producto$ = this.select((state) => state.producto);
  // subproducto$ = this.select((state) => state.subproducto);
  // cantidadSolicitada$ = this.select((state) => state.cantidadSolicitada);

    /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });
 
  /**
   * Crea una nueva instancia de Tramite120402Query.
   * @param tramiteStore - La store del trámite 120402.
   * @remarks
   * Esta clase extiende de Query de Akita y permite seleccionar
   * partes del estado del trámite 120402.
   * Permite acceder a los datos del estado del trámite de manera reactiva.
   */

  constructor(protected tramiteStore: Tramite120402Store) {
    super(tramiteStore);
  }
}
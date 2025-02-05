import { FormSateSolicitud5701, Tramite5701Store } from '../../estados/tramites/tramite5701.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite5701Query extends Query<FormSateSolicitud5701> {
  /**
   *
   */


  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite5701Store) {
    super(store);
  }

  /**
   * Actualiza la informacion del formulario
   */
  // public actualizarSolicitud(solicitud: FormSateSolicitud5701) {
  //   this.store.establecerSolicitud(solicitud);
  // }
}

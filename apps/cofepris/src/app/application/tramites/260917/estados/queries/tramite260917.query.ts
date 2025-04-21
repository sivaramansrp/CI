import {
  Solicitud260917State,
  Tramite260917Store,
} from '../tramites/tramite260917.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
/**
 * Servicio disponible a nivel global (root) para inyección de dependencias.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260917Query extends Query<Solicitud260917State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260917Store) {
    super(store);
  }
}

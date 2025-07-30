/**
 *  Este servicio proporciona métodos para obtener datos relacionados con tratados y acuerdos.
 */

import { DomicilioTabla, HttpCoreService } from '@libs/shared/data-access-user/src';
import { Tramite110210State, Tramite110210Store } from '../../estados/store/tramite110210.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DomicilioTablaService {

  /**
   * {HttpCoreService} http - Servicio HTTP para realizar solicitudes.
   */
  constructor(private http: HttpCoreService, private store: Tramite110210Store) { }

  /**
   * @method getData
   *  Obtiene los datos de tratados y acuerdos desde un archivo JSON.
   * @returns {Observable<DomicilioTabla[]>} Un observable que emite los datos obtenidos.
   */
  getData(): Observable<DomicilioTabla[]> {
    return this.http.get('./assets/json/110210/domicilio-tabla-data.json');
  }
  getDatosStore(): Observable<Tramite110210State> {
    return this.http.get<Tramite110210State>('./assets/json/110210/datos.json');
  }
   /**
   * Actualiza el estado global del formulario en el store con los datos proporcionados.
   */
  actualizarEstadoFormulario(DATOS: Tramite110210State): void {
    this.store.actualizarEstado(DATOS);
  }
}

/**
 *  Este servicio proporciona métodos para obtener datos relacionados con tratados y acuerdos.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpCoreService } from '../../shared/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DomicilioTablaService {

  /**
   * {HttpCoreService} http - Servicio HTTP para realizar solicitudes.
   */
  constructor(private http: HttpCoreService) { }

  /**
   * @method getData
   *  Obtiene los datos de tratados y acuerdos desde un archivo JSON.
   * @returns {Observable<unknown>} Un observable que emite los datos obtenidos.
   */
  getData(): Observable<unknown> {
    return this.http.get('./assets/json/110210/domicilio-tabla-data.json');
  }
}

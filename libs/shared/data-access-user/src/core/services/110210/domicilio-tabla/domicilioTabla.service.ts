/**
 *  Este servicio proporciona métodos para obtener datos relacionados con tratados y acuerdos.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DomicilioTabla } from '../../../../tramites/constantes/110210/domicilio-tabla.enum';
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
   * @returns {Observable<DomicilioTabla[]>} Un observable que emite los datos obtenidos.
   */
  getData(): Observable<DomicilioTabla[]> {
    return this.http.get('./assets/json/110210/domicilio-tabla-data.json');
  }
}

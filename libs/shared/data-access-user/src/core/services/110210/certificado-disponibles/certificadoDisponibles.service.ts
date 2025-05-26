/**
 *  Este servicio proporciona métodos para obtener datos relacionados con tratados y acuerdos.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpCoreService } from '../../shared/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CertificadoDisponiblesService {

  /**
   * {HttpCoreService} http - Servicio HTTP para realizar solicitudes.
   */
  constructor(private http: HttpCoreService) { }

  /**
   * @method getData
   *  Obtiene los datos de tratados y acuerdos desde un archivo JSON.
   * @returns {Observable<T[]>} Un observable que emite los datos obtenidos.
   */
  getData<T>(): Observable<T[]> {
    return this.http.get<T[]>('./assets/json/110210/certificado-disponibles.json');
  }
}

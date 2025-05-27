/**
 *  Este servicio proporciona métodos para obtener datos relacionados con tratados y acuerdos.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CertificadoDisponibles } from '../../../../tramites/constantes/110210/certificado-disponibles.enum';
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
   * @returns {Observable<CertificadoDisponibles[]>} Un observable que emite los datos obtenidos.
   */
  getData(): Observable<CertificadoDisponibles[]> {
    return this.http.get('./assets/json/110210/certificado-disponibles.json');
  }
}

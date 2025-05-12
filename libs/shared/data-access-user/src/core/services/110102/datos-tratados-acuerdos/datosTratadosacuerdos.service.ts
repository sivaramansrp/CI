/**
 *  Este servicio proporciona métodos para obtener datos relacionados con tratados y acuerdos.
 */

import { HttpCoreService } from '../../shared/http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatostratadosacuerdosService {

  /**
   * {HttpCoreService} http - Servicio HTTP para realizar solicitudes.
   */
  constructor(private http: HttpCoreService) { 
    // Lógica de inicialización si es necesario
  }

  /**
   * @method getData
   *  Obtiene los datos de tratados y acuerdos desde un archivo JSON.
   * @returns {Observable<any>} Un observable que emite los datos obtenidos.
   */
  getData(): Observable<any> {
    return this.http.get('./assets/json/110102/datosTratadosAcuerdos.json');
  }
}

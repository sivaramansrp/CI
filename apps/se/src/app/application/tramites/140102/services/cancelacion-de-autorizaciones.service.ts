import { CancelacionTabla } from '../models/Cancelacion-de-autorizaciones';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @description
 * Servicio que gestiona las operaciones relacionadas con la cancelación de autorizaciones.
 * Este servicio incluye métodos para obtener datos de la tabla de cancelación de autorizaciones.
 */
@Injectable({
  providedIn: 'root',
})
export class CancelacionDeAutorizacionesService {
  /**
   * @description
   * Constructor del servicio.
   * Inyecta el cliente HTTP para realizar solicitudes a servicios externos.
   * @param http Cliente HTTP utilizado para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * @description
   * Método que obtiene los datos de la tabla de cancelación de autorizaciones.
   * Realiza una solicitud HTTP para obtener los datos desde un archivo JSON.
   * @returns {Observable<CancelacionTabla[]>} Un observable que emite una lista de datos de la tabla de cancelación.
   */
  getCancelacionTabla(): Observable<CancelacionTabla[]> {
    return this.http.get<CancelacionTabla[]>('assets/json/140102/CancelacionTabla.json');
  }
}

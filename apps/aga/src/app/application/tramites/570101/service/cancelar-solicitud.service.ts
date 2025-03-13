import { CancelarSolicitudForm } from '../modelos/cancelar-solicitud.modalidad.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})  

export class CancelarSolicitudService {

  /**
   * URL base para obtener los datos simulados desde archivos JSON.
   * @private
   * @type {string}
   */
  private cancelarSolicitudUrl = '/assets/json/570101/';

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene los datos simulados para el formulario de cambio de modalidad.
   * 
   * @returns {Observable<CancelarSolicitudForm>} Observable que emite los datos del formulario.
   */
  getCancelarSolicitud(): Observable<CancelarSolicitudForm> {
    return this.http.get<CancelarSolicitudForm>(`${this.cancelarSolicitudUrl}cancelarSolicitud.json`);
  }

}
import { DesistimientoForm } from '../modelos/desistimiento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DesistimientoService {

  /**
   * URL base para obtener los datos simulados desde archivos JSON.
   * @private
   * @type {string}
   */
  private desistimientoUrl = '/assets/json/220404/';

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    /** No se necesita lógica de inicialización adicional. */
  }

  /**
   * Obtiene los datos simulados para el formulario de cambio de modalidad.
   * 
   * @returns {Observable<SolicitudForm>} Observable que emite los datos del formulario.
   */
  getDesistimientoSolicitud(): Observable<DesistimientoForm> {
    return this.http.get<DesistimientoForm>(`${this.desistimientoUrl}desistimiento.json`);
  }
}
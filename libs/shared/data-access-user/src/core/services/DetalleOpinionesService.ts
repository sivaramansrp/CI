import { OpinionDetalleOpiniones, SolicitudDetalleOpiniones } from '../models/shared/consulta-generica.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DetalleOpinionesService {

  /**
   * URL base para obtener los datos simulados desde archivos JSON.
   * @private
   * @type {string}
   */
  private datosUrl = '/assets/json/funcionario/'; 

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
   * @returns {Observable<dictamenUrl>} Observable que emite los datos del formulario.
   */
  getSolicitudOpiniones(): Observable<SolicitudDetalleOpiniones[]> {
    return this.http.get<SolicitudDetalleOpiniones[]>(`${this.datosUrl}solicitud-consultagenerica.json`);
  }

  /**
   * Obtiene los datos simulados para el formulario de cambio de modalidad.
   * 
   * @returns {Observable<dictamenUrl>} Observable que emite los datos del formulario.
   */
  getDetalleOpinion(): Observable<OpinionDetalleOpiniones[]> {
    return this.http.get<OpinionDetalleOpiniones[]>(`${this.datosUrl}opinion_consultagenerica.json`);
  }

}
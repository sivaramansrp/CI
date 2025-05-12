import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaContenedor, RespuestaTramite } from '../models/datos-tramite.model';

@Injectable({
  providedIn: 'root'
})
export class AutoridadService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Obtener una lista de Aduanas
   * 
   * @param {string} catalogo - El nombre del catálogo a obtener.
   * @returns {Observable<RespuestaTramite>} Un observable con la respuesta del catálogo de aduanas.
   */
  getTramiteList(catalogo: string): Observable<RespuestaTramite> {
    return this.http.get<RespuestaTramite>(`assets/json/31501/${catalogo}.json`);
  }

    /**
   * Agregar una solicitud
   * 
   * @returns {Observable<RespuestaContenedor>} Un observable con la respuesta de agregar una solicitud.
   */
  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(`assets/json/31501/contenedorLista.json`);
  }

}

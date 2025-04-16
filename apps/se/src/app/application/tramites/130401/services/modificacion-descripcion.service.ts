
import { ArancelariaLista, MercanciaLista, MercanciaTablaLista, PartidasLista, SolicitudLista } from '../models/modificacion-descripcion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con la modificación de descripción.
 * 
 * Este servicio proporciona métodos para obtener datos como partidas, arancelarias, solicitudes,
 * mercancías y tablas de mercancías, necesarios para el trámite 130401.
 */
@Injectable({
  providedIn: 'root'
})
export class ModificacionDescripcionService {
  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los recursos.
   */
  constructor(private http: HttpClient) {
    // Constructor del servicio.
  }

  /**
   * Obtiene la lista de partidas.
   * 
   * @returns {Observable<PartidasLista>} Un observable con la lista de partidas.
   */
  obtenerPartidas(): Observable<PartidasLista> {
    return this.http.get<PartidasLista>('assets/json/130401/partidas.json');
  }

  /**
   * Obtiene la lista de arancelarias.
   * 
   * @returns {Observable<ArancelariaLista>} Un observable con la lista de arancelarias.
   */
  obtenerarancelaria(): Observable<ArancelariaLista> {
    return this.http.get<ArancelariaLista>('assets/json/130401/arancelaria.json');
  }

  /**
   * Obtiene la lista de solicitudes.
   * 
   * @returns {Observable<SolicitudLista>} Un observable con la lista de solicitudes.
   */
  obtenerSolicitud(): Observable<SolicitudLista> {
    return this.http.get<SolicitudLista>('assets/json/130401/solicitud.json');
  }

  /**
   * Obtiene la lista de mercancías.
   * 
   * @returns {Observable<MercanciaLista>} Un observable con la lista de mercancías.
   */
  obtenerMercancia(): Observable<MercanciaLista> {
    return this.http.get<MercanciaLista>('assets/json/130401/mercancia.json');
  }

  /**
   * Obtiene los datos de la tabla de mercancías.
   * 
   * @returns {Observable<MercanciaTablaLista>} Un observable con los datos de la tabla de mercancías.
   */
  obtenerMercanciaTabla(): Observable<MercanciaTablaLista> {
    return this.http.get<MercanciaTablaLista>('assets/json/130401/mercancia-tabla.json');
  }
}
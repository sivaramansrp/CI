import { Tramite32610TercerosState, Tramite32610TercerosStore } from '../../../estados/tramites/tramite32610-terceros.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaRespuestaTabla } from '../models/personas-notificaciones-tabla.model';


/**
 * Servicio encargado de invocar y obtener los datos necesarios
 * para la solicitud de registro del trámite 32610.
 * Se encarga de consumir archivos JSON locales que simulan las respuestas
 * de diferentes catálogos o entidades relacionadas con el trámite.
 *
 * @export
 * @class SolicitudDeRegistroInvocarService
 */
@Injectable({
  providedIn: 'root'
})
export class SolicitudDeRegistroInvocarService {

  /**
   * Crea una instancia del servicio de invocación.
   *
   * @param {HttpClient} http - Cliente HTTP utilizado para realizar peticiones a los recursos JSON locales.
   * @memberof SolicitudDeRegistroInvocarService
   */
  constructor(
    private http: HttpClient,
    private tramite32610TercerosStore:Tramite32610TercerosStore) {
    // Constructor vacío, puede incluir lógica si es necesario.
  }
  
  /**
   * Obtiene los datos de la tabla de personas.
   * Realiza una petición a un recurso local en formato JSON que contiene datos relacionados con personas.
   *
   * @returns {Observable<PersonaRespuestaTabla>} Un observable con los datos de la tabla de personas.
   * @memberof SolicitudDeRegistroInvocarService
   */
  obtenerPersonaTablaDatos(): Observable<PersonaRespuestaTabla> {
    return this.http.get<PersonaRespuestaTabla>('assets/json/32610/personas-notificacione.json');
  }

  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite32610TercerosState): void {
    this.tramite32610TercerosStore.actualizarEstado(DATOS);
  }

  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite32610TercerosState> {
    return this.http.get<Tramite32610TercerosState>('assets/json/32610/datos-de-la-solicitud-terceros.json');
  }
}

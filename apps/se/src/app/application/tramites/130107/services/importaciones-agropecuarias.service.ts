import { ENVIRONMENT, JSONResponse } from '@libs/shared/data-access-user/src';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DatosDeLaSolicitud } from '../models/partidas.model';

/**
 * @service ImportacionesAgropecuariasService
 * @description
 * Servicio encargado de gestionar las operaciones relacionadas con las importaciones agropecuarias
 * en el trámite 130107. Este servicio incluye métodos para obtener datos de la solicitud y realizar
 * operaciones auxiliares con el servidor.
 */
@Injectable({
  providedIn: 'root'
})
export class ImportacionesAgropecuariasService {
  /**
   * @property urlServer
   * @description
   * La URL del servidor utilizada para operaciones auxiliares con JSON.
   * Este valor se obtiene de la configuración del entorno.
   * 
   * @type {string}
   */
  urlServer = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * @constructor
   * @description
   * Constructor del servicio que inyecta el cliente HTTP para realizar solicitudes al servidor.
   * 
   * @param http Cliente HTTP inyectado para realizar operaciones de red.
   */
  constructor(private http: HttpClient) { }

  /**
   * @method obtenerTramite
   * @description
   * Método para obtener los datos de un trámite específico desde el servidor.
   * Realiza una solicitud GET a la URL del servidor con el ID del trámite.
   * 
   * @param id ID del trámite a obtener.
   * @returns Observable<JSONResponse> Respuesta en formato JSON con los datos del trámite.
   */
  obtenerTramite(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * @method datosDeLaSolicitud
   * @description
   * Método para obtener los datos de la solicitud desde un archivo JSON local.
   * Este método se utiliza para cargar datos estáticos relacionados con el trámite.
   * 
   * @returns Observable<DatosDeLaSolicitud> Datos de la solicitud en formato JSON.
   */
  datosDeLaSolicitud(): Observable<DatosDeLaSolicitud> {
    return this.http.get<DatosDeLaSolicitud>('assets/json/130107/datos-de-la-solicitud.json');
  }
}

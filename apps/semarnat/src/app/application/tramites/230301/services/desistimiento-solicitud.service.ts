import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from '../enum/constants';

import { RespuestaDesistimientoSolicitud } from '../models/disponsibles.model';


@Injectable({
  providedIn: 'root'
})
export class DesistimientoSolicitudService {

  /**
   * URL base para las solicitudes HTTP.
   * @type {string}
   */
  url: string = URL;

  /**
   * Constructor de la clase `DesistimientoSolicitudService`.
   * Inicializa el servicio HTTP para realizar solicitudes.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private readonly http: HttpClient) { 
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Obtiene los datos de desistimiento de una solicitud desde el servidor.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de desistimiento
   * de una solicitud específica.
   * 
   * @param {string} name - Nombre del recurso o archivo a obtener.
   * @returns {Observable<any>} Observable que emite los datos obtenidos del servidor.
   */
  
  getDesistimientoSolicitud(name: string): Observable<RespuestaDesistimientoSolicitud> {
    const BASEURL = this.url + name;
    return this.http.get<RespuestaDesistimientoSolicitud>(BASEURL);
  }
}
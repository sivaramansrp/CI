import { AcuseResolucion } from '../models/confirmar-notificacion.model';
import { Documento } from '../models/confirmar-notificacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @service ConfirmarNotificacionService
 * @description
 * Servicio encargado de obtener los datos necesarios para el proceso de confirmación de notificaciones.
 * Consume archivos JSON simulados como fuente de datos.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfirmarNotificacionService {
  /**
   * @constructor
   * @param {HttpClient} http - Cliente HTTP de Angular para realizar peticiones GET.
   */
  constructor(public http: HttpClient) {}

  /**
   * @method getAcuseReciboDatos
   * @description
   * Obtiene la lista de documentos correspondientes al Acuse de Recibo.
   * Los datos son obtenidos desde un archivo JSON local.
   *
   * @returns {Observable<Documento[]>} Observable que emite un arreglo de documentos.
   */
  getAcuseReciboDatos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(
      'assets/json/confirmar-notificacion/acuseDeRecibo.json'
    );
  }

  /**
   * @method getFolioDatos
   * @description
   * Obtiene los datos generales del Acuse de Resolución, incluyendo folio, tipo de solicitud, etc.
   * Los datos son obtenidos desde un archivo JSON local.
   *
   * @returns {Observable<AcuseResolucion>} Observable que emite los datos del Acuse de Resolución.
   */
  getFolioDatos(): Observable<AcuseResolucion> {
    return this.http.get<AcuseResolucion>(
      'assets/json/confirmar-notificacion/confirmar-notificacion.json'
    );
  }
}

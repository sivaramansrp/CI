import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProgramasReporte, RegistroSolicitudDatos } from '../models/programas-reporte.model';
import { ReporteFechas } from '../models/programas-reporte.model';


/**
 * @file Servicio para gestionar las solicitudes relacionadas con los trámites del módulo 150101.
 * Proporciona métodos para obtener datos de programas y reportes desde archivos JSON locales.
 */

/**
 * @class SolicitudService
 * @description Servicio que permite obtener información de programas y reportes de fechas
 * desde archivos JSON locales para el módulo 150101.
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Servicio para manejar las solicitudes de datos relacionados con los programas y reportes.
 * Este servicio utiliza HttpClient para realizar solicitudes a archivos JSON locales.
 */
export class SolicitudService {
  /**
   * @constructor
   * @param http Cliente HTTP utilizado para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient) {
    //constructor
  }

  /**
   * Obtiene la lista de programas para el reporte desde un archivo JSON local.
   * @returns {Observable<ProgramasReporte[]>} Observable que emite un arreglo de programas para el reporte.
   */
  obtenerProgramasReporte(): Observable<ProgramasReporte[]> {
    return this.http.get<ProgramasReporte[]>(
      'assets/json/150101/programas-reporte.json'
    );
  }

  /**
   * Obtiene las fechas del reporte desde un archivo JSON local.
   * @returns {Observable<ReporteFechas>} Observable que emite las fechas del reporte.
   */
  obtenerReporteFechas(): Observable<ReporteFechas> {
    return this.http.get<ReporteFechas>(
      'assets/json/150101/reporte-fechas.json'
    );
  }

  /**
   * Obtiene los datos del registro de solicitud anual desde un archivo JSON local.
   * @returns {Observable<RegistroSolicitudDatos>} Observable que emite los datos del registro de solicitud anual.
   */
  getRegistroSolicitudDatos(): Observable<RegistroSolicitudDatos> {
    return this.http.get<RegistroSolicitudDatos>('assets/json/150101/registro-solicitud-anual.json');
  }
}

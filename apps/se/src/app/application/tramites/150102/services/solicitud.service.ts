import { BienesProducidos } from '../models/programas-reporte.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramasReporte } from '../models/programas-reporte.model';
import { ReporteFechas } from '../models/programas-reporte.model';

/**
 * @description Servicio encargado de realizar solicitudes HTTP relacionadas con el reporte anual.
 * Proporciona métodos para obtener los programas de reporte, las fechas del reporte y los datos de bienes producidos.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * @description Servicio encargado de realizar solicitudes HTTP relacionadas con el reporte anual.
 *  Proporciona métodos para obtener los programas de reporte, las fechas del reporte y los datos de bienes producidos.
 * @class SolicitudService
 */
export class SolicitudService {
  /**
   * @description Constructor del servicio. Inyecta la dependencia de HttpClient para realizar las solicitudes HTTP.
   * @param http Cliente HTTP de Angular para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient) {
    // Constructor vacío, inicialización del servicio HttpClient
  }

  /**
   * @description Obtiene los datos de los programas de reporte desde un archivo JSON.
   * @returns Un observable con un arreglo de objetos ProgramasReporte.
   */
  obtenerProgramasReporte(): Observable<ProgramasReporte[]> {
    return this.http.get<ProgramasReporte[]>(
      'assets/json/150102/programas-reporte.json'
    );
  }

  /**
   * @description Obtiene las fechas de inicio y fin del reporte desde un archivo JSON.
   * @returns Un observable con un objeto ReporteFechas.
   */
  obtenerReporteFechas(): Observable<ReporteFechas> {
    return this.http.get<ReporteFechas>(
      'assets/json/150102/reporte-fechas.json'
    );
  }

  /**
   * @description Obtiene los datos de los bienes producidos desde un archivo JSON.
   * @returns Un observable con un arreglo de objetos BienesProducidos.
   */
  obtenerProducidosDatos(): Observable<BienesProducidos[]> {
    return this.http.get<BienesProducidos[]>(
      'assets/json/150102/producidos-datos.json'
    );
  }
}

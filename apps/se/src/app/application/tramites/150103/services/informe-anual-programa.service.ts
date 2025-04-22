import { ProgramasReporte, ReporteFechas } from '../models/programas-reporte.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InformeAnualProgramaService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a servicios externos.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los programas de reporte desde un archivo JSON.
   * 
   * Este método realiza una solicitud HTTP para obtener un arreglo de programas de reporte.
   * @returns Un observable que emite un arreglo de objetos de tipo `ProgramasReporte`.
   */
  obtenerProgramasReporte(): Observable<ProgramasReporte[]> {
    return this.http.get<ProgramasReporte[]>(
      'assets/json/150103/programas-reporte.json'
    );
  }

  /**
   * Obtiene las fechas de inicio y fin del reporte desde un archivo JSON.
   * 
   * Este método realiza una solicitud HTTP para obtener las fechas del reporte.
   * @returns Un observable que emite un objeto de tipo `ReporteFechas`.
   */
  obtenerReporteFechas(): Observable<ReporteFechas> {
    return this.http.get<ReporteFechas>(
      'assets/json/150103/reporte-fechas.json'
    );
  }
}
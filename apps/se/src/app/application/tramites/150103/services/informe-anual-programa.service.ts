import { ProgramasReporte, ReporteFechas } from '../models/programas-reporte.model';
import { Solicitud150103State,Solicitud150103Store } from '../estados/solicitud150103.store';

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
  constructor(private http: HttpClient, private solicitud150103Store: Solicitud150103Store) {}
  actualizarEstadoFormulario(DATOS: Solicitud150103State): void {
    this.solicitud150103Store.actualizarFolioPrograma(DATOS.folioPrograma);
    this.solicitud150103Store.actualizarModalidad(DATOS.modalidad);
    this.solicitud150103Store.actualizarTipoPrograma(DATOS.tipoPrograma);
    this.solicitud150103Store.actualizarEstatus(DATOS.estatus);
    this.solicitud150103Store.actualizarVentasTotales(DATOS.ventasTotales);
    this.solicitud150103Store.actualizarTotalExportaciones(DATOS.totalExportaciones);
   
  }
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
  getRegistroData(): Observable<Solicitud150103State> {
    return this.http.get<Solicitud150103State>('assets/json/150103/registro.json');
  }
}
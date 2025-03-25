import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BienesProducidos, ProgramasReporte } from '../models/programas-reporte.model';
import { ReporteFechas } from '../models/programas-reporte.model';


@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) {
    //constructor
  }

  obtenerProgramasReporte(): Observable<ProgramasReporte[]> {
    return this.http.get<ProgramasReporte[]>(
      'assets/json/150102/programas-reporte.json'
    );
  }

  obtenerReporteFechas(): Observable<ReporteFechas> {
    return this.http.get<ReporteFechas>(
      'assets/json/150102/reporte-fechas.json'
    );
  }

  obtenerProducidosDatos(): Observable<BienesProducidos[]> {
    return this.http.get<BienesProducidos[]>(
      'assets/json/150102/producidos-datos.json'
    );
  }


  
}

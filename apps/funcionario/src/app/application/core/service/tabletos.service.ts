import { ListaPendientes, ListaSolicitudes } from '@libs/shared/data-access-user/src';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TablerosService {

  private dictamenUrl = '/assets/json/funcionario/';

  constructor(private http: HttpClient) {
    //
  }

  public getTableroSolicitudesTabla(): Observable<ListaSolicitudes[]> {
    return this.http.get<ListaSolicitudes[]>(`${this.dictamenUrl}lista-solicitudes.json`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getTableroPendientes(): Observable<ListaPendientes[]> {
    return this.http.get<ListaPendientes[]>(`${this.dictamenUrl}lista-pendientes.json`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getSolicitudesFiltradas(filtros: {
    idSolicitud?: string;
    fechaInicio?: string;
    fechaFinal?: string;
  }): Observable<ListaSolicitudes[]> {
    return this.http.get<ListaSolicitudes[]>(`${this.dictamenUrl}lista-solicitudes.json`).pipe(
      map((data) => {
        return data.filter((solicitud) => {
          const COINCIDEID = filtros.idSolicitud
            ? solicitud.idSolicitud.includes(filtros.idSolicitud)
            : true;
          const FECHACREACION = new Date(solicitud.fechaCreacion);
          const FECHAINICIO = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
          const FECHAFINAL = filtros.fechaFinal ? new Date(filtros.fechaFinal) : null;

          const DENTRODERANGO =
            (!FECHAINICIO || FECHACREACION >= FECHAINICIO) &&
            (!FECHAFINAL || FECHACREACION <= FECHAFINAL);

          return COINCIDEID && DENTRODERANGO;
        });
      })
    );
  }

  getPendientesFiltrados(filtros: {
    folio?: string;
    info?:string;
    fechaInicio?: string;
    fechaFinal?: string;
  }): Observable<ListaPendientes[]> {
    return this.http.get<ListaPendientes[]>(`${this.dictamenUrl}lista-solicitudes.json`).pipe(
      map((data) => {
        return data.filter((solicitud) => {
          const COINCIDEFOLIO = filtros.folio
            ? solicitud.folio.includes(filtros.folio)
            : true;
            
          const FECHACREACION = new Date(solicitud.fechaAsignacion);
          const FECHAINICIO = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
          const FECHAFINAL = filtros.fechaFinal ? new Date(filtros.fechaFinal) : null;

          const DENTRODERANGO =
            (!FECHAINICIO || FECHACREACION >= FECHAINICIO) &&
            (!FECHAFINAL || FECHACREACION <= FECHAFINAL);

          return COINCIDEFOLIO && DENTRODERANGO;
        });
      })
    );
  }


}
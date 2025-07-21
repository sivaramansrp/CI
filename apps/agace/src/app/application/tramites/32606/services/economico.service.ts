import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { catchError, Observable, throwError } from 'rxjs';
import { Domicillio, EntidadFederativa, RecibirNotificaciones } from '../models/adace.model';

@Injectable({
  providedIn: 'root'
})

export class EconomicoService {

  constructor(private http: HttpClient) { }

  obtenerSectorProductivo(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/sector-productivo.json');
  }

  obtenerServicio(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/servicio.json');
  }

  obtenerBimestre(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/bimestre.json');
  }

  obtenerDomicillio(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/domicillio.json');
  }

  personasNotificaciones(): Observable<RecibirNotificaciones[]> {
    return this.http.get<RecibirNotificaciones[]>('assets/json/32606/personas.json');
  }

  obtenerEntidad(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/entidad.json');
  }

  obtenerTablaEntidad(): Observable<EntidadFederativa[]> {
    return this.http.get<EntidadFederativa[]>('assets/json/32606/entidad-tabla.json')
      .pipe(catchError((error) => {
        return throwError(() => error);
      })
      );
  }

  obtenerTablaDomicillio(): Observable<Domicillio[]> {
    return this.http.get<Domicillio[]>('assets/json/32606/domicillio-tabla.json')
      .pipe(catchError((error) => {
        return throwError(() => error);
      })
      );
  }


}

/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { DatosGenerales, RegistroDeSolicitudesTabla } from '../models/registro-cuentas-bancarias.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroCuentasBancariasService {

  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;
  private componentSource = new BehaviorSubject<string>('DatosGenerales'); // Componente predeterminado
  componenteActual = this.componentSource.asObservable();


  constructor(private http: HttpClient) {
    //
   }

   public getSolicitudesTabla():Observable<RegistroDeSolicitudesTabla[]> {
      return this.http.get<RegistroDeSolicitudesTabla[]>('assets/json/6001/registro-de-solicitudes-tabla.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
   }

   public obtenerDatosDeFormularioDeAPI():Observable<DatosGenerales> {
      return this.http.get<DatosGenerales>('assets/json/6001/respuesta-de-la-api.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
   }

     /**
   * @description Función para obtener el trámite
   * @param id
   * @returns JSONResponse
   */
  public obtenerTramite(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  public cambiarComponente(component: string) {
    this.componentSource.next(component);
  }

  public getTipoDePersonaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/6001/tipo-de-persona.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getPaisDondeRadicaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/6001/pais-donde-radica.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  public getInstitucionDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/6001/institucion.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  public getEstadoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/6001/estado.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}

import {Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';

export interface JSONResponse {
  id: number;
  descripcion: string;
  codigo: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})

export class ServiciosExtraordinariosService {
  /**
  * URL base del servidor para obtener datos auxiliares en formato JSON.
  * Se asigna desde la configuración en el archivo de entorno (environment).
  */
  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;

  /**
  * Constructor de la clase del servicio.
  * 
  * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a servicios externos.
  * El constructor está intencionalmente vacío, ya que se utiliza únicamente 
  * para la inyección de dependencias necesarias en este servicio.
  */
  constructor(private http: HttpClient) {
    /** El constructor está intencionalmente vacío para la inyección de dependencias */
  }

  /**
  * @description Función para obtener el trámite
  * @param id
  * @returns JSONResponse
  */
  obtenerTramite(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}

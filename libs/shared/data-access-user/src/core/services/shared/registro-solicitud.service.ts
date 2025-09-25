
import { API_POST_SOLICITUD_GUARDAR, COMUN_URL } from '../../servers/api-router';
import { BaseResponse } from '../../models/shared/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroSolicitudService {
  
  host: string;

  constructor(private http: HttpClient) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }


  /*
   * Guarda los datos de la solicitud.
   * @param {number} tramite - El ID del trámite.
   * @param {any} payload - Los datos a guardar.
   * @returns {Observable<BaseResponse<any>>} - Observable con la respuesta del servidor.
   */

  postGuardarDatos<T>(tramite: number, payload: T): Observable<BaseResponse<T>> {
    const ENDPOINT = `${this.host}${API_POST_SOLICITUD_GUARDAR(tramite)}`;
    return this.http.post<BaseResponse<T>>(ENDPOINT, payload);
  }
}
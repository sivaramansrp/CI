import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaPendientes } from '../models/pendientes.model';
import { ListaSolicitudes } from '../models/solicitudes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablerosService {

  private dictamenUrl = '/assets/json/funcionario/';

  constructor(private http: HttpClient) {
    //
  }

/**
 * Obtiene una lista de solicitudes desde el backend, aplicando filtros opcionales.
 *
 * @param idSolicitud - (Opcional) Identificador de la solicitud para filtrar resultados.
 * @param fechaInicio - (Opcional) Fecha de inicio del rango a consultar (formato ISO 8601 esperado).
 * @param fechaFinal - (Opcional) Fecha final del rango a consultar (formato ISO 8601 esperado).
 * @returns Un Observable con un arreglo de objetos `ListaSolicitudes`.
 */
  getListaSolicitudes(idSolicitud?: string, fechaInicio?: string, fechaFinal?: string): Observable<ListaSolicitudes[]> {
    let params = new HttpParams();

    if (idSolicitud) {
      params = params.set('idSolicitud', idSolicitud);
    }

    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio);
    }

    if (fechaFinal) {
      params = params.set('fechaFinal', fechaFinal);
    }
    return this.http.get<ListaSolicitudes[]>(`${this.dictamenUrl}lista-solicitudes.json`, { params });
  }

  /**
 * Obtiene una lista de pendientes desde el backend, aplicando filtros opcionales.
 *
 * @param folio - (Opcional) Identificador de la solicitud para filtrar resultados.
 * @param info --(opciona) Información adicionar que el usuario este enviando
 * @param fechaInicio - (Opcional) Fecha de inicio del rango a consultar 
 * @param fechaFinal - (Opcional) Fecha final del rango a consultar 
 * @returns Un Observable con un arreglo de objetos `ListaPendientes`.
 */
  getListaPendientes(folio?: string, info?: string, fechaInicio?: string, fechaFinal?: string): Observable<ListaPendientes[]> {
    let params = new HttpParams();

    if (folio) {
      params = params.set('idSolicitud', folio);
    }

    if (info) {
      params = params.set('idSolicitud', info);
    }

    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio);
    }

    if (fechaFinal) {
      params = params.set('fechaFinal', fechaFinal);
    }
    return this.http.get<ListaPendientes[]>(`${this.dictamenUrl}lista-pendientes.json`, { params });
  }

}
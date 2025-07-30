
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para obtener la tabla de mercancías desde un archivo JSON local.
 * Proporciona métodos para acceder a los datos de la tabla de mercancías utilizados en el trámite 103.
 */
@Injectable({
  providedIn: 'root'
})
export class MercanciaTableService {
  /**
   * Ruta al archivo JSON que contiene los datos de la tabla de mercancías.
   * @type {string}
   */
  private readonly jsonUrl = '/assets/json/103/mercancia-table.json';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos de la tabla de mercancías desde el archivo JSON.
   * @returns {Observable<any>} Observable con los datos de la tabla de mercancías.
   */
  getTable(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}

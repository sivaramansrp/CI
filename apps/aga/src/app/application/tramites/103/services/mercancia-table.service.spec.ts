/**
 * Servicio para obtener la tabla de mercancía desde un archivo JSON local.
 *
 * Este servicio proporciona un método para obtener los datos de la tabla de mercancía
 * consumiendo el archivo JSON correspondiente a la ruta '/assets/json/103/mercancia-table.json'.
 *
 * @example
 *   constructor(private mercanciaTableService: MercanciaTableService) {}
 *   this.mercanciaTableService.getTable().subscribe(data => { ... });
 *
 * @see MercanciaTableService.getTable
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para la obtención de la tabla de mercancía.
 *
 * @remarks
 * Utiliza HttpClient para realizar una petición GET al archivo JSON local.
 */
@Injectable({
  providedIn: 'root'
})
export class MercanciaTableService {
  /**
   * Ruta del archivo JSON con la información de la tabla de mercancía.
   * @private
   * @readonly
   * @type {string}
   */
  private readonly jsonUrl = '/assets/json/103/mercancia-table.json';

  /**
   * Inicializa el servicio con HttpClient.
   * @param {HttpClient} http - Cliente HTTP de Angular para peticiones REST.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos de la tabla de mercancía desde el archivo JSON.
   *
   * @returns {Observable<any>} Observable con los datos de la tabla de mercancía.
   */
  getTable(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}

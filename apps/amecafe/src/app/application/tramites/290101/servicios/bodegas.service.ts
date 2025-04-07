import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con las bodegas.
 * Proporciona métodos para obtener datos desde un archivo JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class BodegasService {
  /**
   * URL base para los datos de las bodegas.
   * @type {string}
   */
  private jsonUrl = '/assets/json/290101/';

  /**
   * Constructor del servicio.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Obtiene los datos de las bodegas desde el archivo JSON.
   * @returns {Observable<any>} Observable con los datos de las bodegas.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getDatos(): Observable<any> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      // Se pueden agregar operadores adicionales si es necesario
    );
  }
}
/**
 * @@Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LabelValueDatos } from '@ng-mf/data-access-user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvisoDatosService {
  /**
   * @property {string} jsonUrl - URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = 'assets/json/32504';
  /**
   * @constructor
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private httpClient: HttpClient) {
    // contructor code here
  }

  /**
   * @method getDatos
   * @description Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @returns {Observable<any[]>} Observable con los datos del permiso IMMEX.
   */

  getDatos(fileName: string): Observable<LabelValueDatos[]> {
    return this.httpClient.get<LabelValueDatos[]>(`${this.jsonUrl}/${fileName}`).pipe(
      catchError(error => {
        console.error('Error fetching data from:', this.jsonUrl, error);
        return of([]);
      })
    );
  }
}

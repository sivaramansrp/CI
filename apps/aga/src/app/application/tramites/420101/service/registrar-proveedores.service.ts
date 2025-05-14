import { Observable, map } from 'rxjs';
import { DatosDelProveedoresManual } from '../models/proveedores.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrarProveedoresService {

  /**
   * URL base para las peticiones a los recursos JSON relacionados con el trámite 420101.
   * @private
   * @type {string}
   */
  private apiUrl = 'assets/json/420101/';

  /**
   * @constructor
   * @description Constructor que inicializa el servicio HTTP necesario para realizar solicitudes.
   * @param {HttpClient} http - Servicio de Angular para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de proveedores manuales desde un archivo JSON.
   * @returns {Observable<DatosDelProveedoresManual>} Observable que emite los datos de proveedores manuales.
   */
  proveedoresManual(): Observable<DatosDelProveedoresManual> {
    return this.http.get<DatosDelProveedoresManual>(`${this.apiUrl}proveedores.json`).pipe(
      map((res) => res)
    );
  }
}

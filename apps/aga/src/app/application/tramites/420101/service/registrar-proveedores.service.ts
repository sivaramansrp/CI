import { Observable, map } from 'rxjs';
import { DatosDelProveedoresManual } from '../models/proveedores.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrarProveedoresService {


  private apiUrl = 'assets/json/420101/';

  /**
   * @constructor
   * @description Constructor que inicializa el servicio HTTP necesario para realizar solicitudes.
   * @param {HttpClient} http - Servicio de Angular para realizar solicitudes HTTP.
   */
  constructor(private readonly http: HttpClient) { }

  proveedoresManual(): Observable<DatosDelProveedoresManual> {
    return this.http.get<DatosDelProveedoresManual>(`${this.apiUrl}proveedores.json`).pipe(
      map((res) => res)
    );
  }
}

import { Observable, map } from 'rxjs';
import { DatosDelProveedoresManual } from '../models/proveedores.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tramite420101State } from '../estados/tramite420101Store.store';

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

/**
* Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
* 
* @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
*          cargados desde el archivo JSON especificado en la ruta de `assets`.
*/
getRegistroTomaMuestrasMercanciasData(): Observable<Tramite420101State> {
  return this.http.get<Tramite420101State>('assets/json/420101/respuestaDeActualizacionDe.json');
}

}

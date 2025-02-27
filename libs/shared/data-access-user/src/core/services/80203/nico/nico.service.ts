/**
 * @Injectable
 * @description Servicio para obtener los datos del menú desplegable de NICO.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Catalogo, RespuestaCatalogos } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class NicoService {
  /**
   * @property {string} url - URL base para los archivos JSON.
   */
  url: string = '/assets/json/80203/';

  /**
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly http: HttpClient) { }

  /**
   * @method obtenerMenuDesplegable
   * @description Obtiene la lista de opciones del menú desplegable desde un archivo JSON.
   * @param {string} fileName - Nombre del archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable con la lista de opciones del menú desplegable.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const baseUrl = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(baseUrl).pipe(
      map(response => response.data)
    );
  }
}

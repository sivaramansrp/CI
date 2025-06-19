/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-empty-function */
/**
 * @Injectable
 * @description Servicio para obtener los datos del menú desplegable de NICO.
 */
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NicoService {
  /**
   * @property {string} url
   * @description URL base para los archivos JSON que contienen los datos del menú desplegable.
   */
  url: string = '/assets/json/80202/';

  /**
   * @constructor
   * @description Constructor que inicializa el cliente HTTP para realizar solicitudes.
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

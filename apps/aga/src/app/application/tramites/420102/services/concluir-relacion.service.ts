import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { DatosDelContenedorTabla } from '../models/tramite420102.enum';
import { URL } from '../constantes/concluir-relacion.enum';

/**
 * @class ConcluirRelacionService
 * @description Servicio que proporciona métodos para interactuar con los datos relacionados con la conclusión de relaciones en el trámite 420102.
 * Este servicio realiza solicitudes HTTP para obtener información desde archivos JSON.
 */
@Injectable({
  providedIn: 'root',
})
export class ConcluirRelacionService {
  /**
   * @property {string} url
   * @description URL base utilizada para construir las rutas de los archivos JSON.
   */
  url: string = URL;

  /**
   * @constructor
   * @description Constructor que inicializa el servicio HTTP necesario para realizar solicitudes.
   * @param {HttpClient} http - Servicio de Angular para realizar solicitudes HTTP.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * @method obtenerTablerList
   * @description Método para obtener una lista de datos desde un archivo JSON.
   * Realiza una solicitud HTTP GET y transforma la respuesta en un arreglo de objetos `DatosDelContenedorTabla`.
   *
   * @param {string} fileName - Nombre del archivo JSON que contiene los datos.
   * @returns {Observable<DatosDelContenedorTabla[]>} Observable que emite un arreglo de datos del contenedor.
   *
   * @example
   * ```typescript
   * this.concluirRelacionService.obtenerTablerList('archivo.json').subscribe((datos) => {
   *   console.log(datos);
   * });
   * ```
   */
  obtenerTablerList(fileName: string): Observable<DatosDelContenedorTabla[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<DatosDelContenedorTabla[]>(BASEURL).pipe(
      map((response) => response)
    );
  }
}

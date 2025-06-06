import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Tramite420102State, Tramite420102Store } from '../estados/tramite420102.store';
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
  constructor(
    private readonly http: HttpClient,
    private readonly tramite420102Store: Tramite420102Store
  ) {}

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

 /**
  * @description Actualiza el estado del formulario en el store con los datos proporcionados.
  * @param {Tramite420102State} DATOS - Objeto que contiene los nuevos datos para actualizar el estado.
  */
  actualizarEstadoFormulario(DATOS: Tramite420102State): void {
    this.tramite420102Store.establecerRfc(DATOS.rfc);
    this.tramite420102Store.establecerFechaInicial(DATOS.fechaInicial);
    this.tramite420102Store.establecerFechaFinal(DATOS.fechaFinal);
    this.tramite420102Store.establecerTablaDatos(DATOS.tableDatos || []);
  }

 /**
  * @description Obtiene los datos de prellenado para el formulario desde un archivo JSON local.
  * @returns {Observable<Tramite110205State>} Observable que emite los datos de prellenado.
  */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite420102State> {
    return this.http.get<Tramite420102State>('assets/json/420102/datos-prefill.json');
  }
  
}

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, throwError } from 'rxjs';

import { AvisoValor, PreOperativo } from '../models/aviso.model';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';

/**
 * @class
 * @name AvisoUnicoService
 * @description
 * Servicio que proporciona métodos para obtener datos relacionados con el aviso único.
 */
@Injectable({
  providedIn: 'root',
})
export class AvisoUnicoService {
  /**
   * Constructor del servicio `AvisoUnicoService`.
   * @param http Cliente HTTP para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient) {
    // Constructor
  }
private jsonUrl = 'assets/json/33303';
 private fileName = 'tipoDeAviso.json';
  /**
   * @method
   * @name obtenerDatosLocalidad
   * @description
   * Obtiene los datos de la localidad desde un archivo JSON.
   * @returns {Observable<unknown>} Un observable que emite los datos de la localidad.
   * En caso de error, lanza un observable con el error capturado.
   */
  obtenerDatosLocalidad(): Observable<unknown> {
    return this.http.get('assets/json/317/aviso.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * @method
   * @name getSolicitante
   * @description
   * Obtiene los datos del solicitante desde un archivo JSON.
   * @returns {Observable<unknown>} Un observable que emite los datos del solicitante.
   */
  getSolicitante(): Observable<AvisoValor> {
    return this.http.get<AvisoValor>('assets/json/317/renovacion.json');
    }

 /**
   * @method
   * @name obtenerRadio
   * @description
   * Obtiene una lista de objetos de tipo `PreOperativo` desde un archivo JSON local.
   * @returns {Observable<PreOperativo[]>} Un observable que emite un arreglo de objetos `PreOperativo`.
   * @example
   * this.avisoUnicoService.obtenerRadio().subscribe((data: PreOperativo[]) => {
   *   console.log(data);
   * });
   */
  obtenerRadio(): Observable<PreOperativo[]> {
    return this.http.get<PreOperativo[]>('assets/json/317/tipoPersonaradio.json');
  }

  /**
     * Método para obtener el tipo de aviso desde un archivo JSON.
     * Se realiza una solicitud HTTP y se maneja cualquier error que pueda ocurrir.
     *
     * @returns Un `Observable` que contiene los datos del aviso en formato `CatalogoResponse`.
     */
    getAvisoModify(): Observable<CatalogoResponse> {
      /**
       * Realiza una solicitud HTTP para obtener los datos del tipo de aviso desde el archivo JSON.
       */
      return this.http
        .get<CatalogoResponse>(`${this.jsonUrl}/${this.fileName}`)
        .pipe(
          /**
           * Captura errores que puedan ocurrir durante la solicitud HTTP y los maneja.
           */
          catchError((error) => {
            /**
             * Registra el error en la consola para su análisis.
             */
            console.error('Error fetching data from:', this.jsonUrl, error);
  
            /**
             * Retorna un objeto por defecto en caso de error para evitar que la aplicación falle.
             */
            return of({
              id: 0,
              descripcion: '',
              code: 0,
              data: [],
              message: 'Respuesta por defecto debido a un error',
            } as unknown as CatalogoResponse);
          })
        );
    }
}
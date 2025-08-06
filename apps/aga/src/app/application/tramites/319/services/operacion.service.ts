import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map} from 'rxjs';

import {Catalogo, RespuestaCatalogos} from '@libs/shared/data-access-user/src';
import { URL } from '../constantes/operaciones-de-comercio-exterior.enum';

import { FinalDataToSend } from '../models/tramite319-state.model';
import { Personas } from '../models/personas.module';
import { Tramite319Store } from '../estados/tramite319Store.store';


/**
 * Servicio para realizar operaciones relacionadas con la obtención de datos desde el backend.
 * Proporciona métodos para obtener listas de catálogos y personas desde un archivo específico.
 * 
 * @example
 * // Ejemplo de uso:
 * const fileName = 'catalogos.json';
 * operacionService.obtenerSelectorList(fileName).subscribe(catalogos => {
 *   console.log(catalogos);
 * });
 * 
 * @example
 * const fileName = 'personas.json';
 * operacionService.obtenerTablerList(fileName).subscribe(personas => {
 *   console.log(personas);
 * });
 * 
 * @injectable
 * Este servicio está disponible en el nivel raíz del módulo.
 */
@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  /**
   * URL base para las solicitudes HTTP.
   */
  url: string = URL;

  /**
   * Constructor del servicio.
   * 
   * @param http - Cliente HTTP para realizar solicitudes al backend.
   */
  constructor(private readonly http: HttpClient,private readonly solocitud319Service:Tramite319Store ) {}

  /**
   * Obtiene una lista de catálogos desde un archivo específico.
   * 
   * @param fileName - Nombre del archivo que contiene los datos del catálogo.
   * @returns Un observable que emite una lista de catálogos.
   */
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene una lista de personas desde un archivo específico.
   * 
   * @param fileName - Nombre del archivo que contiene los datos de las personas.
   * @returns Un observable que emite una lista de personas.
   */
  obtenerTablerList(fileName: string): Observable<Personas[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<Personas[]>(BASEURL).pipe(
      map(response => response)
    );
  }
    /**
     * @description
     * Obtiene los datos de registro de toma de muestras de mercancías desde el backend utilizando el nombre de archivo proporcionado.
     *
     * @param fileName El nombre del archivo que se utilizará para construir la URL de la solicitud.
     * @returns Un observable que emite los datos finales a enviar (`FinalDataToSend`).
     *
     * @memberof OperacionService
     */
    getRegistroTomaMuestrasMercanciasData(fileName:string): Observable<FinalDataToSend> {
       const BASEURL = this.url + fileName;
      return this.http.get<FinalDataToSend>(BASEURL);
    }
    /**
 * @method actualizarEstadoFormulario
 * @description
 * Actualiza el estado completo del formulario en la tienda (`store`) mediante el servicio `solocitud319Service`.
 * 
 * Este método delega la actualización del estado llamando al método `actualizarTodo`, 
 * que reemplaza completamente los datos actuales (`datos`) y la operación (`operacion`)
 * con el nuevo objeto `resp` de tipo `FinalDataToSend`.
 * 
 * @param {FinalDataToSend} resp - Objeto que contiene los nuevos datos y operación a establecer en el estado del store.
 * 
 * @example
 * const nuevosDatos: FinalDataToSend = {
 *   datos: [...],
 *   operacion: 'editar'
 * };
 * this.actualizarEstadoFormulario(nuevosDatos);
 */
    actualizarEstadoFormulario(resp:FinalDataToSend): void {
      this.solocitud319Service.actualizarOperacion(resp.operacion);
      this.solocitud319Service.actualizarTodo(resp); 

    }
}

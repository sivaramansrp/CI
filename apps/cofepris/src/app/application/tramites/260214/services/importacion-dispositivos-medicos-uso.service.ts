import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite260214State } from '../estados/tramite260214Store.store';

/**
 * @service
 * @name ImportacionDispositivosMedicosUsoService
 * @description
 * Servicio que proporciona métodos para realizar solicitudes HTTP relacionadas con el trámite 260214.
 * Permite obtener datos desde un archivo JSON para simular la respuesta de una API.
 *
 * @decorator Injectable
 * Marca la clase como un servicio inyectable en Angular.
 */
@Injectable({
  providedIn: 'root',
})
export class ImportacionDispositivosMedicosUsoService {

  /**
   * Creates an instance of ImportacionDispositivosMedicosUsoService.
   * 
   * @param http - The Angular HttpClient used to perform HTTP requests.
   */
  constructor(private readonly http: HttpClient) { }

    /**
    * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
    * 
    * @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
    *          cargados desde el archivo JSON especificado en la ruta de `assets`.
    */
    getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260214State> {
      return this.http.get<Tramite260214State>('assets/json/260214/respuestaDeActualizacionDe.json');
    }
}

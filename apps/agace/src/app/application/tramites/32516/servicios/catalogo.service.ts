/**
 * @Injectable
 * @description Servicio para obtener los datos de los catálogos desde archivos JSON.
 * Este servicio realiza solicitudes HTTP para cargar las opciones de menús desplegables.
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
export class CatalogosService {
  /**
   * URL base para los archivos JSON de catálogos.
   * @type {string}
   */
  url: string = '/assets/json/32516/';

  /**
   * URL base para los archivos JSON de levantar acta.
   * @type {string}
   */
  urlLevantar: string = '/assets/json/32516/';

  
  /**
   * Constructor del servicio.
   * Inicializa el cliente HTTP para realizar solicitudes.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly http: HttpClient) { }

  /**
   * Obtiene la lista de opciones del menú desplegable desde un archivo JSON.
   * @method obtenerMenuDesplegable
   * @param {string} fileName - Nombre del archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable con la lista de opciones del menú desplegable.
   * @description Realiza una solicitud HTTP GET para cargar las opciones del menú desplegable.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene la lista de opciones del menú desplegable para levantar acta desde un archivo JSON.
   * @method obtenerLevantarActaDesplegable
   * @param {string} fileName - Nombre del archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable con la lista de opciones del menú desplegable.
   * @description Realiza una solicitud HTTP GET para cargar las opciones del menú desplegable para levantar acta.
   */
  obtenerLevantarActaDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL_LEVANTAR = this.urlLevantar + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL_LEVANTAR).pipe(
      map(response => response.data)
    );
  }

  
  /**
   * Obtiene la lista de opciones del menú desplegable para unidad de medida desde un archivo JSON.
   * @method obtenerUnidadDesplegable
   * @param {string} fileName - Nombre del archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable con la lista de opciones del menú desplegable.
   * @description Realiza una solicitud HTTP GET para cargar las opciones del menú desplegable para unidad de medida.
   */
  obtenerUnidadDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL_UNIDAD_MEDIDA = this.urlLevantar + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL_UNIDAD_MEDIDA).pipe(
      map(response => response.data)
    );
  }

    /**
   * Obtiene las opciones para el radio button de exención de pago.
   * @returns {RadioOpcion[]} Lista de opciones para el radio button.
   */
    RadioOpcion = [
      { label: 'Sí', value: 'true' },
      { label: 'No', value: 'false' }
    ];
}

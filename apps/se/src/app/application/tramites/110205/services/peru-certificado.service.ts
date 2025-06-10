import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { MercanciasHistorico, ProductorExportador } from '../models/peru-certificado.module';
import { Observable, map } from 'rxjs';
import { Tramite110205State, Tramite110205Store } from '../estados/tramite110205.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

@Injectable({
  providedIn: 'root'
})

export class PeruCertificadoService {

 /**
  * @property {string} url
  * @description Ruta base para acceder a los archivos JSON utilizados en el trámite 110205.
  */
  url: string = '../../../../../assets/json/110205/';

  /**
   * @constructor
   * @param {HttpClient} http - Servicio para realizar solicitudes HTTP.
   * @param {Tramite110205Store} tramite110205Store - Store para gestionar el estado del trámite 110205.
   */
  constructor(private readonly http: HttpClient, public tramite110205Store: Tramite110205Store) { }
 
  /** 
   * @description Obtiene un array de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un array de objetos `Catalogo`.
   * @method obtenerMenuDesplegable
   * @memberof PeruCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
   * ```typescript
   * this.PeruCertificadoService.obtenerMenuDesplegable('menu.json').subscribe(menu => {
   *   console.log(menu);
   * });
   * ```
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @description Obtiene un array de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un array de objetos `Mercancia`.
   * @method obtenerTablaDatos
   * @memberof PeruCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
   * ```typescript
   * this.PeruCertificadoService.obtenerTablaDatos('data.json').subscribe(data => {
   *   console.log(data);
   * });
   * ```
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
      return this.http.get<Mercancia[]>(JSON_URL);
  }
    /**
     * Obtiene la lista de productores/exportadores disponibles.
     * 
     * Este método realiza una solicitud HTTP para obtener los datos de productores/exportadores desde un archivo JSON.
     * 
     * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
     */
    obtenerProductorPorExportador(): Observable<ProductorExportador> {
      return this.http
        .get<ProductorExportador>('assets/json/110205/productor-exportador.json');
    }

  
    /**
     * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
     * 
     * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
     * 
     * @command Este método realiza una solicitud HTTP GET para obtener los datos de mercancías.
     */
     obtenerMercancia(): Observable<MercanciasHistorico> {
      return this.http
        .get<MercanciasHistorico>('assets/json/110205/mercancias-seleccionadas.json');
    }

  /**
  * @description Actualiza el estado del formulario en el store con los datos proporcionados.
  * @param {Tramite110205State} DATOS - Objeto que contiene los nuevos datos para actualizar el estado.
  */
  actualizarEstadoFormulario(DATOS: Tramite110205State): void {
    this.tramite110205Store.update((state) => ({
      ...state,
      ...DATOS
    }))
  }

 /**
  * @description Obtiene los datos de prellenado para el formulario desde un archivo JSON local.
  * @returns {Observable<Tramite110205State>} Observable que emite los datos de prellenado.
  */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110205State> {
    return this.http.get<Tramite110205State>('assets/json/110205/datos-prefill.json');
  }
  
}
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { MercanciasHistorico, ProductorExportador } from '../models/peru-certificado.module';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

@Injectable({
  providedIn: 'root'
})

export class CertificadoDeService {
  url: string = '../../../../../assets/json/110205/';

  constructor(private readonly http: HttpClient) { }
 
  /**
   * @description Fetches an array of `Catalogo` objects from a JSON file located at the specified URL.
   * @param fileName The name of the JSON file to fetch data from.
   * @returns An `Observable` that emits an array of `Catalogo` objects.
   * @method obtenerMenuDesplegable
   * @memberof PeruCertificadoService
   * @usageNotes
   * This method constructs the full URL by appending the `fileName` to the base URL (`this.url`) 
   * and performs an HTTP GET request to retrieve the data.
   * 
   * Example:
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
   * @description Fetches an array of `Mercancia` objects from a JSON file located at the specified URL.
   * @param fileName The name of the JSON file to fetch data from.
   * @returns An `Observable` that emits an array of `Mercancia` objects.
   * @method obtenerTablaDatos
   * @memberof PeruCertificadoService
   * @usageNotes
   * This method constructs the full URL by appending the `fileName` to the base URL (`this.url`) 
   * and performs an HTTP GET request to retrieve the data.
   * 
   * Example:
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
}
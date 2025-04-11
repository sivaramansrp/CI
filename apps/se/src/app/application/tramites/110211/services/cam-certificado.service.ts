import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

@Injectable({
  providedIn: 'root'
})

export class CamCertificadoService {
  url: string = '../../../../../assets/json/110211/';

  constructor(private readonly http: HttpClient) { }
 
  /**
   * @description Fetches an array of `Catalogo` objects from a JSON file located at the specified URL.
   * @param fileName The name of the JSON file to fetch data from.
   * @returns An `Observable` that emits an array of `Catalogo` objects.
   * @method obtenerMenuDesplegable
   * @memberof CamCertificadoService
   * @usageNotes
   * This method constructs the full URL by appending the `fileName` to the base URL (`this.url`) 
   * and performs an HTTP GET request to retrieve the data.
   * 
   * Example:
   * ```typescript
   * this.camCertificadoService.obtenerMenuDesplegable('menu.json').subscribe(menu => {
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
   * @memberof CamCertificadoService
   * @usageNotes
   * This method constructs the full URL by appending the `fileName` to the base URL (`this.url`) 
   * and performs an HTTP GET request to retrieve the data.
   * 
   * Example:
   * ```typescript
   * this.camCertificadoService.obtenerTablaDatos('data.json').subscribe(data => {
   *   console.log(data);
   * });
   * ```
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
      return this.http.get<Mercancia[]>(JSON_URL);
  }
}

import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { CamState } from '../estados/cam-certificado.store';
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
   * @description Obtiene un array de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un array de objetos `Catalogo`.
   * @method obtenerMenuDesplegable
   * @memberof CamCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
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
   * @description Obtiene un array de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un array de objetos `Mercancia`.
   * @method obtenerTablaDatos
   * @memberof CamCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
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

  /**
   * @description Obtiene todos los datos del certificado CAM desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un objeto `CamState`.
   * @method obtenerTodosDatosCamCertificado
   * @memberof CamCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
   * ```typescript
   * this.camCertificadoService.obtenerTodosDatosCamCertificado('camcertificado.json').subscribe(data => {
   *   console.log(data);
   * });
   * ```
   */
  obtenerTodosDatosCamCertificado(fileName: string): Observable<CamState> {
    const JSON_URL = this.url + fileName;
    return this.http.get<CamState>(JSON_URL);
  }

}

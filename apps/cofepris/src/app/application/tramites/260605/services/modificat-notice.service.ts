import { Observable, catchError, throwError } from 'rxjs';
import { Aduana } from '../models/aduaneras-informaciones.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReprestantanteData } from '../models/aduaneras-informaciones.model';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';

/**
 * Servicio para manejar las solicitudes relacionadas con los datos de representantes y aduanas.
 * Este servicio utiliza `HttpClient` para realizar solicitudes HTTP y recuperar datos desde archivos JSON.
 * 
 * @export
 * @class ModificatNoticeService
 */
@Injectable({
  providedIn: 'root',
})
export class ModificatNoticeService {
  /**
   * URL del servidor utilizado para servicios auxiliares JSON.
   * Esta URL se obtiene de la configuración del entorno.
   * 
   * @type {string}
   * @memberof ModificatNoticeService
   */
  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;

  /**
   * Construye una instancia de `ModificatNoticeService`.
   * 
   * @param {HttpClient} http - La instancia de HttpClient utilizada para realizar solicitudes HTTP.
   * @memberof ModificatNoticeService
   */
  constructor(private http: HttpClient) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Recupera los datos del representante desde un archivo JSON local.
   *
   * Este método envía una solicitud HTTP GET para recuperar los datos del archivo JSON especificado.
   * Se espera que los datos sean del tipo `ReprestantanteData`.
   *
   * @returns {Observable<ReprestantanteData>} Un observable que emite los datos del representante obtenidos.
   * @throws Lanzará un error si la solicitud HTTP falla.
   * @memberof ModificatNoticeService
   */
  public ObtenerReprestantanteData(): Observable<ReprestantanteData> {
    return this.http
      .get<ReprestantanteData>('assets/json/260605/represtantante.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Recupera la lista de aduanas disponibles desde un archivo JSON local.
   *
   * Este método envía una solicitud HTTP GET para recuperar los datos del archivo JSON especificado.
   * Se espera que los datos sean del tipo `Aduana[]`.
   *
   * @returns {Observable<Aduana[]>} Un observable que emite un array de objetos `Aduana`.
   * @throws Lanzará un error si la solicitud HTTP falla.
   * @memberof ModificatNoticeService
   */
  public obteneraduanasDisponiblesdatos(): Observable<Aduana[]> {
    return this.http
      .get<Aduana[]>('assets/json/260605/aduaneras-informaciones.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
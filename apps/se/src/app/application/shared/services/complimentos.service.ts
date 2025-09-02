import { Observable, catchError, map, throwError } from 'rxjs';

import { Catalogo, HttpCoreService } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from 'apps/se/src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplimentosService {
  constructor(private readonly http: HttpClient,public httpService: HttpCoreService) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return (
      this.http
        .get<Catalogo[]>('assets/json/funcionario/estado.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res.data))
    );
  }

  /**
     * @method getDatos
     * Método para obtener datos desde un archivo JSON.
     * @returns {Observable<unknown>} Un Observable que emite los datos obtenidos o un error.
     */
    getDatos(): Observable<unknown> {
        return this.http.get('assets/json/80102/pagoderechos.json') // Realiza una solicitud GET al archivo JSON.
          .pipe(
            catchError((error: unknown) => { // Maneja errores en la solicitud.
              return throwError(() => error); // Lanza el error para que pueda ser manejado por el suscriptor.
            })
          );
     }

    /**
     * Retrieves a list of countries from the catalog API.
     *
     * @returns An Observable emitting the response containing an array of countries.
     */
     getPais(): Observable<any> {
    return (
      this.httpService
      .get<any[]>(`${ENVIRONMENT.API_BASE_URL}/api/catalogo/paises`, {}, false)
      .pipe(
        map((res: any) => {
        return res;
        })
      )
    );
  }
}

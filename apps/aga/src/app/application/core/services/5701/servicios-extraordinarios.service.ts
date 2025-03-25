import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@ng-mf/data-access-user';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  urlServerCatalogos = enviroment.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) { }

  getCatalogoById(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}

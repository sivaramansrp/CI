import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { Observable,catchError, throwError } from 'rxjs';
import { Solicitud301State } from '../../../core/estados/tramites/tramite301.store';

@Injectable({
  providedIn: 'root'
})
export class Pantallas301Service {

  constructor(private http: HttpClient) { }

  public getPantallaDatos(): Observable<Solicitud301State> {
    return this.http.get<Solicitud301State>('assets/json/301/registro_toma_muestras_mercancias.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}

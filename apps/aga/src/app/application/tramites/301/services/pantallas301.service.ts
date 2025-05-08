import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { Observable,catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pantallas301Service {

  constructor(private http: HttpClient) { }

  public getPantallaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/301/bandeja-solicitude.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}

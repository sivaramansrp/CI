import { Injectable } from '@angular/core';
import{ PermisoModel } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';

import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExportacionService {

  constructor( private http: HttpClient) { }

  getLocalidaddata(): Observable<unknown> {
    return this.http.get('assets/json/260604/exportacion.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  getTable(): Observable<PermisoModel []> {
    return this.http.get<PermisoModel []>('assets/json/260604/terceros.json');
  } 
}

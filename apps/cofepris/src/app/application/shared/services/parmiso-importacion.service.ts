import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

  export class AvisoImportacionService {
  
    constructor( private http: HttpClient) { }

    getDatos(): Observable<unknown> {
        return this.http.get('assets/json/260514/pagoderechos.json').pipe(
          catchError((error: unknown) => {
            return throwError(() => error);
          })
        );
     }
  }
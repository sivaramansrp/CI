import { Injectable } from '@angular/core';
// import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SanitarioService {
  
  constructor( private http: HttpClient) { }

  getDatos(): Observable<unknown> {
    return this.http.get('assets/json/260211/derechos.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
 }

 getTable(): Observable<unknown> {
  return this.http.get('assets/json/260211/terceros.json').pipe(
    catchError((error: unknown) => {
      return throwError(() => error);
    })
  );
}
}

  
  


import { Injectable } from '@angular/core';
// import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,throwError } from 'rxjs';
import { PermisoModel } from '../components/detos.model';


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

 getProveedordata(): Observable<unknown> {
  return this.http.get('assets/json/260211/proveedor.json').pipe(
    catchError((error: unknown) => {
      return throwError(() => error);
    })
  );
}
getLocalidaddata(): Observable<unknown> {
  return this.http.get('assets/json/260211/estadolocalidad.json').pipe(
    catchError((error: unknown) => {
      return throwError(() => error);
    })
  );
}

getTable(): Observable<PermisoModel []> {
  return this.http.get<PermisoModel []>('assets/json/260211/terceros.json');
} 
}

  
  


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,throwError } from 'rxjs';
import { PermisoModel } from '../models/permiso-sanitario.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosPermisoSanitarioService {

  constructor( private http: HttpClient) { }
 getDatos(): Observable<unknown> {
    return this.http.get('assets/json/260215/derechos.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
 }
 
 getProveedordata(): Observable<unknown> {
  return this.http.get('assets/json/260215/proveedor.json').pipe(
    catchError((error: unknown) => {
      return throwError(() => error);
    })
  );
}
getLocalidaddata(): Observable<unknown> {
  return this.http.get('assets/json/260215/estadolocalidad.json').pipe(
    catchError((error: unknown) => {
      return throwError(() => error);
    })
  );
}
 
getTable(): Observable<PermisoModel []> {
  return this.http.get<PermisoModel []>('assets/json/260215/terceros.json');
}
}

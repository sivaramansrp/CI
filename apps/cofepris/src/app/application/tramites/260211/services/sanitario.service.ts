import { Injectable } from '@angular/core';
// import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable,throwError } from 'rxjs';

import { PermisoModel } from '@libs/shared/data-access-user/src/core/models/260211/detos.model';
import { Catalogo } from '@libs/shared/data-access-user/src';

 
/**
 * Servicio para gestionar funcionalidades relacionadas con el ámbito sanitario.
 *
 * Este servicio puede ser extendido para incluir métodos que interactúen
 * con APIs o manipulen datos relacionados con trámites sanitarios.
 */
@Injectable({
  providedIn: 'root',
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

getData(): Observable<Catalogo[]> {
  return this.http.get<Catalogo[]>('assets/json/260211/terceros-relacionadoes.json');
}
}

  
  

  /**
   * Constructor del servicio.
   *
   * Actualmente, no realiza ninguna acción al ser instanciado.
   */
  // constructor() {
  //   // Dependencia inyectada para uso posterior
  // }
// }
 

import { Injectable } from '@angular/core';
// import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable,throwError } from 'rxjs';

import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { MercanciasTabla, RespuestaTabla } from '../components/domicillo/domicillo.component';

 
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

  /**
 * Obtiene datos relacionados con derechos desde un archivo JSON.
 *
 * @returns {Observable<unknown>} Un observable que emite los datos obtenidos.
 */

  getDatos(): Observable<unknown> {
    return this.http.get('assets/json/260211/derechos.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
 }

/**
 * Obtiene datos relacionados con proveedores desde un archivo JSON.
 *
 * @returns {Observable<unknown>} Un observable que emite los datos obtenidos.
 */
 getProveedordata(): Observable<unknown> {
  return this.http.get('assets/json/260211/proveedor.json').pipe(
    catchError((error: unknown) => {
      return throwError(() => error);
    })
  );
}

/**
 * Obtiene datos relacionados con localidades desde un archivo JSON.
 *
 * @returns {Observable<unknown>} Un observable que emite los datos obtenidos.
 */
getLocalidaddata(): Observable<unknown> {
  return this.http.get('assets/json/260211/estadolocalidad.json').pipe(
    catchError((error: unknown) => {
      return throwError(() => error);
    })
  );
}

/**
 * Obtiene datos relacionados con terceros desde un archivo JSON.
 *
 * @returns {Observable<PermisoModel[]>} Un observable que emite una lista de objetos `PermisoModel`.
 */

/**
 * Obtiene datos adicionales relacionados con terceros desde un archivo JSON.
 *
 * @returns {Observable<Catalogo[]>} Un observable que emite una lista de objetos `Catalogo`.
 */

getData(): Observable<Catalogo[]> {
  return this.http.get<Catalogo[]>('assets/json/260211/terceros-relacionadoes.json');
}

obtenerEstadoList(): Observable<RespuestaCatalogos> {
  return this.http.get<RespuestaCatalogos>('assets/json/260211/seleccion.json');
}

obtenerTablaDatos(): Observable<RespuestaTabla> {
  return this.http.get<RespuestaTabla>('assets/json/260211/tablaDatos.json');
}

obtenerMercanciasDatos(): Observable<MercanciasTabla> {
  return this.http.get<MercanciasTabla>('assets/json/260211/mercanciasDatos.json');
}
}

 

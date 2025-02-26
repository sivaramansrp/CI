/**
 * @fileoverview Servicio para la gestión de asignaciones de solicitantes.
 * Este servicio maneja la lógica para obtener los datos de asignación de solicitantes.
 * @module SolicitanteasigncionserviceService
 */

import { Injectable } from '@angular/core';
import { HttpCoreService } from '../shared/http/http.service';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * Servicio para la gestión de asignaciones de solicitantes.
 * @providedIn root
 */
@Injectable({
  providedIn: 'root'
})
export class SolicitanteasigncionserviceService {

  /**
   * Constructor del servicio.
   * @param http Servicio HTTP para realizar peticiones.
   */
  constructor(private http: HttpCoreService) { }

  /**
   * Obtiene los datos de asignación.
   * @returns Observable con los datos de asignación.
   */
  getAsigncion(): Observable<unknown> {
    return this.http.get('assets/json/120404/asigncionsolicitante.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos del solicitante de asignación.
   * @returns Observable con los datos del solicitante de asignación.
   */
  getAsigncionsolicitante(): Observable<unknown> {
    return this.http.get('assets/json/120404/getsolicitantetab.json');
  }
}
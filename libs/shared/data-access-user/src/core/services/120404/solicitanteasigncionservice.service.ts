/**
 * @fileoverview Servicio para la gestión de asignaciones de solicitantes.
 * Este servicio maneja la lógica para obtener los datos de asignación de solicitantes.
 * @module SolicitanteasigncionserviceService
 */

import { Catalogo } from '../../models/shared/catalogos.model';
import { Injectable } from '@angular/core';

import { HttpCoreService } from '../shared/http/http.service';

import { Observable } from 'rxjs';

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
  constructor(private http: HttpCoreService) {
    // Lógica de inicialización si es necesario
   }

  /**
   * Obtiene los datos de asignación.
   * @returns Observable con los datos de asignación.
   */
  getAsigncion(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120404/asignacionsolicitante.json').pipe(
    );
  }

  /**
   * Obtiene los datos del solicitante de asignación.
   * @returns Observable con los datos del solicitante de asignación.
   */
  getSolicitante(): Observable<unknown> {
    return this.http.get('assets/json/120404/getsolicitantetab.json');
  }
}
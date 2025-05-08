/**
 * @fileoverview Servicio `EstablecimientoService`
 * Este servicio proporciona métodos para interactuar con los datos relacionados con el establecimiento,
 * incluyendo catálogos, datos de representantes, manifiestos, y propietarios.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';

import { Catalogo } from '@libs/shared/data-access-user/src';

import { PropietarioTipoPersona } from '../models/datos-de-la-solicitud.model';
/**
 * @class EstablecimientoService
 * @description
 * Servicio que gestiona las solicitudes HTTP para obtener datos relacionados con el establecimiento.
 */
@Injectable({
  providedIn: 'root',
})
export class EstablecimientoService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    //constructor
  }

  /**
   * Obtiene los datos del catálogo de SCIAN.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de SCIAN.
   */
  getSciandata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }

  /**
   * Obtiene los datos de justificación.
   * @returns {Observable<PropietarioTipoPersona[]>} Un observable con los datos de justificación.
   */
  getJustificationData(): Observable<PropietarioTipoPersona[]> {
    return this.http.get<PropietarioTipoPersona[]>('assets/json/cofepris/justificacion.json');
  }
  /**
   * Obtiene los datos de un establecimiento por su ID.
   * @param id ID del establecimiento.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del establecimiento.
   */
  getEstadodata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }

}


/**
 *  Servicio encargado de gestionar los datos de la solicitud.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
/**
 * Servicio encargado de gestionar los datos de la solicitud.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de gestionar los datos de la solicitud.
 */
export class DatosDeLaSolicitudService {

  /**
   * Constructor del servicio DatosDeLaSolicitudService.
   * 
   * @param {HttpCoreService} http - El servicio HTTP para realizar peticiones.
   */
  constructor(private http: HttpCoreService) { 
    //
  }

  /**
   * Obtiene las opciones de régimen desde un archivo JSON.
   * 
   * @returns {Observable<any>} - Un observable con las opciones de régimen.
   */
  getRegimen(): Observable<any> {
    return this.http.get('./assets/json/130119/regimen.json');
  }

  /**
   * Obtiene las opciones de clasificación de régimen desde un archivo JSON.
   * 
   * @returns {Observable<any>} - Un observable con las opciones de clasificación de régimen.
   */
  getClasificacionDeRegimen(): Observable<any> {
    return this.http.get('./assets/json/130119/clasificacion-de-regimen.json');
  }

  /**
   * Obtiene las opciones de fracción arancelaria desde un archivo JSON.
   * 
   * @returns {Observable<any>} - Un observable con las opciones de fracción arancelaria.
   */
  getFraccionArancelaria(): Observable<any> {
    return this.http.get('./assets/json/130119/fraccion-arancelaria.json');
  }
  
  /**
   * Obtiene las opciones de países desde un archivo JSON.
   * 
   * @returns {Observable<any>} - Un observable con las opciones de países.
   */
  getPais(): Observable<any> {
    return this.http.get('./assets/json/130119/pais.json');
  }
 /**
  * 
  * estado opciones
  */
  getEstado(): Observable<any> {
    return this.http.get('./assets/json/130119/estado.json');
  }
  /**
   * 
   * representacionfederal opciones
   */
  getRepresentacionfederal(): Observable<any> {
    return this.http.get('./assets/json/130119/representacion-federal.json');
  }

}
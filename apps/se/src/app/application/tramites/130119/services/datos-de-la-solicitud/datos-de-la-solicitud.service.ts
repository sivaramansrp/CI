/**
 *  Servicio encargado de gestionar los datos de la solicitud.
 */
import { CatalogoResponse} from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient) { 
    //
  }

  /**
   * Obtiene las opciones de régimen desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoResponse[]>} - Un observable con las opciones de régimen.
   */
  getRegimen(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('./assets/json/130119/regimen.json');
  }

  /**
   * Obtiene las opciones de clasificación de régimen desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoResponse[]>} - Un observable con las opciones de clasificación de régimen.
   */
  getClasificacionDeRegimen(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('./assets/json/130119/clasificacion-de-regimen.json');
  }

  /**
   * Obtiene las opciones de fracción arancelaria desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoResponse[]>} - Un observable con las opciones de fracción arancelaria.
   */
  getFraccionArancelaria(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('./assets/json/130119/fraccion-arancelaria.json');
  }
  
  /**
   * Obtiene las opciones de países desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoResponse[]>} - Un observable con las opciones de países.
   */
  getPais(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('./assets/json/130119/pais.json');
  }
 /**
  * 
  * estado opciones
  */
  getEstado(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('./assets/json/130119/estado.json');
  }
  /**
   * 
   * representacionfederal opciones
   */
  getRepresentacionfederal(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('./assets/json/130119/representacion-federal.json');
  }

}
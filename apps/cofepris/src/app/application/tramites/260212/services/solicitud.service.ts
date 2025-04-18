import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OpcionesPublicacion, SolicitudModel } from '../models/permiso-maquila.models';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  /**
   * Constructor del servicio SolicitudService.
   * @param http Cliente HTTP para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) { }


  /**
   * Obtiene la lista de solicitudes desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos de tipo SolicitudModel.
   */
  getSolicitudes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>('assets/json/260212/solicitud.json');
  }

  /**
   * Obtiene la lista de claves desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos de tipo CatalogoResponse.
   */
  getClave(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('assets/json/260212/clave.json');
  }

  /**
   * Obtiene las opciones de publicación desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos de tipo OpcionesPublicacion.
   */
  getOpcionesPublicacion(){
    return this.http.get<OpcionesPublicacion[]>('/assets/json/260212/opciones-de-radio.json')
  }

  /**
   * Obtiene la clasificación del producto desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos.
   */
  getClasificacionProducto(){
    return this.http.get<[]>('/assets/json/260212/clasificacionProducto.json')
  }

  /**
   * Obtiene el estado físico desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos.
   */
  getTestadoFisico(){
    return this.http.get<[]>('/assets/json/260212/estadoFisico.json')
  }
  

}

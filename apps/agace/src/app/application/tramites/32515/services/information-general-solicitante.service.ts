import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationGeneralSolicitanteService {

  // Constructor del servicio que inyecta HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) { }

  /**
   * @method getEntidadFederativa
   * @description
   * Obtiene el catálogo de entidades federativas desde un archivo JSON local.
   * Este catálogo se utiliza para llenar selectores en formularios dinámicos.
   * @returns {Observable<Catalogo[]>} Un observable con la lista de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32515/entidadFederativa.json');
  }

  /**
   * @method getMunicipio
   * @description
   * Recupera el catálogo de municipios o demarcaciones territoriales.
   * Este catálogo está almacenado en un archivo JSON local.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de municipios.
   */
  getMunicipio(): Observable<Catalogo[]> { 
    return this.http.get<Catalogo[]>('assets/json/32515/municion.json');
  }

  /**
   * @method getColonia
   * @description
   * Obtiene el catálogo de colonias desde un archivo JSON local.
   * Usado comúnmente en formularios donde se requiere la dirección.
   * @returns {Observable<Catalogo[]>} Un observable que contiene la lista de colonias.
   */
  getColonia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32515/colonia.json');
  }
}

import { Catalogo, RespuestaCatalogos } from '../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @Injectable
 * @providedIn root
 * @description
 * Decorador que marca la clase `ImportacionDefinitivaService` como un servicio inyectable en Angular.
 */
@Injectable({
  providedIn: 'root'
})

export class ImportacionDefinitivaService {

  /**
 * @constructor
 * @description
 * Constructor del servicio `ImportacionDefinitivaService`.
 * @param {HttpClient} http - Servicio de Angular para realizar solicitudes HTTP.
 */
  constructor(
    private http: HttpClient
  //
  ) { }

  /**
 * @method getRegimenMercancia
 * @description
 * Obtiene el catálogo de régimen de mercancía desde un archivo JSON local.
 * @returns {Observable<RespuestaCatalogos>} Observable con los datos del catálogo de régimen de mercancía.
 */
  getRegimenMercancia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/regimen-mercancia.json');
  }
  
  /**
 * @method getClasifiRegimen
 * @description
 * Obtiene el catálogo de clasificación de régimen desde un archivo JSON local.
 * @returns {Observable<RespuestaCatalogos>} Observable con los datos del catálogo de clasificación de régimen.
 */
  getClasifiRegimen(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/clasifi-regimen.json');
  }

  /**
 * @method getFraccionArancelaria
 * @description
 * Obtiene el catálogo de fracciones arancelarias desde un archivo JSON local.
 * @returns {Observable<Catalogo>} Observable con los datos del catálogo de fracciones arancelarias.
 */
  getFraccionArancelaria(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/301/fraccion-arancelaria-options.json');
  }

  /**
 * @method getUnidadDeMedida
 * @description
 * Obtiene el catálogo de unidades de medida desde un archivo JSON local.
 * @returns {Observable<Catalogo>} Observable con los datos del catálogo de unidades de medida.
 */
  getUnidadDeMedida(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110209/unidad.json');
  }

  /**
 * @method getSolicitudMercancia
 * @description
 * Obtiene el catálogo de solicitudes de mercancía desde un archivo JSON local.
 * @returns {Observable<Catalogo>} Observable con los datos del catálogo de solicitudes de mercancía.
 */
  getSolicitudMercancia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/130102/solicitud_mercancia.json');
  }

  /**
 * @method getBloqueData
 * @description
 * Obtiene los datos del catálogo de bloques desde un archivo JSON local.
 * @returns {Observable<Catalogo>} Observable con los datos del catálogo de bloques.
 */
  getBloqueData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/130103/bloque.json');
  }
}

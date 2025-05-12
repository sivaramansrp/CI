import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaMercancia } from '../models/exencion-impuestos.model';
import { Tramite103Store } from '../estados/tramite103.store';

/**
 * Servicio para gestionar datos relacionados con el trámite de exención de impuestos.
 * Este servicio proporciona métodos para obtener catálogos y datos relacionados con importadores y exportadores.
 */
@Injectable({
  providedIn: 'root'
})
export class ExencionImpuestosService {
  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes a recursos externos.
   * @param store Store de Akita para gestionar el estado del trámite.
   */
  constructor(private http: HttpClient, private store: Tramite103Store) {}

  /**
   * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
   * @returns Observable con la respuesta del catálogo de aduanas.
   */
  getAduana(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/103/aduanaIngresara.json');
  }

  /**
   * Obtiene el catálogo de destinos de la mercancía.
   * @returns Observable con la respuesta del catálogo de destinos de la mercancía.
   */
  getDestinoMercancia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/103/destinoMercancia.json');
  }

  /**
   * Obtiene el catálogo de condiciones de la mercancía.
   * @returns Observable con la respuesta del catálogo de condiciones de la mercancía.
   */
  getCondicionMercancia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/103/condicion-mercancia.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns Observable con la respuesta del catálogo de unidades de medida.
   */
  getUnidadMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/103/unidad-medida.json');
  }

  /**
   * Obtiene el catálogo de años disponibles.
   * @returns Observable con la respuesta del catálogo de años.
   */
  getAno(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/103/ano.json');
  }

  /**
   * Obtiene el catálogo de países disponibles.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/103/pais.json');
  }

  /**
   * Obtiene los datos relacionados con las mercancías.
   * @returns Observable con la respuesta de los datos de mercancías.
   */
  agregarMercancias(): Observable<RespuestaMercancia> {
    return this.http.get<RespuestaMercancia>('assets/json/103/mercanciaDatos.json');
  }
}

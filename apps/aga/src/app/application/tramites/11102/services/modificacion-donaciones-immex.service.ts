import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaMercancia } from '../models/modificacion-donaciones-immex.model';
import { Tramite11102Store } from '../estados/tramite11102.store';

/**
 * Servicio para gestionar las operaciones relacionadas con la retirada de la autorización de donaciones.
 */
@Injectable({
  providedIn: 'root'
})
export class ModificacionDonacionesImmexService {
   /**
     * Constructor que se utiliza para la inyección de dependencias.
     * @param http Servicio HTTP para realizar solicitudes a recursos externos.
     * @param store Store de Akita para gestionar el estado del trámite.
     */
    constructor(private http: HttpClient, private store: Tramite11102Store) {
      // El constructor se utiliza para la inyección de dependencias.
    }
  
    /**
     * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
     * @returns Observable con la respuesta del catálogo de aduanas.
     */
    getAduana(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/11102/aduanaIngresara.json');
    }
  
    /**
     * Obtiene el catálogo de tipos de mercancía.
     * @returns Observable con la respuesta del catálogo de tipos de mercancía.
     */
    getTipoDeMercancia(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/11102/tipo-de-mercancia.json');
    }
  
    /**
     * Obtiene el catálogo de condiciones de la mercancía.
     * @returns Observable con la respuesta del catálogo de condiciones de la mercancía.
     */
    getCondicionMercancia(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/11102/condicion-mercancia.json');
    }
  
    /**
     * Obtiene el catálogo de unidades de medida.
     * @returns Observable con la respuesta del catálogo de unidades de medida.
     */
    getUnidadMedida(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/11102/unidad-medida.json');
    }
  
    /**
     * Obtiene el catálogo de años disponibles.
     * @returns Observable con la respuesta del catálogo de años.
     */
    getAno(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/11102/ano.json');
    }
  
    /**
     * Obtiene el catálogo de países disponibles.
     * @returns Observable con la respuesta del catálogo de países.
     */
    getPais(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/11102/pais.json');
    }
  
    /**
     * Obtiene los datos relacionados con las mercancías.
     * @returns Observable con la respuesta de los datos de mercancías.
     */
    agregarMercancias(): Observable<RespuestaMercancia> {
      return this.http.get<RespuestaMercancia>('assets/json/11102/mercanciaDatos.json');
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { TableDataNgTable } from '../models/exencion-impuestos.model'
@Injectable({
  providedIn: 'root'
})
export class ExencionDeImpuestosService {

   /**
     * Constructor que se utiliza para la inyección de dependencias.
     * @param http Servicio HTTP para realizar solicitudes.
     * @param store Store de Akita para gestionar el estado.
     */
    constructor(private http: HttpClient) {
      // El constructor se utiliza para la inyección de dependencias.
    }
  /**
     * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
     * @returns Observable con la respuesta del catálogo de aduanas.
     */
    getAduanaIngresara(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>(
        'assets/json/10703/aduanaIngresara.json'
      )
    }

    getusoEspecifico(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>(
        'assets/json/10703/finalCualDestinara.json'
      )
    }

    getMercanciaTbl(): Observable<TableDataNgTable> {
      return this.http.get<TableDataNgTable>(
        'assets/json/10703/mercancia-table.json'
      )
    }

    getPais(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/10703/pais.json');
    }

     /**
   * Obtiene el catálogo de años disponibles.
   * @returns Observable con la respuesta del catálogo de años.
   */
  getAno(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10703/ano.json');
  }
    
   /**
   * Obtiene el catálogo de unidades de medida.
   * @returns Observable con la respuesta del catálogo de unidades de medida.
   */
   getUnidadMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10703/unidad-medida.json');
  }

    /**
   * Obtiene el catálogo de condiciones de la mercancía.
   * @returns Observable con la respuesta del catálogo de condiciones de la mercancía.
   */
    getCondicionMercancia(): Observable<RespuestaCatalogos> {
      return this.http.get<RespuestaCatalogos>('assets/json/10703/condicion-mercancia.json');
    }

    /**
   * Obtiene el catálogo de tipos de mercancía.
   * @returns Observable con la respuesta del catálogo de tipos de mercancía.
   */
  getTipoDeMercancia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10703/tipo-de-mercancia.json');
  }

  getInicializarDatos(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10703/exencionDelmpuestor.json');
  }
  getInicializarMercancias(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10703/donatario-datos.json');
  }

}

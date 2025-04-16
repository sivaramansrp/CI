import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportarIlustracionesService {

  /**
     * @constructor
     * @description
     * Inicializa el servicio con una instancia de HttpClient para realizar solicitudes HTTP.
     * @param {HttpClient} http - Cliente HTTP para realizar las solicitudes.
     */
    constructor(private http: HttpClient) {
      //
    }

  
    /**
     * @method getMonedaData
     * @description
     * Obtiene los datos del catálogo de monedas desde un archivo JSON.
     * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos de monedas.
     */
    getMonedaData(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('assets/json/270201/moneda.json');
    }
  
    /**
     * @method getArancelariaData
     * @description
     * Obtiene los datos del catálogo de fracciones arancelarias desde un archivo JSON.
     * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos arancelarios.
     */
    getArancelariaData(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('assets/json/270201/arancelaria.json');
    }

    /**
     * @method getAutorData
     * @description
     * Obtiene los datos del catálogo de fracciones arancelarias desde un archivo JSON.
     * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos arancelarios.
     */
    getAutorData(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('assets/json/270101/autor.json');
    }
}

import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCuposTabla } from '../../120201/models/cupos.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDeRegistroTplService {

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
   * @method getClasificacionRegimenData
   * @description
   * Obtiene los datos del catálogo de monedas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos de monedas.
   */
  getClasificacionRegimenData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120101/clasificacion-del-regimen.json');
  }

  /**
   * @method getPaisData
   * @description
   * Obtiene los datos del catálogo de monedas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos de monedas.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120101/pais.json');
  }

  /**
   * Método para obtener datos de solicitud de tabla de cupos.
   * @returns Observable<ResquestaCatalogos> - Observable que emite la resquesta del cupos.
   * @description Método para obtener el tablón de cupos.
   */
  obtenerTablaDatos(): Observable<RespuestaCuposTabla> {
    return this.http.get<RespuestaCuposTabla>('assets/json/120201/tabla-cupos.json');
  }
}

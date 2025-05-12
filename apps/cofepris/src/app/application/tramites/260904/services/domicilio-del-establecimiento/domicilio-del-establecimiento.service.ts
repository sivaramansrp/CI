import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MercanciasTabla } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaTabla } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';

@Injectable({
  providedIn: 'root',
})
export class DomicilioDelEstablecimientoService {
  private readonly tablaDatosUrl =
    '../../../../../assets/json/260904/tablaDatos.json';
  private readonly estadoListUrl =
    '../../../../../assets/json/260904/seleccion.json';
  private readonly mercanciasDatosUrl =
    '../../../../../assets/json/260904/mercanciasDatos.json';

  constructor(private http: HttpClient) {
    //constructor
  }

  /**
   * Método para obtener los datos de la tabla NICO.
   * @returns {Observable<RespuestaTabla>} Observable con los datos de la tabla.
   */
  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>(this.tablaDatosUrl);
  }

  /**
   * Método para obtener la lista de estados.
   * @returns {Observable<RespuestaCatalogos>} Observable con los datos de los estados.
   */
  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(this.estadoListUrl);
  }

  /**
   * Método para obtener los datos de mercancías.
   * @returns {Observable<MercanciasTabla>} Observable con los datos de mercancías.
   */
  obtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>(this.mercanciasDatosUrl);
  }
}

/* eslint-disable sort-imports */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse, RespuestaCatalogos } from '../../models/shared/catalogos.model';
import { enviroment } from '../../../../enviroments/enviroment';
import { catchError, Observable, throwError } from 'rxjs';
import { personaparas, tipos } from '../../models/31601/servicios-pantallas.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosPantallaService {

  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos del catálogo para el primer bimestre.
   * @param catalogo - El nombre del catálogo a obtener.
   * @returns Un observable de `RespuestaCatalogos` que contiene los datos del catálogo.
   */
  getBimestreOneCatalog(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/31601/bimestre-catalog-one.json');
  }

  /**
   * Obtiene los datos del catálogo para el segundo bimestre.
   * @param catalogo - El nombre del catálogo a obtener.
   * @returns Un observable de `RespuestaCatalogos` que contiene los datos del catálogo.
   */
  getBimestreTwoCatalog(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/31601/bimestre-catalog-two.json');
  }

/**
  * Obtiene los datos del catálogo para el tercer bimestre.
  * @param catalogo - El nombre del catálogo a obtener.
  * @returns Un observable de `RespuestaCatalogos` que contiene los datos del catálogo.
  */
  getBimestreThreeCatalog(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/31601/bimestre-catalog-three.json');
  }
  getTipoCatalog(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/31601/tipo-catalog.json');
  }
  getPersonapara() {
    return this.http.get<personaparas[]>('assets/json/31601/personapara.json');
  }
  getTiposCatalog() {
  
  return this.http.get<tipos[]>('assets/json/31601/tipo-di-document.json');
  }
  /**
   * @description Función para obtener el trámite
   * @param id
   * @returns JSONResponse
   */
  obtenerTramite(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}

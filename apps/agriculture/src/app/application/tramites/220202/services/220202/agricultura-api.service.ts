import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { DatosDeTabla } from '../../models/220202/fitosanitario.model';





@Injectable({
  providedIn: 'root'
})
export class AgriculturaApiService {
  url: string = '../../../../../assets/json/220202/';
  constructor(private readonly http: HttpClient) {
    console.log('AgriculturaApiService');
  }
  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }
  /**
      * Obtiene los datos de la tabla desde el archivo JSON.
      * @returns Observable con los datos de la tabla.
      */
  obtenerDatosDeTabla(fileName: string): Observable<DatosDeTabla> {
    const BASEURL = this.url + fileName;
    return this.http.get<DatosDeTabla>(BASEURL).pipe(
      map(response => response)
    );
  }

}
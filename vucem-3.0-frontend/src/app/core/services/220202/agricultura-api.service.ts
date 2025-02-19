import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Catalogo, RespuestaCatalogos } from '../../models/shared/catalogos.model';
import { DatosDeTabla } from '../../models/220202/fitosanitario.model';


@Injectable({
  providedIn: 'root'
})
export class AgriculturaApiService {
  url: string = '../../../../../assets/json/220202/';
  constructor(private readonly http: HttpClient) { }
  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const baseUrl = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(baseUrl).pipe(
      map(response => response.data)
    );
  }
  /**
      * Obtiene los datos de la tabla desde el archivo JSON.
      * @returns Observable con los datos de la tabla.
      */
  obtenerDatosDeTabla(fileName: string): Observable<any[]> {
    const baseUrl = this.url + fileName;
    return this.http.get<DatosDeTabla>(baseUrl).pipe(
      map(response => response.data)
    );
  }

}

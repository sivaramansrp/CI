import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProsecService {
  url: string = '../../../../../assets/json/90101/';
  url2: string = '../../../../../assets/json/90102/';

  constructor(private readonly http: HttpClient) { }
  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  obtenerTablaDatos(fileName: string): Observable<Record<string, unknown>[]> {
    const JSON_URL = this.url2 + fileName;
    return this.http.get<Record<string, unknown>[]>(JSON_URL);
  }
}
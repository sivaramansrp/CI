import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'root'
})
export class ProsecService {
  url: string = '../../../../../assets/json/90101/';

  constructor(private readonly http: HttpClient) { }
  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const baseUrl = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(baseUrl).pipe(
      map(response => response.data)
    );
  }

  obtenerTablaDatos(fileName: string): Observable<any[]> {
    const jsonUrl = this.url + fileName;
      return this.http.get<any[]>(jsonUrl);
  }
}
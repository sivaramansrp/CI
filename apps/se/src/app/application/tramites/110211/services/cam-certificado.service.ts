import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'root'
})
export class CamCertificadoService {
  url: string = '../../../../../assets/json/110211/';

  constructor(private readonly http: HttpClient) { }
  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  obtenerTablaDatos(fileName: string): Observable<any[]> {
    const JSON_URL = this.url + fileName;
      return this.http.get<any[]>(JSON_URL);
  }
}

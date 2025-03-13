import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { URL } from '../../constantes/220202/fitosanitario.enums';





@Injectable({
  providedIn: 'root'
})
export class AgriculturaApiService {
  url: string = URL;
  constructor(private readonly http: HttpClient) {
    // Constructor logic can be added here if needed
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


}
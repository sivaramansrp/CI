import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'root'
})
export class ModificacionDelCmbioDeSectorService {
  url: string = '';

  constructor(private readonly http: HttpClient) { }

  tipoDePersonaLista(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }
}
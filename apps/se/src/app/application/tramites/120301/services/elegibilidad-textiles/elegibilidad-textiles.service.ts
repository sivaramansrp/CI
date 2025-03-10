import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElegibilidadTextilesService {
  url = '../../../../../assets/json/120301/';

  constructor(private readonly http: HttpClient) { 
    // Constructor logic can be added here if needed
  }
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
}
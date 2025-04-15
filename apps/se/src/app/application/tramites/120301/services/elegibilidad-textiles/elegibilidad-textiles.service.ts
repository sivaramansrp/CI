import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { ElegibilidadDeTextilesStore, TextilesState } from '../../estados/elegibilidad-de-textiles.store';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElegibilidadTextilesService {
  url = '../../../../../assets/json/120301/';

  constructor(private readonly http: HttpClient,private elegibilidadDeTextilesStore: ElegibilidadDeTextilesStore) { 
    // Se puede agregar aquí la lógica del constructor si es necesario
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

  obtenerTablaDatos<T>(fileName: string): Observable<T[]> {
    const JSONURL = this.url + fileName;
      return this.http.get<T[]>(JSONURL);
  }

  getFormData(): Observable<TextilesState> {
    return this.elegibilidadDeTextilesStore._select(state => state);
  }
 
}
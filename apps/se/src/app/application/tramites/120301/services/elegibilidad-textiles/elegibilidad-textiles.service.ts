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
   * Obtiene un catálogo para un menú desplegable a partir de un archivo JSON.
   * @param fileName Nombre del archivo JSON a consultar.
   * @returns Observable con el catálogo de opciones.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene los datos de una tabla a partir de un archivo JSON.
   * @param fileName Nombre del archivo JSON a consultar.
   * @returns Observable con los datos de la tabla.
   */
  obtenerTablaDatos<T>(fileName: string): Observable<T[]> {
    const JSONURL = this.url + fileName;
      return this.http.get<T[]>(JSONURL);
  }

  /**
   * Obtiene el estado actual del formulario de elegibilidad de textiles desde el store.
   * @returns Observable con el estado actual del formulario.
   */
  getFormData(): Observable<TextilesState> {
    return this.elegibilidadDeTextilesStore._select(state => state);
  }

  /**
   * Obtiene la lista de países desde un archivo JSON local.
   * @returns Observable con el catálogo de países.
   */
  obtenerListaPaises(): Observable<Catalogo[]> {
    const JSONURL = 'assets/json/120301/ano-de-la-constancia.json';
    return this.http
      .get<Catalogo[]>(JSONURL);
  }
 
}
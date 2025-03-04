import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/**
 * Service to handle Prosec related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ProsecService {
  /** Base URL for JSON files */
  url: string = 'libs/shared/theme/assets/json/90101/';

  /**
   * Constructor to inject HttpClient.
   * @param http HttpClient instance
   */
  constructor(private readonly http: HttpClient) {
    // Constructor logic can be added here if needed
  }
 
  /**
   * Fetches a dropdown menu from a JSON file.
   * @param fileName Name of the JSON file
   * @returns Observable of Catalogo array
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  /**
   * Fetches table data from a JSON file.
   * @param fileName Name of the JSON file
   * @returns Observable of any array
   */
  obtenerTablaDatos(fileName: string): Observable<Catalogo[]> {
    const JSONURL = this.url + fileName;
    console.log(JSONURL);
    return this.http.get<Catalogo[]>(JSONURL);
  }
}
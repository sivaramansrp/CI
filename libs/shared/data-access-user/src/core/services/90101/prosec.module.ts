import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Catalogo, RespuestaCatalogos } from '../../models/shared/catalogos.model';

/**
 * Service to handle Prosec related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ProsecService {
  /** Base URL for JSON files */
  url: string = '../../../../../assets/json/90101/';

  /**
   * Constructor to inject HttpClient.
   * @param http HttpClient instance
   */
  constructor(private readonly http: HttpClient) { }
 
  /**
   * Fetches a dropdown menu from a JSON file.
   * @param fileName Name of the JSON file
   * @returns Observable of Catalogo array
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const baseUrl = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(baseUrl).pipe(
      map(response => response.data)
    );
  }

  /**
   * Fetches table data from a JSON file.
   * @param fileName Name of the JSON file
   * @returns Observable of any array
   */
  obtenerTablaDatos(fileName: string): Observable<any[]> {
    const jsonUrl = this.url + fileName;
    console.log(jsonUrl);
    return this.http.get<any[]>(jsonUrl);
  }
}
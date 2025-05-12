import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private jsonUrl = '/assets/json/290101/';
  constructor(private http: HttpClient) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  obtenerAduanaDeIngreso(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('/assets/json/290101/aduana_de_ingreso.json');
  }

  cargarBodegaPropiaAlquilad(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.jsonUrl}propia-alquilada.json`).pipe(
      map((response) => response)
    );
  }

  cargarEstadoCatalog(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.jsonUrl}estado.json`).pipe(
      map((response) => response)
    );
  }

  cargarClasificacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.jsonUrl}propia-alquilada.json`).pipe(
      map((response) => response)
    );
  } 

  cargarTipoDeCafe(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`/assets/json/290101/tipo-de-cafe.json`).pipe(
      map((response) => response)
    );
  }

  /**
   * Obtiene las opciones para el radio button de exención de pago.
   * @returns {RadioOpcion[]} Lista de opciones para el radio button.
   */
  RadioOpcion = [
    { label: 'Sí', value: 'true' },
    { label: 'No', value: 'false' }
  ];
}

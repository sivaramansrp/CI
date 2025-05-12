import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';

@Injectable({
  providedIn: 'root',
})
export class ExportacionMineralesDeHierroService {
  constructor(private http: HttpClient) {
    //
  }
  /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130202/pais-procenia.json');
  }
  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130202/paises-por-bloque.json'
    );
  }
  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130202/entidad-federativa.json'
    );
  }
  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130202/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130202/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130202/producto-otions.json'
    );
  }
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
      return this.http.get<PartidasDeLaMercanciaModelo[]>(
            'assets/json/130202/partidas-de-la.json'
          );
    }
}

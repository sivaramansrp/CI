import { Observable, map } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/plantas-consulta.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenGridService {
 // eslint-disable-next-line no-empty-function
  constructor(private http: HttpClient){}

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('./assets/json/110204/estado.json')
      .pipe(map((res) => res.data));
  }

  obtenerPaísBloque(): Observable<Catalogo[]> {
    return this.http
      .get<{data: Catalogo[]}>('assets/json/110204/país-bloque.json')
      .pipe(map((res) => res.data));
  }

  obtenerMercancia(): Observable<Mercancia[]> {
    return this.http
      .get<{data:Mercancia[]}>('assets/json/110204/mercancia.json')
      .pipe(map((res) => res.data));
  }
  obtenerIdioma(): Observable<Catalogo[]> {
    return this.http
      .get<{data: Catalogo[]}>('assets/json/110204/idioma.json')
      .pipe(map((res) => res.data));
  }

  obtenerEntidadFederativa(): Observable<Catalogo[]> {
    return this.http
      .get<{data:Catalogo[]}>('assets/json/110204/entidad-federativa.json')
      .pipe(map((res) => res.data));
  }
  obtenerRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http
      .get<{data:Catalogo[]}>('assets/json/110204/representacion-federal.json')
      .pipe(map((res) => res.data));
  }
}
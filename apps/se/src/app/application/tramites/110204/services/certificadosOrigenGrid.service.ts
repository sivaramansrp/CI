/* eslint-disable @typescript-eslint/no-explicit-any */
// filepath: certificadosOrigenGrid.service.ts
import { Mercancia } from '../../110204/models/plantas-consulta.model';
import { Observable, map } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
      .get<Catalogo[]>('./assets/json/110204/estado.json')
      .pipe(map((res: any) => res.data));
  }

  obtenerPaísBloque(): Observable<Catalogo[]> {
    return this.http
      .get<Catalogo[]>('assets/json/110204/país-bloque.json')
      .pipe(map((res: any) => res.data));
  }

  obtenerMercancia(): Observable<Mercancia[]> {
    return this.http
      .get<Mercancia[]>('assets/json/110204/mercancia.json')
      .pipe(map((res: any) => res.data));
  }
  obtenerIdioma(): Observable<Catalogo[]> {
    return this.http
      .get<Catalogo[]>('assets/json/110204/idioma.json')
      .pipe(map((res: any) => res.data));
  }

  obtenerEntidadFederativa(): Observable<Catalogo[]> {
    return this.http
      .get<Mercancia[]>('assets/json/110204/entidad-federativa.json')
      .pipe(map((res: any) => res.data));
  }
  obtenerRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http
      .get<Mercancia[]>('assets/json/110204/representacion-federal.json')
      .pipe(map((res: any) => res.data));
  }
}
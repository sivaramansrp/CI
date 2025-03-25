import { Observable, map } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenService {
  constructor(private http: HttpClient) { }


  obtenerIdioma(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110216/idioma.json')
      .pipe(map((res) => res.data));
  }
  obtenerEntidadFederativa(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110216/entidad-federativa.json')
      .pipe(map((res) => res.data));
  }

  obtenerRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110216/representacion-federal.json')
      .pipe(map((res) => res.data));
  }
}

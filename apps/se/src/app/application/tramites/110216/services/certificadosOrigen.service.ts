import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogoLista, ProductorExportador } from '../models/certificado-origen.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenService {
  constructor(private http: HttpClient) { }


  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110216/idioma.json')
  }
  obtenerEntidadFederativa(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110216/entidad-federativa.json')
  }

  obtenerRepresentacionFederal(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110216/representacion-federal.json')
  }
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http
      .get<ProductorExportador>('assets/json/110216/productor-exportador.json')
  }
}

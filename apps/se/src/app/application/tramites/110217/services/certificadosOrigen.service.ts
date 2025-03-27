import { CatalogoLista } from '../models/certificado-origen.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductorExportador } from '../models/certificado-origen.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenService {
  // eslint-disable-next-line no-empty-function
  constructor(private http: HttpClient) { }


  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/idioma.json')
  }
  obtenerEntidadFederativa(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/entidad-federativa.json')
  }

  obtenerRepresentacionFederal(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/representacion-federal.json')
  }
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http
      .get<ProductorExportador>('assets/json/110217/productor-exportador.json')
  }
}

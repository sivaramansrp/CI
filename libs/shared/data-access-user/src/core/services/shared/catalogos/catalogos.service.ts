import {
  CatalogoPaises,
  RespuestaCatalogos,
  catalogoResponse,
} from '../../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './../../../../../../../../apps/aga/src/app/enviroments/enviroment';
import { JSONResponse } from '../../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  urlServer = enviroment.URL_SERVER;
  urlServerCatalogos = enviroment.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) {}

  getCatalogo(catalogo: string) {
    return this.http.get<catalogoResponse[]>(`${this.urlServer}/${catalogo}`);
  }

  getCatalogos(catalogo: string) {
    return this.http.get<RespuestaCatalogos>(`${this.urlServer}/${catalogo}`);
  }

  getCatalogoPaises(catalogo: string) {
    return this.http.get<CatalogoPaises[]>(`${this.urlServer}/${catalogo}`);
  }

  getCatalogoById(id: number) {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`);
  }
}

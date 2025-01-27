import { Injectable } from '@angular/core';
import { enviroment } from '../../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { CatalogoPaises, catalogoResponse, RespuestaCatalogos } from '../../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  urlServer = enviroment.URL_SERVER;

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


}

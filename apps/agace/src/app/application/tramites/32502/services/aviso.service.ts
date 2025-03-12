import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

@Injectable({
  providedIn: 'any'
})
export class AvisoService {

  constructor(
    private http: HttpClient
  ) {
    //
   }

  getFraccionArancelariaCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-arancelaria-catalogo.json');
  }

  getFraccionReglaCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-regla-catalogo.json');
  }

}

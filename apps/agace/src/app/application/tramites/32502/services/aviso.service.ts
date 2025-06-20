/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

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

  getTipoDocumento(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/tipoDocumento.json');
  }

}

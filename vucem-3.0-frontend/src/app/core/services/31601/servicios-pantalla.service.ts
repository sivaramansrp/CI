import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosPantallaService {

  constructor(private http: HttpClient) { }

  getBimestreOneCatalog(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/31601/bimestre-catalog-one.json');
  }

  getBimestreTwoCatalog(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/31601/bimestre-catalog-two.json');
  }

  getBimestreThreeCatalog(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/31601/bimestre-catalog-three.json');
  }
}

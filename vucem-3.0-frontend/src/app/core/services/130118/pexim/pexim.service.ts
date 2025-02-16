import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '../../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class PeximService {

  constructor(
    private http: HttpClient
  ) { }

  getRegimenMercancia(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/regimen-mercancia.json');
  }

  getClasifiRegimen(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/clasifi-regimen.json');
  }

  getFraccionArancelariaCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/fraccion-arancelaria-catalogo.json');
  }

  getNicoCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/nico-catalogo.json');
  }

  getPaisOrigenCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/pais-origen-catalogo.json');
  }

  getPaisDestinoCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/pais-destino-catalogo.json');
  }

  getEstadoCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/estado.json');
  }

  getMolinoCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/molino.json');
  }

  getUnidadMedidaTarifariaCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/unidad-medida-tarifaria.json');
  }

  getRepresentacionFederal(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/representacion-federal.json');
  }
}

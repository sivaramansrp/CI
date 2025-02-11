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

  getRegimenMercancia() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/regimen-mercancia.json');
  }

  getClasifiRegimen() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/clasifi-regimen.json');
  }

  getFraccionArancelariaCatalogo() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/fraccion-arancelaria-catalogo.json');
  }

  getNicoCatalogo() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/nico-catalogo.json');
  }

  getPaisOrigenCatalogo() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/pais-origen-catalogo.json');
  }

  getPaisDestinoCatalogo() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/pais-destino-catalogo.json');
  }

  getEstadoCatalogo() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/estado.json');
  }

  getMolinoCatalogo() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/molino.json');
  }

  getUnidadMedidaTarifariaCatalogo() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/unidad-medida-tarifaria.json');
  }

  getRepresentacionFederal() {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/representacion-federal.json');
  }
}

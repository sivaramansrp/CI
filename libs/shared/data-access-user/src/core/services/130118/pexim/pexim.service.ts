import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '../../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class PeximService {

  constructor(
    private http: HttpClient
  ) {
    // Lógica de inicialización si es necesario
   }

  getRegimenMercancia(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/regimen-mercancia.json');
  }

  getClasifiRegimen(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/clasifi-regimen.json');
  }

  getFraccionArancelariaCatalogo(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/fraccion-arancelaria-catalogo.json');
  }

  getNicoCatalogo(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/nico-catalogo.json');
  }

  getPaisOrigenCatalogo(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/pais-origen-catalogo.json');
  }

  getPaisDestinoCatalogo(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/pais-destino-catalogo.json');
  }

  getEstadoCatalogo(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/estado.json');
  }

  getMolinoCatalogo(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/molino.json');
  }

  getUnidadMedidaTarifariaCatalogo(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/unidad-medida-tarifaria.json');
  }

  getRepresentacionFederal(_catalogo: string):Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/representacion-federal.json');
  }

  obtenerDocumentosSeleccionados():Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/documentos-seleccionados.json');
  }
}

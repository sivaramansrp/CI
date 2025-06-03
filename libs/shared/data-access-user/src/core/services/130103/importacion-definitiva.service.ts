import { Catalogo, RespuestaCatalogos } from '../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportacionDefinitivaService {

  constructor(
    private http: HttpClient
  // eslint-disable-next-line no-empty-function
  ) { }

  getRegimenMercancia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/regimen-mercancia.json');
  }
  
  getClasifiRegimen(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130118/clasifi-regimen.json');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFraccionArancelaria(): Observable<any> {
    return this.http.get<RespuestaCatalogos>('assets/json/301/fraccion-arancelaria-options.json');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUnidadDeMedida(): Observable<any> {
    return this.http.get<RespuestaCatalogos>('assets/json/110209/unidad.json');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSolicitudMercancia(): Observable<any> {
    return this.http.get<RespuestaCatalogos>('assets/json/130102/solicitud_mercancia.json');
  }

  /**
 * @method getBloqueData
 * @description
 * Obtiene los datos del catálogo de bloques desde un archivo JSON local.
 * @returns {Observable<Catalogo>} Observable con los datos del catálogo de bloques.
 */
  getBloqueData(): Observable<Catalogo> {
    return this.http.get<Catalogo>('assets/json/130103/bloque.json');
  }
}

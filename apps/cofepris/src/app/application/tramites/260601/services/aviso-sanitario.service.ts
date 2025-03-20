import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable } from 'rxjs';
import { ManifiestosRespuesta } from '../models/aviso-model';


@Injectable({
  providedIn: 'root'
})
export class AvisoSanitarioService {

  constructor(
    private http: HttpClient
  ) { }

  /**
     * Método para obtener los medios de transporte.
     * @param {string} catalogo - El nombre del catálogo a obtener
     * @returns Observable con la respuesta de los catálogos de medios de transporte.
     */
  getEstado(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/estado.json');
  }

  getClaveScian(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/clave-scian.json');
  }

  getDescripcionScian(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/descripcion-scian.json');
  }

  getRegimenes(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/regimenes.json');
  }

  getAduanas(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/aduanas.json');
  }

  getProductoClasificacion(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/producto-clasificacion.json');
  }

  getEspecificoProductoClasificacion(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/especifico-producto-clasificacion.json');
  }

  getTipoProducto(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/tipo-producto.json');
  }

  getPaisDestino(catalgo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/pais-destino.json');
  }

  /**
 * Obtiene la lista de manifiestos desde un archivo JSON.
 * 
 * @returns Observable con la respuesta de los manifiestos.
 */
  getManifiestos(): Observable<ManifiestosRespuesta> {
    return this.http.get<ManifiestosRespuesta>('assets/json/260601/manifiestos.json');
  }

  buscarRfc(): Observable<any> {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/representante-legal.json');
  }
}

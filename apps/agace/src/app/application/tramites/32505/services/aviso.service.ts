import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable } from 'rxjs';
import { CatalogoLista } from '../models/avios-model';

@Injectable({
  providedIn: 'any'
})
export class AvisoService {
  obtenerCombustible() {
    return this.http
      .get<CatalogoLista>('assets/json/32505/combustible.json');
  }
  obtenerCilindros():Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/32505/cilindros.json');
  }

  obtenerPaisIssued(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/32505/pais-issued.json');
  }
  

    /**
   * Obtiene la lista de países disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de países desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de países.
   */
    obtenerPais(): Observable<CatalogoLista> {
      return this.http
        .get<CatalogoLista>('assets/json/32505/pais.json');
    }


    obtenerAnio(): Observable<CatalogoLista> {
      return this.http
        .get<CatalogoLista>('assets/json/32505/years.json');
    }
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

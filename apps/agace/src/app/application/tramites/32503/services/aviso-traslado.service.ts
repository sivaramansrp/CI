import { CatalogoLista, RespuestaCatalogos } from '../models/aviso-traslado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisoTrasladoService {
  constructor(private http: HttpClient) { }

  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/32503/idioma.json');
  }
  obtenerDatosSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(`assets/json/32503/datosSolicitante.json`);
  }
  obtenerFederativa(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  obtenerMunicipio(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  obtenerColonias(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
}
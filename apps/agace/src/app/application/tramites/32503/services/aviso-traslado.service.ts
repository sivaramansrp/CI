import { AnexosLista, AvisoTablaDatos, CatalogoLista, DocumentosLista, MercanciaTablaDatos, RespuestaCatalogos } from '../models/aviso-traslado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisoTrasladoService {
  // eslint-disable-next-line no-empty-function
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
  obtenerAvisoTabla(): Observable<AvisoTablaDatos> {
    return this.http.get<AvisoTablaDatos>(`assets/json/32503/aviso-tabla.json`);
  }
  obtenerMercanciaTabla(): Observable<MercanciaTablaDatos> {
    return this.http.get<MercanciaTablaDatos>(`assets/json/32503/mercancia-tabla.json`);
  }
  obtenerFraccionArancelaria(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  obtenerUnidadMedida(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  obtenerTipoDocumento(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/tipo-documento.json`);
  }
  obtenerTipoDocumentoSeleccionado(): Observable<DocumentosLista> {
    return this.http.get<DocumentosLista>(`assets/json/32503/tipo-documento-seleccionado.json`);
  }
  obtenerAnexos(): Observable<AnexosLista> {
    return this.http.get<AnexosLista>(`assets/json/32503/anexos.json`);
  }
}

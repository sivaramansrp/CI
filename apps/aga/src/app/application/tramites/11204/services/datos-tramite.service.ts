import { RespuestaAduanas, RespuestaContenedores } from "../models/datos-tramite.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespuestaApi } from "../models/datos-tramite.model";
import { RespuestaCatalogos } from "@libs/shared/data-access-user/src";
import { RespuestaContenedor } from "../models/datos-tramite.model";

@Injectable({
  providedIn: 'any',
})
export class DatosTramiteService {

  constructor(
    private http: HttpClient
    // eslint-disable-next-line no-empty-function
  ) {
  }
  /**
   * Get a lista of Contenedores
   */
  getContenedores(): Observable<RespuestaContenedores> {
    return this.http.get<RespuestaContenedores>(`assets/json/11204/tipoLista.json`);
  }

  /**
  * Simular un envío exitoso de formulario
  */
  submitSolicitud(): Observable<RespuestaAduanas> {
    return this.http.get<RespuestaAduanas>(`assets/json/11204/aduanaList.json`);
  }

  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(`assets/json/11204/contenedorLista.json`);
  }

  getAduanaLista(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/11204/aduanaList.json`);
  }
  
  getDatosTableData(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(`assets/json/11204/datosTabla.json`);
  }

}

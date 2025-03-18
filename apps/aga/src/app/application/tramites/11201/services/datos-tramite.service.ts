import { RespuestaAduanas, RespuestaContenedores } from "@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespuestaApi } from "@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model";
import { RespuestaCatalogos } from "@libs/shared/data-access-user/src";
import { RespuestaContenedor } from "@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model";

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
   * Get a dummy list of Contenedores
   */
  getContenedores(): Observable<RespuestaContenedores> {
    return this.http.get<RespuestaContenedores>(`assets/json/11201/tipoLista.json`);
  }
  /**
  * Simulate file upload
  */
  uploadArchivo(archivo: File): Observable<RespuestaApi> {
    console.log('Simulating file upload:', archivo.name);
    return this.http.get<RespuestaApi>(`assets/json/11201/contenedorLista.json`);
  }

  /**
  * Simulate a successful form submission
  */
  submitSolicitud(): Observable<RespuestaAduanas> {
    console.log('Simulating form submission');
    return this.http.get<RespuestaAduanas>(`assets/json/11201/aduanaList.json`);
  }

  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(`assets/json/11201/contenedorLista.json`);
  }

  getTransporteList(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/11201/${catalogo}.json`);
  }
  /**
  * Get a dummy list of Aduanas
  */
  getAduanaList(catalogo: string): Observable<RespuestaAduanas> {
    return this.http.get<RespuestaAduanas>(`assets/json/11201/${catalogo}.json`);
  }

}

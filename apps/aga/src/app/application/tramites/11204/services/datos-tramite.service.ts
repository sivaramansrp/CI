import { RespuestaAduanas, RespuestaConsulta } from "../models/datos-tramite.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespuestaCatalogos } from "@libs/shared/data-access-user/src";
import { RespuestaContenedor } from "../models/datos-tramite.model";

/**
 * Servicio Injectable para gestionar las operaciones relacionadas con los datos del trámite.
 */
@Injectable({
  providedIn: 'any',
})
export class DatosTramiteService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(
    private http: HttpClient
    // eslint-disable-next-line no-empty-function
  ) {}

  /**
   * Obtiene la lista de contenedores.
   * @returns Un observable con la respuesta de los catálogos de contenedores.
   */
  getContenedores(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/11204/tipoLista.json`);
  }

  /**
   * Agrega una solicitud.
   * @returns Un observable con la respuesta del contenedor.
   */
  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(`assets/json/11204/contenedorLista.json`);
  }

  /**
   * Obtiene la lista de aduanas.
   * @param _catalogo Identificador del catálogo.
   * @returns Un observable con la respuesta de los catálogos de aduanas.
   */
  getAduanaLista(_catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/11204/aduanaList.json`);
  }

  /**
   * Obtiene los datos para mostrar en la tabla.
   * @returns Un observable con la respuesta de los catálogos de datos de la tabla.
   */
  getDatosTableData(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/11204/datosTabla.json`);
  }

  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consulta_11201.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(`assets/json/11201/consultaDatos.json`);
  }

}

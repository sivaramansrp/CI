import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaConsulta } from '../models/adace.model';

/**
 * Servicio para gestionar la obtención de datos relacionados con los catálogos del trámite 32508.
 */
@Injectable({
  providedIn: 'root'
})
export class AdaceService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP utilizado para realizar solicitudes a los recursos JSON.
   */
  constructor(private http: HttpClient) {
    // Constructor utilizado para la creación de objetos requeridos en el componente
  }

  /**
   * Obtiene los datos del catálogo de años.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo` con los datos de los años.
   */
  obtenerDatosAno(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32508/ano.json');
  }

  /**
   * Obtiene los datos del catálogo de meses.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo` con los datos de los meses.
   */
  obtenerDatosMes(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32508/mes.json');
  }

  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consultaDatos.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(`assets/json/32508/adaceDatos.json`);
  }
}
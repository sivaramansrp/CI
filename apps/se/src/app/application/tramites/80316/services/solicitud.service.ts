// import { Anexo, Complimentaria, Federetarios, Operacions } from '../estados/models/plantas-consulta.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { DatosDelModificacion, Empresas, Plantas } from '../models/datos-tramite.model';
import { Anexo, Complimentaria, Federetarios, Operacions } from '../../80308/models/plantas-consulta.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) {}

  /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80316/datosSolicitante.json`
    );
  }

  /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80316/modificacion.json`
    );
  }

  // getModificacion(): Observable<RespuestaCatalogos[]> {
  //   return this.http.get<RespuestaCatalogos[]>(
  //     `assets/json/80316/modificacion.json`
  //   );
  // }

  getActividadProductiva(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/80316/actividadProductiva.json`);
  }

    /**
     * Obtiene una lista de objetos de tipo `Complimentaria` desde un archivo JSON local.
     * 
     * @returns Un observable que emite un arreglo de objetos `Complimentaria`.
     */
    obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<Complimentaria[]>('assets/json/80316/complimentaria.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de anexos desde un archivo JSON localizado en los activos.
   *
   * @returns {Observable<Anexo[]>} Un observable que emite un arreglo de objetos de tipo Anexo.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<Anexo[]>('assets/json/80316/anexo.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene la lista de federatarios desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos de tipo `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<Federetarios[]>('assets/json/80316/federetarios.json').pipe(map((res: any) => res.data));
  }
  
  /**
   * Obtiene una lista de operaciones desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `Operacions`.
   * El archivo JSON se encuentra en la ruta `assets/json/80316/operacion.json`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<Operacions[]>('assets/json/80316/operacion.json').pipe(map((res: any) => res.data));
  }

  obtenerEmpresas(): Observable<Empresas[]> {
    return this.http.get<Empresas[]>(`assets/json/80316/empresas.json`).pipe(map((res: any) => res.data));
  }

  obtenerPlantas(): Observable<Plantas[]> {
    return this.http.get<Plantas[]>(`assets/json/80316/plantas.json`).pipe(map((res: any) => res.data));
  }
}

import { Anexo, Complimentaria, Federetarios, Operacions } from '../estados/models/plantas-consulta.model';
import { Observable, map } from 'rxjs';
import { DatosDelModificacion } from '../estados/models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Solicitud80302State } from '../../../estados/tramites/tramite80302.store';

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
      `assets/json/80302/datosSolicitante.json`
    );
  }

    /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80302/modificacion.json`
    );
  }

  getModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80302/modificacion.json`
    );
  }

  /**
   * Obtener datos de la tabla
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos de la tabla.
   */
  getDatosTableData(): Observable<DatosDelModificacion[]> {
    return this.http.get<DatosDelModificacion[]>(
      `assets/json/80302/datosTabla.json`
    );
  }

    /**
     * Obtiene una lista de objetos de tipo `Complimentaria` desde un archivo JSON local.
     * 
     * @returns Un observable que emite un arreglo de objetos `Complimentaria`.
     */
    obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<Complimentaria[]>('assets/json/80302/complimentaria.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de anexos desde un archivo JSON localizado en los activos.
   *
   * @returns {Observable<Anexo[]>} Un observable que emite un arreglo de objetos de tipo Anexo.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<Anexo[]>('assets/json/80302/anexo.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene la lista de federatarios desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos de tipo `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<Federetarios[]>('assets/json/80302/federetarios.json').pipe(map((res: any) => res.data));
  }
  
  /**
   * Obtiene una lista de operaciones desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `Operacions`.
   * El archivo JSON se encuentra en la ruta `assets/json/80302/operacion.json`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<Operacions[]>('assets/json/80302/operacion.json').pipe(map((res: any) => res.data));
  }

    /**
     * Obtiene los datos del trámite desde un archivo JSON local.
     * @returns Observable con objeto parcial de TramiteState.
     */
    obtenerTramiteDatos(): Observable<Partial<Solicitud80302State>> {
      return this.http
        .get<Partial<Solicitud80302State>>('assets/json/80302/tramite_datos.json')
        .pipe(map((res: any) => res.data));
    }
}

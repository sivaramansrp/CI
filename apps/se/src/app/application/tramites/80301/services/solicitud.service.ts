import { Anexo, Bitacora, Complimentaria, Federetarios, Operacions } from '../models/plantas-consulta.model';
import { Observable, map } from 'rxjs';
import { Solicitud80301State, Solicitud80301StateObj, Tramite80301Store } from '../estados/tramite80301.store';
import { DatosDelModificacion } from '../models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

interface ComplimentariaResponse {
    data: Complimentaria[];
  }
  interface AnixoResponse {
    data: Anexo[];  
  }
  interface FederetariosResponse {
    data:Federetarios[];
  }
  interface OperacionsResponse {
    data: Operacions[];
  }
  
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient, private store:Tramite80301Store) {}

  
  /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosDelSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<{ data: RespuestaCatalogos[] }>(
      'assets/json/80301/datosSolicitante.json').pipe(
      map(response => response.data)
    );
  }

    /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80301/modificacion.json`
    );
  }

  getModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80301/modificacion.json`
    );
  }

  /**
   * Obtener datos de la tabla
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos de la tabla.
   */
  getDatosTableData(): Observable<DatosDelModificacion[]> {
    return this.http.get<DatosDelModificacion[]>(
      `assets/json/80301/datos-tabla.json`
    );
  }

    /**
     * Obtiene una lista de objetos de tipo `Complimentaria` desde un archivo JSON local.
     * 
     * @returns Un observable que emite un arreglo de objetos `Complimentaria`.
     */
    obtenerComplimentaria(): Observable<Complimentaria[]> {
        return this.http
          .get<ComplimentariaResponse>('assets/json/80301/complimentria-opracion.json')
          .pipe(map((res: ComplimentariaResponse) => res.data));
      }

  /**
   * Obtiene una lista de anexos desde un archivo JSON localizado en los activos.
   *
   * @returns {Observable<Anexo[]>} Un observable que emite un arreglo de objetos de tipo Anexo.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<AnixoResponse>('assets/json/80301/anexo.json')
      .pipe(map((res: AnixoResponse) => res.data));
  }

  /**
   * Obtiene la lista de federatarios desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos de tipo `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<FederetariosResponse>('assets/json/80301/federetarios.json')
      .pipe(map((res: FederetariosResponse) => res.data));
  }
  
  /**
   * Obtiene una lista de operaciones desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `Operacions`.
   * El archivo JSON se encuentra en la ruta `assets/json/80301/operacion.json`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<OperacionsResponse>('assets/json/80301/operacion.json')
      .pipe(map((res: OperacionsResponse) => res.data));
}

/**
 * Obtiene los registros de bitácora desde un archivo JSON local.
 *
 * @returns Un observable que emite un arreglo de objetos de tipo Bitacora.
 */
obtenerBitacora(): Observable<Bitacora[]> {
  return this.http
    .get<{ data: Bitacora[] }>('assets/json/80301/bitcora-one-tablo.json')
    .pipe(map((res) => res.data));
}

/**
 * Actualiza el estado del formulario con los datos de modificación proporcionados.
 *
 * @param DATOS - Objeto que contiene la información del estado de la solicitud 80301.
 */
actualizarEstadoFormulario(DATOS: Solicitud80301State): void {
  this.store.setRfc(DATOS.datosModificacion.rfc);
  this.store.setFederal(DATOS.datosModificacion.federal);
  this.store.setTipo(DATOS.datosModificacion.tipo);
  this.store.setPrograma(DATOS.datosModificacion.programa);
}

/**
 * Obtiene los datos del trámite desde un archivo JSON local.
 *
 * @returns Un observable que emite el objeto de estado completo de la solicitud 80301.
 */
obtenerTramiteDatos(): Observable<Solicitud80301StateObj> {
  return this.http.get<Solicitud80301StateObj>('assets/json/80301/tramite_datos.json');
}


}

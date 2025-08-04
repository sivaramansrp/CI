import { Anexo, Bitacora, Complimentaria, Federetarios, Operacions } from '../models/plantas-consulta.model';
import { Observable, map } from 'rxjs';
import { Solicitud80301State, Solicitud80301StateObj, Tramite80301Store } from '../estados/tramite80301.store';
import { DatosDelModificacion } from '../models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

/**
 * Interfaces internas para mapear la estructura de las respuestas JSON.
 */
interface ComplimentariaResponse {
  data: Complimentaria[];
}

/**
 * Representa la estructura de respuesta que contiene un arreglo de objetos `Anexo`.
 *
 * @property data - Un arreglo de elementos `Anexo` retornados en la respuesta.
 */
interface AnixoResponse {
  data: Anexo[];
}

/**
 * Representa la estructura de respuesta que contiene un arreglo de objetos `Federetarios`.
 *
 * @property data - Un arreglo de elementos `Federetarios` retornados en la respuesta.
 */
interface FederetariosResponse {
  data: Federetarios[];
}

/**
 * Representa la estructura de respuesta para operaciones.
 *
 * @property data - Un arreglo de objetos `Operacions` retornados desde el servicio.
 */
interface OperacionsResponse {
  data: Operacions[];
}

/**
 * Servicio que gestiona la obtención y actualización de datos relacionados con
 * el trámite IMMEX 80301, incluyendo modificación de domicilio, anexos, operaciones,
 * fedatarios, bitácora, etc.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient, private store: Tramite80301Store) {}

  /**
   * Obtiene los datos del solicitante desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos[]>} Observable con la lista de datos del solicitante.
   */
  getDatosDelSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<{ data: RespuestaCatalogos[] }>(
      'assets/json/80301/datosSolicitante.json'
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene los datos de modificación desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos[]>} Observable con los datos de modificación.
   */
  getDatosModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      'assets/json/80301/modificacion.json'
    );
  }

  /**
   * Alias duplicado de `getDatosModificacion`. Considera eliminar si no se requiere.
   */
  getModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      'assets/json/80301/modificacion.json'
    );
  }

  /**
   * Obtiene los datos de una tabla (por ejemplo, para mostrar en un componente de tabla dinámica).
   * 
   * @returns {Observable<DatosDelModificacion[]>} Observable con los registros de la tabla.
   */
  getDatosTableData(): Observable<DatosDelModificacion[]> {
    return this.http.get<DatosDelModificacion[]>(
      'assets/json/80301/datos-tabla.json'
    );
  }

  /**
   * Obtiene una lista de accionistas o representantes complementarios.
   * 
   * @returns {Observable<Complimentaria[]>} Observable con la lista de objetos `Complimentaria`.
   */
  obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<ComplimentariaResponse>('assets/json/80301/complimentria-opracion.json')
      .pipe(map((res: ComplimentariaResponse) => res.data));
  }

  /**
   * Obtiene una lista de anexos asociados al trámite.
   * 
   * @returns {Observable<Anexo[]>} Observable con la lista de objetos `Anexo`.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<AnixoResponse>('assets/json/80301/anexo.json')
      .pipe(map((res: AnixoResponse) => res.data));
  }

  /**
   * Obtiene la lista de fedatarios públicos que participan en el trámite.
   * 
   * @returns {Observable<Federetarios[]>} Observable con los objetos `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<FederetariosResponse>('assets/json/80301/federetarios.json')
      .pipe(map((res: FederetariosResponse) => res.data));
  }

  /**
   * Obtiene las operaciones registradas en el contexto del trámite.
   * 
   * @returns {Observable<Operacions[]>} Observable con los objetos `Operacions`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<OperacionsResponse>('assets/json/80301/operacion.json')
      .pipe(map((res: OperacionsResponse) => res.data));
  }

  /**
   * Obtiene los registros históricos de modificaciones en una bitácora.
   * 
   * @returns {Observable<Bitacora[]>} Observable con los registros de la bitácora.
   */
  obtenerBitacora(): Observable<Bitacora[]> {
    return this.http
      .get<{ data: Bitacora[] }>('assets/json/80301/bitcora-one-tablo.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Actualiza el estado del formulario 80301 en el store, usando los datos de modificación actuales.
   * 
   * @param DATOS - Objeto con los valores actualizados del formulario de modificación.
   */
  actualizarEstadoFormulario(DATOS: Solicitud80301State): void {
    this.store.setRfc(DATOS.datosModificacion.rfc);
    this.store.setFederal(DATOS.datosModificacion.federal);
    this.store.setTipo(DATOS.datosModificacion.tipo);
    this.store.setPrograma(DATOS.datosModificacion.programa);
  }

  /**
   * Carga el estado completo del trámite desde un archivo local en formato JSON.
   * 
   * @returns {Observable<Solicitud80301StateObj>} Observable con el objeto de estado completo.
   */
  obtenerTramiteDatos(): Observable<Solicitud80301StateObj> {
    return this.http.get<Solicitud80301StateObj>('assets/json/80301/tramite_datos.json');
  }
}

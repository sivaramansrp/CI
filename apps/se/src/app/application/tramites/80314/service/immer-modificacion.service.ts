import {
  Anexo,
  Bitacora,
  Complimentaria,
  DatosModificacion,
  DomicilioInfo,
  Federetarios,
  Operacions,
} from '../estados/models/plantas-consulta.model';
import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import { Observable, map } from 'rxjs';
import { DatosDelModificacion } from '../estados/models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ComplimentariaResponse {
  data: Complimentaria[];
}
interface AnexoResponse {
  data: Anexo[];
}
interface FederetariosResponse {
  data: Federetarios[];
}
interface OperacionsResponse {
  data: Operacions[];
}

interface DomicilioInfoResponse {
  data: DomicilioInfo[];
}
interface BitacoraResponse {
  data: Bitacora[];
}
interface DatosModificacionResponse {
  data: DatosModificacion;
}
interface CatalogoResponse {
  data: Catalogo[];
}
@Injectable({
  providedIn: 'root',
})
export class ImmerModificacionService {
  constructor(private http: HttpClient) {}

  /**
   * Obtener una lista de Transporte
   *
   * @param {string} catalogo - El nombre del catálogo a obtener.
   * @returns {Observable<RespuestaCatalogos>} Un observable con la respuesta del catálogo de transporte.
   */
  getTablaData(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      `assets/json/80314/${catalogo}.json`
    );
  }

  /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80314/datosSolicitante.json`
    );
  }

  /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80314/modificacion.json`
    );
  }

  /**
   * Obtiene los datos de modificación desde un archivo JSON local.
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable que emite un arreglo de objetos de tipo `RespuestaCatalogos`.
   */
  getModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80314/modificacion.json`
    );
  }

  /**
   * Obtener datos de la tabla
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos de la tabla.
   */
  getDatosTableData(): Observable<DatosDelModificacion[]> {
    return this.http.get<DatosDelModificacion[]>(
      `assets/json/80314/datosTabla.json`
    );
  }

  /**
   * Obtiene una lista de objetos de tipo `Complimentaria` desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos `Complimentaria`.
   */
  obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<ComplimentariaResponse>('assets/json/80314/complimentaria.json')
      .pipe(map((res: ComplimentariaResponse) => res.data));
  }

  /**
   * Obtiene una lista de anexos desde un archivo JSON localizado en los activos.
   *
   * @returns {Observable<Anexo[]>} Un observable que emite un arreglo de objetos de tipo Anexo.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<AnexoResponse>('assets/json/80314/anexo.json')
      .pipe(map((res: AnexoResponse) => res.data));
  }

  /**
   * Obtiene la lista de federatarios desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<FederetariosResponse>('assets/json/80314/federetarios.json')
      .pipe(map((res: FederetariosResponse) => res.data));
  }

  /**
   * Obtiene una lista de operaciones desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `Operacions`.
   * El archivo JSON se encuentra en la ruta `assets/json/80314/operacion.json`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<OperacionsResponse>('assets/json/80314/operacion.json')
      .pipe(map((res: OperacionsResponse) => res.data));
  }

  /**
   * Obtiene la lista de plantas desde un archivo JSON localizado en los activos.
   *
   * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de objetos `Operacions`.
   */
  obtenerPlanta(): Observable<Operacions[]> {
    return this.http
      .get<OperacionsResponse>('assets/json/80314/planta.json')
      .pipe(map((res: OperacionsResponse) => res.data));
  }

  /**
   * Obtiene una lista de servicios desde un archivo JSON local.
   *
   * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de operaciones.
   */
  obtenerServicios(): Observable<Operacions[]> {
    return this.http
      .get<OperacionsResponse>('assets/json/80314/servicios.json')
      .pipe(map((res: OperacionsResponse) => res.data));
  }

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return this.http
      .get<CatalogoResponse>('./assets/json/80314/estado.json')
      .pipe(map((res: CatalogoResponse) => res.data));
  }

  obtenerDomicilios(): Observable<DomicilioInfo[]> {
    return this.http
      .get<DomicilioInfoResponse>('assets/json/80314/domicilio.json')
      .pipe(map((res: DomicilioInfoResponse) => res.data));
  }

  obtenerBitacora(): Observable<Bitacora[]> {
    return this.http
      .get<BitacoraResponse>('assets/json/80314/bitacora.json')
      .pipe(map((res: BitacoraResponse) => res.data));
  }

  obtenerDatosGenerales(): Observable<DatosModificacion> {
    return this.http
      .get<DatosModificacionResponse>('assets/json/80314/datos-modificacion.json')
      .pipe(map((res: DatosModificacionResponse) => res.data));
  }
}

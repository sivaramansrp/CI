import { Anexo, Bitacora, Complimentaria, ComplimentariaDatos, DatosModificacion, DomicilioInfo, Federetarios, Operacions } from '../estados/models/plantas-consulta.model';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable, map } from 'rxjs';
import { DatosDelModificacion } from '../estados/models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestTablaDatos } from '../models/datos-tramite.model';

@Injectable({
  providedIn: 'root'
})
export class ImmerModificacionService {

  constructor(
    private http: HttpClient,
  ) { }

      /**
     * Obtener una lista de Transporte
     * 
     * @param {string} catalogo - El nombre del catálogo a obtener.
     * @returns {Observable<RespuestTablaDatos>} Un observable con la respuesta del catálogo de transporte.
     */
    getTablaData(catalogo: string): Observable<RespuestTablaDatos> {
      return this.http.get<RespuestTablaDatos>(`assets/json/80306/${catalogo}.json`);
    }

      /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80306/datosSolicitante.json`
    );
  }

    /**
   * Obtener datos del solicitante
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80306/modificacion.json`
    );
  }

  /**
   * Obtiene los datos de modificación desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos[]>} Un observable que emite un arreglo de objetos de tipo `RespuestaCatalogos`.
   */
  getModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(
      `assets/json/80306/modificacion.json`
    );
  }

  /**
   * Obtener datos de la tabla
   *
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos de la tabla.
   */
  getDatosTableData(): Observable<DatosDelModificacion[]> {
    return this.http.get<DatosDelModificacion[]>(
      `assets/json/80306/datosTabla.json`
    );
  }

    /**
     * Obtiene una lista de objetos de tipo `Complimentaria` desde un archivo JSON local.
     * 
     * @returns Un observable que emite un arreglo de objetos `Complimentaria`.
     */
    obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<ComplimentariaDatos>('assets/json/80306/complimentaria.json').pipe(map((res: ComplimentariaDatos) => res.data));
  }

  /**
   * Obtiene una lista de anexos desde un archivo JSON localizado en los activos.
   *
   * @returns {Observable<Anexo[]>} Un observable que emite un arreglo de objetos de tipo Anexo.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<{data: Anexo[]}>('assets/json/80306/anexo.json').pipe(map((res: {data:Anexo[]}) => res.data));
  }

  /**
   * Obtiene la lista de federatarios desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos de tipo `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<{data: Federetarios[]}>('assets/json/80306/federetarios.json').pipe(map((res: {data: Federetarios[]}) => res.data));
  }
  
  /**
   * Obtiene una lista de operaciones desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `Operacions`.
   * El archivo JSON se encuentra en la ruta `assets/json/80306/operacion.json`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<{data: Operacions[]}>('assets/json/80306/operacion.json').pipe(map((res: {data: Operacions[]}) => res.data));
  }

  /**
   * Obtiene la lista de plantas desde un archivo JSON localizado en los activos.
   * 
   * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de objetos `Operacions`.
   */
  obtenerPlanta(): Observable<Operacions[]> {
    return this.http
      .get<{data: Operacions[]}>('assets/json/80306/planta.json').pipe(map((res: {data: Operacions[]}) => res.data));
  }

  /**
   * Obtiene una lista de servicios desde un archivo JSON local.
   *
   * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de operaciones.
   */
  obtenerServicios(): Observable<Operacions[]> {
    return this.http
      .get<{data: Operacions[]}>('assets/json/80306/servicios.json').pipe(map((res: {data: Operacions[]}) => res.data));
  }

  /**
     * Obtiene la lista de estados.
     * @method obtenerListaEstado
     * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
     */
    obtenerListaEstado(): Observable<Catalogo[]> {
      return this.http
        .get<{data: Catalogo[]}>('./assets/json/80306/estado.json').pipe(map((res: {data: Catalogo[]}) => res.data));
    }
  
    obtenerDomicilios(): Observable<DomicilioInfo[]> {
      return this.http
        .get<{data: DomicilioInfo[]}>('assets/json/80306/domicilio.json').pipe(map((res: {data: DomicilioInfo[]}) => res.data));
    }
  
    obtenerBitacora(): Observable<Bitacora[]> {
      return this.http
        .get<{data: Bitacora[]}>('assets/json/80306/bitacora.json').pipe(map((res: {data: Bitacora[]}) => res.data));
    }
  
    obtenerDatosGenerales(): Observable<DatosModificacion> {
      return this.http
        .get<{data: DatosModificacion}>('assets/json/80306/datos-modificacion.json').pipe(map((res: {data: DatosModificacion}) => res.data));
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anexo, Complimentaria, Federetarios, GuardarSolicitudPayload, Operacions, PlantasResponse, SolicitudPayload } from '../estados/models/plantas-consulta.model';
import { HttpCoreService,JSONResponse } from '@ng-mf/data-access-user';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Params, Programa, SocioAccionistaPayload } from '../estados/models/payload.model';
import { DatosDelModificacion } from '../estados/models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PROC_80302 } from '../servers/api-route';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Solicitud80302State } from '../../../estados/tramites/tramite80302.store';
import { Tramite80302Query } from '../../../estados/queries/tramite80302.query';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient, 
    public httpService: HttpCoreService,
    private Tramite80302Query: Tramite80302Query
  ) {}

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

    /**
     * Obtiene la lista de plantas desde un archivo JSON localizado en los activos.
     * 
     * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de objetos `Operacions`.
     */
    obtenerPlanta(): Observable<Operacions[]> {
      return this.http
        .get<{data: Operacions[]}>('assets/json/80302/planta.json').pipe(map((res: {data: Operacions[]}) => res.data));
    }

    /**
     * Obtiene una lista de servicios desde un archivo JSON local.
     *
     * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de operaciones.
     */
    obtenerServicios(): Observable<Operacions[]> {
      return this.http
        .get<{data: Operacions[]}>('assets/json/80302/servicios.json').pipe(map((res: {data: Operacions[]}) => res.data));
    }

  /**
   * Obtiene la lista de socios o accionistas desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `SocioAccionista`.
   */
  obtenerBuscarSocioAccionista(body:SocioAccionistaPayload): Observable<JSONResponse> {
    return this.http.post(PROC_80302.BUSCAR_SOCIO_ACCIONISTA, body).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.BUSCAR_SOCIO_ACCIONISTA}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la lista de notarios desde un archivo JSON local.
   *
   * @returns Un observable que emite un arreglo de objetos de tipo `Notario`.
   */
  obtenerBuscarNotarios(body:SocioAccionistaPayload): Observable<JSONResponse> {
    return this.http.post(PROC_80302.BUSCAR_NOTARIOS, body).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.BUSCAR_NOTARIOS}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la información de la operación IMMEX desde el servidor.
   * @param body Cuerpo de la solicitud con los parámetros necesarios.
   * @returns Observable con la respuesta JSON.
   */
  obtenerOperacionImmex(body:SocioAccionistaPayload): Observable<JSONResponse> {
    return this.http.post(PROC_80302.OPERACION_IMMEX, body).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.OPERACION_IMMEX}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la lista de productos de exportación desde el servidor.
   * @param queryParams Parámetros de consulta para la solicitud.
   * @returns Observable con la respuesta JSON.
   */
  obtenerAnexoExportacion(queryParams: Params): Observable<JSONResponse> {
    const PARAMS_OBJ: { [param: string]: string | number | boolean } = { ...queryParams };
    return this.http.get<JSONResponse>(PROC_80302.ANEXO_EXPORTACION, { params: PARAMS_OBJ }).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.ANEXO_EXPORTACION}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la lista de productos de importación desde el servidor.
   * @param queryParams Parámetros de consulta para la solicitud.
   * @returns Observable con la respuesta JSON.
   */
  obtenerAnexoImportacion(queryParams: Params): Observable<JSONResponse> {
    const PARAMS_OBJ: { [param: string]: string | number | boolean } = { ...queryParams };
    return this.http.get<JSONResponse>(PROC_80302.ANEXO_IMPORTACION, { params: PARAMS_OBJ }).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.ANEXO_IMPORTACION}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la bitácora IMMEX desde el servidor.
   * @param queryParams Parámetros de consulta para la solicitud.
   * @returns Observable con la respuesta JSON.
   */
  obtenerBitacora(queryParams: Params): Observable<JSONResponse> {
    const PARAMS_OBJ: { [param: string]: string | number | boolean } = { ...queryParams };
    return this.http.get<JSONResponse>(PROC_80302.BITACORA, { params: PARAMS_OBJ }).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.BITACORA}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene los datos de certificación SAT desde el servidor.
   * @param queryParams Parámetros de consulta para la solicitud.
   * @returns Observable con la respuesta JSON.
   */
  obtenerDatosCertificacionSat(queryParams: Params): Observable<JSONResponse> {
    const PARAMS_OBJ: { [param: string]: string | number | boolean } = { ...queryParams };
    return this.http.get<JSONResponse>(PROC_80302.CERTIFICACION_SAT, { params: PARAMS_OBJ }).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.CERTIFICACION_SAT}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la lista de domicilios (plantas) desde el servidor.
   * @param body Cuerpo de la solicitud con los parámetros necesarios.
   * @returns Observable con la respuesta JSON.
   */
  obtenerListaDomicilios(body: Programa): Observable<JSONResponse> {
    return this.http.post(PROC_80302.BUSCAR_PLANTAS, body).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la lista de plantas en ${PROC_80302.BUSCAR_PLANTAS}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Actualiza la lista de domicilios (plantas) en el servidor.
   * @param body Cuerpo de la solicitud con los datos de las plantas a actualizar.
   * @returns Observable con la respuesta JSON.
   */
  actualizarDomicilios(body: PlantasResponse): Observable<JSONResponse> {
    return this.http.post(PROC_80302.UPDATE_PLANTAS, body).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al actualizar la lista de plantas en ${PROC_80302.UPDATE_PLANTAS}`);
        return throwError(() => ERROR);
      })
    );

  }

  /**
   * Guarda la solicitud en el servidor.
   * @param body Cuerpo de la solicitud con los datos a guardar.
   * @returns Observable con la respuesta JSON.
   */
  guardar(body: GuardarSolicitudPayload): Observable<JSONResponse> {
    return this.http.post(PROC_80302.GUARDAR, body).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al guardar la solicitud en ${PROC_80302.GUARDAR}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la solicitud por ID desde el servidor.
   * @param body Cuerpo de la solicitud con el ID de la solicitud a obtener.
   * @returns Observable con la respuesta JSON.
   */
  obtenerSolicitudId(body: SolicitudPayload): Observable<JSONResponse> {
    return this.http.post(PROC_80302.OBTENER_SOLICITUD, body).pipe(
      map((response) => response as JSONResponse),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la solicitud en ${PROC_80302.OBTENER_SOLICITUD}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene todo el estado de la solicitud 80302 desde el store.
   * @returns Observable con el estado completo de la solicitud 80302.
   */
  getAllState(): Observable<Solicitud80302State> {
    return this.Tramite80302Query.selectSolicitud$;
  }

}

  

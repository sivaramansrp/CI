import {
  Anexo,
  DatosModificacionRespuesta,
  ExportacionImportacionPayload,
  Federetarios,
  Operacions,
  ProgramaLista,
} from '../models/plantas-consulta.model';
import {
  Complimentaria,
  ServiciosImmex,
} from '../../../shared/models/complementaria.model';
import {
  HttpCoreService,
  JSONResponse,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import {
  ImportacionExportacionFracciones,
  JSONRespuesta,
} from '../models/datos-tramite.model';
import { Observable, map } from 'rxjs';
import {
  Solicitud80301State,
  Solicitud80301StateObj,
  Tramite80301Store,
} from '../estados/tramite80301.store';
import { Bitacora } from '../../../shared/models/bitacora.model';
import { DatosModificacion } from '../../../shared/models/modificacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PROC_80301 } from '../servers/api-route';
import { Tramite80301Query } from '../estados/tramite80301.query';

/**
 * Servicio que gestiona la obtención y actualización de datos relacionados con
 * el trámite IMMEX 80301, incluyendo modificación de domicilio, anexos, operaciones,
 * fedatarios, bitácora, etc.
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Servicio que maneja la obtención y actualización de datos relacionados con el trámite IMMEX 80301.
 * Proporciona métodos para interactuar con los endpoints de la API y gestionar el estado del trámite.
 * @class SolicitudService
 */
export class SolicitudService {
  /**
   * Constructor del servicio SolicitudService.
   * @param http Cliente HTTP para realizar solicitudes a la API.
   * @param store Store para gestionar el estado del trámite 80301.
   * @param httpService Servicio HTTP core para realizar solicitudes genéricas.
   * @param tramite80301Query Query para obtener datos del estado del trámite 80301.
   */
  constructor(
    private http: HttpClient,
    private store: Tramite80301Store,
    private httpService: HttpCoreService,
    private tramite80301Query: Tramite80301Query
  ) {}

  /**
   * Obtiene los datos del solicitante desde un archivo JSON local.
   *
   * @returns {Observable<RespuestaCatalogos[]>} Observable con la lista de datos del solicitante.
   */
  getDatosDelSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http
      .get<{ data: RespuestaCatalogos[] }>(
        'assets/json/80301/datosSolicitante.json'
      )
      .pipe(map((response) => response.data));
  }

  /**
   * Obtiene los datos de modificación desde un archivo JSON local.
   *
   * @returns {Observable<JSONRespuesta<DatosModificacion>>} Observable con los datos de modificación.
   */
  getDatosModificacion(): Observable<JSONRespuesta<DatosModificacion>> {
    return this.httpService
      .get<JSONRespuesta<DatosModificacionRespuesta>>(
        PROC_80301.DATOS_MODIFICACION
      )
      .pipe(
        map((response) => ({
          ...response,
          datos: {
            rfc: response.datos?.rfc_original ?? '',
            representacionFederal: '',
            tipo: response.datos?.identificacion?.tipo_sociedad ?? '',
            programa: response.datos?.identificacion?.email ?? '',
          },
        }))
      );
  }

  /**
   * Obtiene los datos de exportación para la tabla dinámica.
   *
   * @returns {Observable<JSONRespuesta<ImportacionExportacionFracciones[]>>} Observable con los datos de exportación.
   */
  getDatosExportacionTableData(
    payload: ExportacionImportacionPayload
  ): Observable<JSONRespuesta<ImportacionExportacionFracciones[]>> {
    return this.httpService.post<
      JSONRespuesta<ImportacionExportacionFracciones[]>
    >(PROC_80301.FRACCIONES_EXPORTACION, {
      body: payload,
    });
  }

  /**
   * Obtiene los datos de importación para la tabla dinámica.
   *
   * @returns {Observable<JSONRespuesta<ImportacionExportacionFracciones[]>>} Observable con los datos de importación.
   */
  getImportacionTablaDatos(
    payload: ExportacionImportacionPayload
  ): Observable<JSONRespuesta<ImportacionExportacionFracciones[]>> {
    return this.httpService.post<
      JSONRespuesta<ImportacionExportacionFracciones[]>
    >(PROC_80301.FRACCIONES_IMPORTACION, {
      body: payload,
    });
  }

  /**
   * Busca el ID de la solicitud basado en el payload proporcionado.
   *
   * @param payload Datos necesarios para buscar el ID de la solicitud.
   * @returns {Observable<JSONRespuesta<{ buscaIdSolicitud: string }>>} Observable con el ID de la solicitud.
   */
  buscarIdSolicitud(payload: {
    idPrograma: string;
    tipoPrograma: string;
  }): Observable<JSONRespuesta<{ buscaIdSolicitud: string }>> {
    return this.httpService.post<JSONRespuesta<{ buscaIdSolicitud: string }>>(
      PROC_80301.BUSCAR_ID_SOLICITUD,
      {
        body: payload,
      }
    );
  }

  /**
   * Obtiene los datos de certificación SAT para un RFC dado.
   *
   * @param rfc El RFC para el cual se obtendrán los datos de certificación SAT.
   * @returns {Observable<JSONRespuesta<{ certificacionSAT: string }>>} Observable con los datos de certificación SAT.
   */
  obtenerDatosCertificacionSAT(
    rfc: string
  ): Observable<JSONRespuesta<{ certificacionSAT: string }>> {
    return this.httpService.get<JSONRespuesta<{ certificacionSAT: string }>>(
      PROC_80301.CERTIFICACION_SAT + rfc
    );
  }

  /**
   * Obtiene una lista de accionistas o representantes complementarios.
   *
   * @returns {Observable<Complimentaria[]>} Observable con la lista de objetos `Complimentaria`.
   */
  obtenerComplimentaria(
    idSolicitud: string[]
  ): Observable<JSONRespuesta<Complimentaria[]>> {
    return this.httpService.post<JSONRespuesta<Complimentaria[]>>(
      PROC_80301.COMPLIMENTARIA,
      {
        body: { idSolicitud },
      }
    );
  }

  /**
   * Obtiene la lista de fedatarios públicos que participan en el trámite.
   *
   * @returns {Observable<Federetarios[]>} Observable con los objetos `Federetarios`.
   */
  obtenerFederetarios(
    idSolicitud: string[]
  ): Observable<JSONRespuesta<Federetarios[]>> {
    return this.httpService.post<JSONRespuesta<Federetarios[]>>(
      PROC_80301.FEDERETARIOS,
      {
        body: { idSolicitud },
      }
    );
  }

  /**
   * Obtiene las operaciones registradas en el contexto del trámite.
   *
   * @returns {Observable<Operacions[]>} Observable con los objetos `Operacions`.
   */
  obtenerOperacion(
    idSolicitud: string[]
  ): Observable<JSONRespuesta<Operacions[]>> {
    return this.httpService.post<JSONRespuesta<Operacions[]>>(
      PROC_80301.PLANTAS,
      {
        body: { idSolicitud },
      }
    );
  }

  /**
   * Obtiene los servicios IMMEX asociados al trámite.
   *
   * @returns {Observable<ServiciosImmex[]>} Observable con los objetos `ServiciosImmex`.
   */
  obtenerServiciosImmex(
    idSolicitud: string[]
  ): Observable<JSONRespuesta<ServiciosImmex[]>> {
    return this.httpService.post<JSONRespuesta<ServiciosImmex[]>>(
      PROC_80301.SERVICIOS_IMMEX,
      {
        body: { idSolicitud },
      }
    );
  }

  /**
   * Obtiene las fracciones arancelarias de exportación asociadas a la solicitud.
   *
   * @param idSolicitud Arreglo de IDs de solicitud para las cuales se obtendrán las fracciones.
   * @returns {Observable<JSONRespuesta<Anexo[]>>} Observable con las fracciones de exportación.
   */
  obtenerFraccionesExportacion(
    idSolicitud: string[]
  ): Observable<JSONRespuesta<Anexo[]>> {
    const PARAM = idSolicitud.join(',');
    return this.httpService.get<JSONRespuesta<Anexo[]>>(
      PROC_80301.ANEXO_FRACCIONES_EXPORTACION + PARAM
    );
  }

  /**
   * Obtiene las fracciones arancelarias de importación asociadas a la solicitud.
   *
   * @param idSolicitud Arreglo de IDs de solicitud para las cuales se obtendrán las fracciones.
   * @returns {Observable<JSONRespuesta<Anexo[]>>} Observable con las fracciones de importación.
   */
  obtenerFraccionesImportacion(
    idSolicitud: string[]
  ): Observable<JSONRespuesta<Anexo[]>> {
    const PARAM = idSolicitud.join(',');
    return this.httpService.get<JSONRespuesta<Anexo[]>>(
      PROC_80301.ANEXO_FRACCIONES_IMPORTACION + PARAM
    );
  }

  /**
   * Obtiene los registros históricos de modificaciones en una bitácora.
   *
   * @returns {Observable<JSONRespuesta<Bitacora[]>>} Observable con los registros de la bitácora.
   */
  obtenerBitacora(idPrograma: string): Observable<JSONRespuesta<Bitacora[]>> {
    return this.httpService.get<JSONRespuesta<Bitacora[]>>(
      PROC_80301.BITACORA + idPrograma
    );
  }

  /**
   * Obtiene la lista de programas asociados a un RFC y tipo de programa específico.
   *
   * @param rfc El RFC para el cual se obtendrán los programas.
   * @param tipoPrograma El tipo de programa para filtrar la lista.
   * @returns {Observable<JSONRespuesta<ProgramaLista[]>>} Observable con la lista de programas.
   */
  obtenerListaProgramas(
    rfc: string,
    tipoPrograma: string
  ): Observable<JSONRespuesta<ProgramaLista[]>> {
    return this.httpService.get<JSONRespuesta<ProgramaLista[]>>(
      PROC_80301.LISTA_PROGRAMAS + `${rfc}&tipoPrograma=${tipoPrograma}`
    );
  }

  /**
   * Actualiza el estado del formulario 80301 en el store, usando los datos de modificación actuales.
   *
   * @param DATOS - Objeto con los valores actualizados del formulario de modificación.
   */
  actualizarEstadoFormulario(DATOS: Solicitud80301State): void {
    this.store.setDatosModificacion(
      DATOS.datosModificacion || {
        rfc: '',
        representacionFederal: '',
        tipo: '',
        programa: '',
      }
    );
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<Solicitud80301State>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Solicitud80301State> {
    return this.tramite80301Query.selectSolicitud$;
  }

  /**
   * Guarda los datos del formulario de modificación en el servidor.
   * @param body Objeto que contiene los datos a guardar.
   * @returns {Observable<JSONResponse>} Observable con la respuesta del guardado.
   */
  postGuardarDatos(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_80301.GUARDAR, {
      body: body,
    });
  }

  /**
   * Carga el estado completo del trámite desde un archivo local en formato JSON.
   *
   * @returns {Observable<Solicitud80301Statej>} Observable con el objeto de estado completo.
   */
  obtenerTramiteDatos(): Observable<Solicitud80301StateObj> {
    return this.http.get<Solicitud80301StateObj>(
      'assets/json/80301/tramite_datos.json'
    );
  }
}
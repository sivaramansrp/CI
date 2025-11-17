import { DatosModificacion } from '../../../shared/models/modificacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModificacionDatos } from '../models/modificacion-programa-immex-baja-submanufacturera.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Tramite80303Store } from '../estados/tramite80303Store.store';

import { Tramite80303Query } from '../estados/tramite80303Query.query';
import { Tramite80303State } from '../estados/tramite80303Store.store';

import { JSONRespuesta, ServiciosImmex } from '../models/complementaria.model';

import { ProgramaLista } from '../models/modificacion-programa-immex-baja-submanufacturera.model'; 

import { ExportacionImportacionPayload, ImportacionExportacionFracciones } from '../models/modificacion-programa-immex-baja-submanufacturera.model'; 

import { JSONResponse} from '@libs/shared/data-access-user/src';
import { PROC_80303 } from '../servers/api-route';

import{DatosModificacionRespuesta} from '../models/modificacion-programa-immex-baja-submanufacturera.model';
/**
 * Decorador que marca una clase como un servicio que puede ser inyectado en otros componentes o servicios.
 * 
 * Este servicio está registrado en el nivel raíz de la aplicación, lo que significa que su instancia será única
 * y compartida en toda la aplicación. Esto permite que los datos y métodos del servicio sean accesibles desde
 * cualquier parte de la aplicación sin necesidad de crear múltiples instancias.
 * 
 * @remarks
 * Utilizar el decorador `@Injectable` con el proveedor `providedIn: 'root'` asegura que el servicio sea singleton
 * y esté disponible globalmente en la aplicación Angular.
 */
@Injectable({
  providedIn: 'root',
})
export class ModificacionProgramaImmexBajaSubmanufactureraService {
 
  /**
   * Constructor de la clase ModificacionProgramaImmexBajaSubmanufactureraService.
   *
   * @param httpServicios - Servicio HttpClient para realizar solicitudes HTTP.
   * @param tramite80303Store - Almacén de estado para gestionar los datos relacionados con el trámite 80303.
   */
  constructor(
    public httpServicios: HttpClient,
    public tramite80303Store: Tramite80303Store,
    private tramite80303Query: Tramite80303Query
  ) {}

  /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   *
   * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
   * @param {string} url - La URL desde la cual se obtendrá la respuesta.
   * @returns {void}
   * @author Muneez
   * @remarks
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
   */
  obtenerRespuestaPorUrl(variable: string, url: string): void {
    if (self && variable && url) {
      this.httpServicios
        .get<RespuestaCatalogos>(`assets/json${url}`)
        .subscribe((resp): void => {
          const VALOR = resp?.code === 200 && resp.data ? resp.data : [];
          this.tramite80303Store.update((state) => ({
            ...state,
            [variable]: VALOR,
          }));
        });
    }
  }
  /**
   * Obtiene los datos de modificación del programa IMMEX baja submanufacturera.
   * Realiza una solicitud HTTP GET a un archivo JSON y actualiza el estado del trámite con los datos obtenidos.
   *
   * @returns {void}
   */
  obtenerModicicacionDatos(): void {
    this.httpServicios
      .get<ModificacionDatos>(
        'assets/json/80303/modificacionProgramaImmexBajaSubmanufacturera.json'
      )
      .subscribe((resp): void => {
        this.tramite80303Store.update((state) => ({
          ...state,
          modificacionDatos: resp,
        }));
      });
  }
  
  /**
   * Consulta las mercancías de importación para una solicitud específica.
   * @param idSolicitud - Identificador de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
  consultarMercanciasImportacion(idSolicitud: string): Observable<any> {
    const URL = PROC_80303.CONSULTA_MERCANCIAS_IMPORTACION(idSolicitud);
    return this.httpServicios.get<any>(URL);
     }

     
  /**
   * Consulta los productos de exportación para una solicitud específica.
   * @param idSolicitud - Identificador de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
  consultarProductosExportacion(idSolicitud: string): Observable<any> {
    const URL = PROC_80303.CONSULTA_PRODUCTOS_EXPORTACION(idSolicitud);
    return this.httpServicios.get<any>(URL);
  }
  
  /**
   * Consulta las fracciones sensibles para una solicitud específica.
   * @param idSolicitud - Identificador de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
  consultarFraccionesSensibles(idSolicitud: string): Observable<any> {
    const URL = PROC_80303.CONSULTA_FRACCIONES_SENSIBLES(idSolicitud);
    return this.httpServicios.get<any>(URL);
  }
  /**   * Consulta la bitácora IMMEX para un programa específico.
   * @param idPrograma - Identificador del programa.
   * @returns Observable con la respuesta de la consulta.
   */
  consultarBitacoraImmex(idPrograma: string): Observable<any> {
  const URL = PROC_80303.CONSULTAR_BITACORA_IMMEX(idPrograma);
  return this.httpServicios.get<any>(URL);
}
  /**   * Consulta las plantas submanufactureras para una solicitud específica.
   * @param idSolicitud - Identificador de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
  consultarPlantasSubmanufactureras(idSolicitud: string): Observable<any> {
    const URL = PROC_80303.CONSULTAR_PLANTAS_SUBMANUFACTURERAS(idSolicitud);
    return this.httpServicios.get<any>(URL);
  }
  /**
   * Busca una empresa submanufacturera para una solicitud específica.
   * @param idSolicitud - Identificador de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
   buscarEmpresaSubmanufacturera(idSolicitud: string): Observable<any> {
    const URL = PROC_80303.BUSCAR_EMPRESA_SUBMANUFACTURERA(idSolicitud);
    return this.httpServicios.get<any>(URL);
  }
  /**   * Consulta los servicios IMMEX.
   * @param body - Cuerpo de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
  consultarServiciosImmex(body: unknown): Observable<JSONRespuesta<ServiciosImmex[]>> {
  const URL = PROC_80303.CONSULTAR_SERVICIOS;
  return this.httpServicios.post<JSONRespuesta<ServiciosImmex[]>>(URL, body);
}
  /**   * Busca un socio accionista.
   * @param body - Cuerpo de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
   buscarSocioAccionista(body: any): Observable<any> {
  const URL = PROC_80303.BUSCAR_SOCIO_ACCIONISTA;
  return this.httpServicios.post<any>(URL, body);
}

  /**   * Busca notarios para consulta.
   * @param body - Cuerpo de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
 buscarNotariosConsulta(body: any): Observable<any> {
    const URL = PROC_80303.BUSCAR_NOTARIOS_CONSULTA;
    return this.httpServicios.post<any>(URL, body);
  }
  /**   * Consulta las plantas.
   * @param body - Cuerpo de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
  consultarPlantas(body: unknown): Observable<any> {
    const URL = PROC_80303.CONSULTA_PLANTAS;
    return this.httpServicios.post<any>(URL, body);
  }
  /**   * Busca empresas.
   * @param body - Cuerpo de la solicitud.
   * @returns Observable con la respuesta de la consulta.
   */
buscarEmpresas(body: any): Observable<any> {
  const URL = PROC_80303.BUSCAR_EMPRESAS;
  return this.httpServicios.post<any>(URL, body);
}

  /**   * Busca datos de certificación SAT.
   * @param rfc - RFC para la consulta.
   * @returns Observable con la respuesta de la consulta.
   */
buscarDatosCertificacionSAT(rfc: string): Observable<any> {
    const URL = `${PROC_80303.BUSCAR_DATOS_CERTIFICACION_SAT}?rfc=${rfc}`;
    return this.httpServicios.get<any>(URL);
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

    return this.httpServicios.get<JSONRespuesta<ProgramaLista[]>>(
      PROC_80303.LISTA_PROGRAMAS + `${rfc}&tipoPrograma=${tipoPrograma}`
    );
    
  }
  
  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<Solicitud80301State>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite80303State> {
    return this.tramite80303Query.selectSolicitud$;
  }
  /**
   * Guarda los datos del formulario de modificación en el servidor.
   * @param body Objeto que contiene los datos a guardar.
   * @returns {Observable<JSONResponse>} Observable con la respuesta del guardado.
   */
  postGuardarDatos(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpServicios.post<JSONResponse>(PROC_80303.GUARDAR, {
      body: body,
    });
  }
  /**
   * Obtiene los datos de exportación para la tabla dinámica.
   *
   * @returns {Observable<JSONRespuesta<ImportacionExportacionFracciones[]>>} Observable con los datos de exportación.
   */
  getDatosExportacionTableData(
    payload: ExportacionImportacionPayload
  ): Observable<JSONRespuesta<ImportacionExportacionFracciones[]>> {
    return this.httpServicios.post<
      JSONRespuesta<ImportacionExportacionFracciones[]>
    >(PROC_80303.FRACCIONES_EXPORTACION, {
      body: payload,
    });
  }
   /**
   * Obtiene los datos de modificación desde un archivo JSON local.
   *
   * @returns {Observable<JSONRespuesta<DatosModificacion>>} Observable con los datos de modificación.
   */
  getDatosModificacion(): Observable<JSONRespuesta<DatosModificacion>> {
    return this.httpServicios
      .get<JSONRespuesta<DatosModificacionRespuesta>>(
        PROC_80303.DATOS_MODIFICACION
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo, ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { map, Observable } from 'rxjs';
import {
  FraccionArancelariaDecripcionModel
} from '../../../../220201/models/220201/capturar-solicitud.model';
import { API_GET_CATALOGO_FRACCION_ARANCELARIA, API_GET_SOLICITUDES_FRACCION_ARANCELARIA_DESCRIPCION, API_GET_SOLICITUDES_NICO_DESCRIPCION, API_GET_SOLICITUDES_UNIDAD_MEDIDA, API_GET_SOLICITUDES_RECENTES } from 'apps/agricultura/src/app/application/core/server/api-router';
import { SolicitudData } from '../../../models/220203/importacion-de-acuicultura.module';

@Injectable({
  providedIn: 'root'
})
export class RegistroSolicitudService {
  /**
     * URL base del servidor al que se realizarán las solicitudes relacionadas con aduanas.
     * Esta variable almacena la dirección del host para los servicios compartidos de catálogos.
     * Es de solo lectura y se inicializa en el constructor del servicio.
     */
    host: string;

  constructor(private http: HttpClient) { 
            this.host = `${ENVIRONMENT.API_HOST}/api/`;
    
  }

  /**
     * Obtiene la descripción de la fracción arancelaria para un trámite y clave de fracción dados.
     *
     * @param tramite - El identificador numérico del trámite.
     * @param cveFraccion - La clave de la fracción arancelaria.
     * @returns Un observable con la respuesta base que contiene un arreglo de catálogos.
     */
    obtieneFraccionArancelariaDescripcion(tramite: number, cveFraccion: string): Observable<BaseResponse<FraccionArancelariaDecripcionModel>> {
        const ENDPOINT = `${this.host}${API_GET_SOLICITUDES_FRACCION_ARANCELARIA_DESCRIPCION(tramite.toString(), cveFraccion)}`;
        return this.http.get<BaseResponse<FraccionArancelariaDecripcionModel>>(ENDPOINT);
    }

      /**
     * Obtiene la descripción del NICO (Número de Identificación Comercial) para un trámite y clave de fracción dados.
     *
     * @param tramite - El identificador numérico del trámite.
     * @param cveFraccion - La clave de la fracción arancelaria.
     * @returns Un observable con la respuesta base que contiene la descripción del NICO.
     */
  obtieneNicoDescripcion(tramite: number, cveFraccion: string, cveNico: string): Observable<BaseResponse<Catalogo>> {
    const ENDPOINT = `${this.host}${API_GET_SOLICITUDES_NICO_DESCRIPCION(tramite.toString(), cveFraccion, cveNico)}`;
    return this.http.get<BaseResponse<Catalogo>>(ENDPOINT);
  }

    /**
    * Obtiene la unidad de medida asociada a un trámite y fracción específica.
    *
    * @param tramite - El identificador numérico del trámite.
    * @param cveFraccion - La clave de la fracción para la cual se solicita la unidad de medida.
    * @returns Un observable que emite la respuesta base con el catálogo de unidades de medida.
    */
  obtieneUnidadMedida(tramite: number, cveFraccion: string): Observable<BaseResponse<Catalogo>> {
    const ENDPOINT = `${this.host}${API_GET_SOLICITUDES_UNIDAD_MEDIDA(tramite.toString(), cveFraccion)}`;
    return this.http.get<BaseResponse<Catalogo>>(ENDPOINT);
  }

  /**
   * Obtiene los datos de la solicitud para un tramite especifico
   *
   * @param tramite - El identificador numérico del trámite.
   * @param rfc - RFC de asociado de la solicitud.
   * @returns Un observable que emite la respuesta solicitudes recientes.
   */
  obtieneDatosSolicitud(tramite: number, rfc: string): Observable<BaseResponse<SolicitudData[]>> {
    const ENDPOINT = `${this.host}${API_GET_SOLICITUDES_RECENTES(tramite.toString(), rfc)}`;
    return this.http.get<BaseResponse<SolicitudData[]>>(ENDPOINT).pipe(
      map(response=> {
        if (response.datos){
          response.datos = response.datos.map((item :SolicitudData)=>({
            ...item,
            fecha_creacion:item.fecha_creacion ? formatFechaCreacion(item.fecha_creacion):item.fecha_creacion
          }));
        }
        return response;
    }))
  }
  }
/**

 Formatea una fecha en formato ISO a 'DD/MM/YYYY HH:mm:ss'.
 @param fecha_creacion Fecha en formato ISO (string)
 @returns Fecha formateada como string*/
function formatFechaCreacion(fecha_creacion: string): string {
  const DATE = new Date(fecha_creacion);
  if (isNaN(DATE.getTime())) {
    return fecha_creacion;
  }
  const PAD = (n: number): string => n.toString().padStart(2, '0');
  let fecha = `${PAD(DATE.getDate())}/${PAD(DATE.getMonth() + 1)}/${DATE.getFullYear()} ${PAD(DATE.getHours())}:${PAD(DATE.getMinutes())}:${PAD(DATE.getSeconds())}`;
  return fecha;
}
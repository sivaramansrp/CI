import {
  MercanciasTabla,
  RespuestaTabla,
} from '../../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROC_260512 } from '../servers/api-route';
import { Tramite260512Query } from '../../../estados/queries/260512/tramite260512.query';


@Injectable({
  providedIn: 'root',
})
export class DatosDomicilioService {
  /**
   * Servicio para obtener datos de terceros relacionados y permisos.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor( public http: HttpClient,
    private query: Tramite260512Query,
    public httpService: HttpCoreService,) {
    // Constructor del servicio
  }
  /**
       * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
       *
       * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
       * @returns Observable con la respuesta de la solicitud POST.
       */
      guardarDatosPost(body: Record<string, unknown>): Observable<Record<string, unknown>> {
        return this.httpService.post<Record<string, unknown>>(PROC_260512.GUARDAR, { body: body });
      }
  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaTabla.
   */
  getObtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/cofepris/clave-scian.json');
  }

  /**
   * Obtiene los datos de mercancías desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto MercanciasTabla.
   */
  getObtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>(
      'assets/json/cofepris/mercancias-tabla.json'
    );
  }
}

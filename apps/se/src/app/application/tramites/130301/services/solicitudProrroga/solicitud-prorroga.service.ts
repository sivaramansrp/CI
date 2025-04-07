import { RequestCertificadoKimberleyForma, RequestDatosDelTramite, RequestPartidasForma, RequestProrrogasForma, RespuestaDatos, RespuestaTabla } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

/**
 * Servicio para gestionar las solicitudes relacionadas con el trámite de prórrogas.
 */
@Injectable({
  providedIn: 'root'
})
export class SolicitudProrrogaService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos del formulario de la solicitud.
   * @returns Un observable con los datos del formulario.
   */
  obtenerFormDatos(): Observable<RespuestaDatos> {
    return this.http.get<RespuestaDatos>('assets/json/130301/solicitud-forma.json');
  }

  /**
   * Obtiene los datos del formulario de "Datos del Trámite".
   * @returns Un observable con los datos del formulario.
   */
  obtenerDelTramiteFormDatos(): Observable<RequestDatosDelTramite> {
    return this.http.get<RequestDatosDelTramite>('assets/json/130301/datos-del-tramite.json');
  }

  /**
   * Obtiene los datos de la tabla de partidas.
   * @returns Un observable con los datos de la tabla.
   */
  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/130301/partidas-tabla.json');
  }

  /**
   * Obtiene los datos del formulario de partidas.
   * @returns Un observable con los datos del formulario.
   */
  obtenerPartidasFormDatos(): Observable<RequestPartidasForma> {
    return this.http.get<RequestPartidasForma>('assets/json/130301/partidas-forma.json');
  }

  /**
   * Obtiene los datos del formulario del Certificado Kimberley.
   * @returns Un observable con los datos del formulario.
   */
  obtenerCertificadoKimberleyFormDatos(): Observable<RequestCertificadoKimberleyForma> {
    return this.http.get<RequestCertificadoKimberleyForma>('assets/json/130301/certificadoKimberley-forma.json');
  }

  /**
   * Obtiene la lista de estados desde un recurso externo.
   * @returns Un observable con la lista de estados.
   */
  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130301/seleccion.json');
  }

  /**
   * Obtiene los datos del formulario de prórrogas.
   * @returns Un observable con los datos del formulario.
   */
  obtenerProrrogasFormDatos(): Observable<RequestProrrogasForma> {
    return this.http.get<RequestProrrogasForma>('assets/json/130301/prorrogas-forma.json');
  }
}
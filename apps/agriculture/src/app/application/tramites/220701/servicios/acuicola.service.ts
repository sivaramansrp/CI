/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatosDelTramite } from '../modelos/acuicola.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoDeDerechos } from '../modelos/acuicola.model';
import { PagoDeDerechosRevision } from '../modelos/acuicola.model';
import { ResponsableInspección } from '../modelos/acuicola.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para gestionar las operaciones relacionadas con acuicultura.
 * Proporciona métodos para obtener datos de certificados, inspecciones, medios de transporte, entre otros.
 */
export class AcuicolaService {
  /**
   * URL base para acceder a los archivos JSON de datos.
   * @type {string}
   */
  private apiUrl = 'assets/json/220701/';

  /**
   * Constructor del servicio.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Obtiene los datos de certificados.
   * @returns {Observable<DatosDelTramite>} Observable con los datos de certificados.
   */
  obtenerDatosCertificados(): Observable<DatosDelTramite> {
    return this.http.get<DatosDelTramite>(`${this.apiUrl}datos-certificados.json`).pipe(
      map((res: any) => res.data)
    );
  }

  /**
   * Obtiene la lista de horas de inspección.
   * @returns {Observable<RespuestaCatalogos>} Observable con las horas de inspección.
   */
  getHoraDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}hora-de-inspeccion.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Obtiene la lista de aduanas de ingreso.
   * @returns {Observable<RespuestaCatalogos>} Observable con las aduanas de ingreso.
   */
  getAduanaDeIngreso(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}aduana-de-ingreso.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Obtiene la lista de oficinas de inspección.
   * @returns {Observable<RespuestaCatalogos>} Observable con las oficinas de inspección.
   */
  getOficinaDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}oficina-de-inspeccion.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Obtiene la lista de puntos de inspección.
   * @returns {Observable<RespuestaCatalogos>} Observable con los puntos de inspección.
   */
  getPuntoDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}punto-de-inspeccion.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Obtiene los datos del responsable de la inspección.
   * @returns {Observable<ResponsableInspección>} Observable con los datos del responsable.
   */
  obtenerResponsableDatos(): Observable<ResponsableInspección> {
    return this.http.get<ResponsableInspección>(`${this.apiUrl}responsable-inspeccion.json`).pipe(
      map((res: any) => res.data)
    );
  }

  /**
   * Obtiene la lista de tipos de contenedor.
   * @returns {Observable<RespuestaCatalogos>} Observable con los tipos de contenedor.
   */
  getTipoContenedor(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}tipo-contenedor.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Obtiene la lista de medios de transporte.
   * @returns {Observable<RespuestaCatalogos>} Observable con los medios de transporte.
   */
  getMedioDeTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}medio-de-transporte.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Obtiene la lista de bancos disponibles.
   * @returns {Observable<RespuestaCatalogos>} Observable con los datos de bancos.
   */
  getBancoDatos(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}banco-datos.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Obtiene los datos del pago de derechos.
   * @returns {Observable<PagoDeDerechos>} Observable con los datos del pago de derechos.
   */
  pagoDeCargarDatos(): Observable<PagoDeDerechos> {
    return this.http.get<PagoDeDerechos>(`${this.apiUrl}pago-de-derechos.json`).pipe(
      map((res: any) => res.data)
    );
  }

  /**
   * Obtiene los datos de revisión del pago de derechos.
   * @returns {Observable<PagoDeDerechosRevision>} Observable con los datos de revisión del pago de derechos.
   */
  getPagoDerechosRevision(): Observable<PagoDeDerechosRevision> {
    return this.http.get<PagoDeDerechosRevision>(`${this.apiUrl}pago-de-derechos-revision.json`).pipe(
      map((res: any) => res.data)
    );
  }
}

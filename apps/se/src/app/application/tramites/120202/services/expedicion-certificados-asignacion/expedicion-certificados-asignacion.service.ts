import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NumeroOficioAsignacionDetalleRespquesta } from '../../models/expedicion-certificados-asignacion.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

/**
 * Servicio para la gestión de la asignación de expedición de certificados.
 * @description Este servicio se encarga de realizar las peticiones HTTP necesarias para obtener los catálogos y datos relacionados con la asignación de expedición de certificados.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para la gestión de la asignación de expedición de certificados.
 * @description Este servicio se encarga de realizar las peticiones HTTP necesarias para obtener los catálogos y datos relacionados con la asignación de expedición de certificados.
 */
export class ExpedicionCertificadosAsignacionService {
/**
   * Constructor del servicio de catálogos.
   * @param http - Inyección del servicio HttpClient para realizar peticiones HTTP.
   * @description Este servicio se encarga de obtener los catálogos necesarios para el funcionamiento de la aplicación.
   */
  constructor(
    private http: HttpClient
  ) { 
    // Constructor vacío

  }

  /**
   * Obtiene el catálogo de años de autorización.
   * @returns Un observable que emite la respuesta del catálogo de años de autorización.
   * @description Este método realiza una petición HTTP GET para obtener el catálogo de años de autorización desde un archivo JSON local.
   */
  getAniosAutorizacionCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120202/anios-autorizacion-catalogo.json');
  }

  /**
   * Obtiene el número de oficio de asignación detalle.
   * @returns Un observable que emite la respuesta del número de oficio de asignación detalle.
   * @description Este método realiza una petición HTTP GET para obtener el número de oficio de asignación detalle desde un archivo JSON local.
   */
  getNumeroOficioAsignacionDetalle(): Observable<NumeroOficioAsignacionDetalleRespquesta> {
    return this.http.get<NumeroOficioAsignacionDetalleRespquesta>('assets/json/120202/numero-oficio-asignacion-detalle.json');
  }
}

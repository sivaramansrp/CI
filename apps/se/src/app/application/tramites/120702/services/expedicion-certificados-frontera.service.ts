import {Solicitud120702State, Tramite120702Store} from '../estados/tramite120702.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontoExpedirTablaDatos } from '../models/expedicion-certificados-frontera.models';
import { Observable } from 'rxjs';
import {Tramite120702Query} from '../estados/tramite120702.query';
/**
 * Servicio encargado de obtener los datos relacionados con la expedición de certificados en frontera,
 * como el año del oficio y la tabla de montos a expedir.
 */
@Injectable({
  providedIn: 'root'
})
export class ExpedicionCertificadosFronteraService {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /** 
   * URL base para obtener catálogos JSON auxiliares.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP de Angular para realizar peticiones a archivos JSON locales.
   */
  constructor(private http: HttpClient,
    private tramite120702Store : Tramite120702Store,
    private tramite120702Query: Tramite120702Query
  ) { }

  /**
   * Obtiene el catálogo de años del oficio desde un archivo local JSON.
   *
   * @returns Un Observable con una lista de objetos de tipo `Catalogo`.
   */
  getAnoOficioDatos(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120702/ano-oficio.json');
  }

  /**
   * Obtiene los datos de la tabla de montos a expedir desde un archivo local JSON.
   *
   * @returns Un Observable con los datos de tipo `MontoExpedirTablaDatos`.
   */
  getMontoExpedirTabla(): Observable<MontoExpedirTablaDatos> {
    return this.http.get<MontoExpedirTablaDatos>('assets/json/120702/monto-expedir.json');
  }

    /**
 * Actualiza el estado del formulario con los datos proporcionados.
 *
 * @param DATOS - Objeto que contiene el nuevo estado del trámite (Solicitud40302State).
 */
actualizarEstadoFormulario(DATOS: Solicitud120702State): void {
  if(DATOS.anoDelOficio){
    this.tramite120702Store.setAnoDelOficio(DATOS.anoDelOficio);
  }
   this.tramite120702Store.setNumeroOficio(DATOS.numeroOficio);
   this.tramite120702Store.setMontoAExpedir(DATOS.montoAExpedir);
   this.tramite120702Store.setFechaInicio(DATOS.fechaInicioVigencia);
   this.tramite120702Store.setFechaFin(DATOS.fechaFinVigencia);
}
  
/**
 * Obtiene los datos de registro del transportista para la solicitud 40302.
 * 
 * @returns Observable con el estado de la solicitud 40302.
 */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud120702State> {
    return this.http.get<Solicitud120702State>('assets/json/120702/expedicion-certificados-consulta.json');
  }
}

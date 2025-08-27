import {Catalogo} from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MercanciasTabla } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaTabla } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';

/**
 * Servicio para la gestión de operaciones relacionadas con el domicilio del establecimiento.
 * Proporciona métodos para recuperar datos de tablas, catálogos de estados y mercancías
 * necesarios para el trámite de modificación del permiso sanitario de importación de insumo.
 */
@Injectable({
  providedIn: 'root',
})
export class DomicilioDelEstablecimientoService {
  /**
   * URL del archivo JSON con los datos de la tabla NICO.
   * @private
   */
  private readonly tablaDatosUrl =
    'assets/json/260911/tablaDatos.json';

  /**
   * URL del archivo JSON con la lista de estados.
   * @private
   */
  private readonly estadoListUrl =
    'assets/json/260911/seleccion.json';

  /**
   * URL del archivo JSON con los datos de mercancías.
   * @private
   */
  private readonly mercanciasDatosUrl =
    'assets/json/260911/mercanciasDatos.json';

  /**
   * Inicializa una nueva instancia del servicio DomicilioDelEstablecimientoService.
   * @param http Cliente HTTP de Angular para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) {
    //constructor
  }

  /**
   * Obtiene los datos de la tabla NICO desde un archivo JSON local.
   * @returns Observable que emite los datos de la tabla NICO.
   */
  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>(this.tablaDatosUrl);
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON local.
   * @returns Observable que emite los datos de los estados.
   */
  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(this.estadoListUrl);
  }

  /**
   * Obtiene los datos de mercancías desde un archivo JSON local.
   * @returns Observable que emite los datos de mercancías.
   */
  obtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>(this.mercanciasDatosUrl);
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON local.
   * @returns Observable que emite los datos de las representaciones federales.
   */
  getRepresentacion(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260911/descriptionClave.json');
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON local.
   * @returns Observable que emite los datos de las entidades federativas.
   */
  getEntidad(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260911/clavescian.json');
  }
}
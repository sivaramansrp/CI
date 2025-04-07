import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import {
  MercanciasTabla,
  RespuestaTabla,
} from '../components/domicilio-establecimiento/domicilio-establecimiento.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoModel } from '../models/datos-domicilio-legal.model';

/**
 * Servicio para obtener datos de terceros relacionados y permisos desde archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
export class TercerosFabricanteService {
  /**
   * Constructor del servicio TercerosFabricanteService.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(public http: HttpClient) {
    // Constructor del servicio
  }

  /**
   * Obtiene los datos de un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaCatalogos.
   */
  getObtenerEstadoList() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/260501/seleccion.json'
    );
  }

  /**
   * Obtiene los datos de un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaCatalogos.
   */
  getObtenerTablaDatos() {
    return this.http.get<RespuestaTabla>('assets/json/260501/tablaDatos.json');
  }

  /**
   * Obtiene los datos de un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaCatalogos.
   */
  getObtenerMercanciasDatos() {
    return this.http.get<MercanciasTabla>(
      'assets/json/260501/mercanciasDatos.json'
    );
  }

  /**
   * Obtiene los datos de terceros relacionados desde un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/260501/terceros-relacionados.json'
    );
  }

  /**
   * Obtiene los datos de un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos PermisoModel.
   */
  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260501/terceros.json');
  }
}

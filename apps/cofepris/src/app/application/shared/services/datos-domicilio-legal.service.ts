import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import {
  MercanciasTabla,
  RespuestaTabla,
} from '../components/domicilio-establecimiento/domicilio-establecimiento.component';
import { DatosDomicilioLegalQuery } from '../estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalState } from '../estados/stores/datos-domicilio-legal.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoModel } from '../models/datos-domicilio-legal.model';

@Injectable({
  providedIn: 'root',
})
export class DatosDomicilioLegalService {
  /**
   * Servicio para obtener datos de terceros relacionados y permisos.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(public http: HttpClient,private query: DatosDomicilioLegalQuery) {
    // Constructor del servicio
  }

  /**
   * Obtiene los datos de selección desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaCatalogos.
   */
  getObtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/260501/seleccion.json'
    );
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaTabla.
   */
  getObtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/260501/tablaDatos.json');
  }

  /**
   * Obtiene los datos de mercancías desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto MercanciasTabla.
   */
  getObtenerMercanciasDatos(): Observable<MercanciasTabla> {
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
   * Obtiene los datos de permisos desde un archivo JSON local.
   * @returns Observable que emite un arreglo de objetos PermisoModel.
   */
  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260501/terceros.json');
  }

   /**
   * Obtiene el estado completo de DatosDomicilioLegal.
   * @returns Observable<DatosDomicilioLegalState>
   */
   getDatosDomicilioLegalState(): Observable<DatosDomicilioLegalState> {
    return this.query.selectSolicitud$;
  }
}

import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { MercanciasTabla, RespuestaTabla } from '../components/domicillo/domicillo.component';
import { DatosDeSolicitud } from '../models/solicitud-datos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

/**
 * @class
 * @name SanitarioService
 * @description
 * Servicio para gestionar funcionalidades relacionadas con el ámbito sanitario.
 * Este servicio incluye métodos para interactuar con archivos JSON que contienen datos
 * relacionados con trámites sanitarios, como derechos, proveedores, localidades, y más.
 */
@Injectable({
  providedIn: 'root',
})
export class SanitarioService {
  /**
   * @constructor
   * @description
   * Constructor del servicio. Inyecta el cliente HTTP para realizar solicitudes a archivos JSON.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // Inicialización adicional si es necesario
  }

  /**
   * @method
   * @name getDatos
   * @description
   * Obtiene datos relacionados con derechos desde un archivo JSON.
   * 
   * @returns {Observable<unknown>} Un observable que emite los datos obtenidos.
   */
  getDatos(): Observable<unknown> {
    return this.http.get('assets/json/260906/derechos.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * @method
   * @name getProveedordata
   * @description
   * Obtiene datos relacionados con proveedores desde un archivo JSON.
   * 
   * @returns {Observable<unknown>} Un observable que emite los datos obtenidos.
   */
  getProveedordata(): Observable<unknown> {
    return this.http.get('assets/json/260906/proveedor.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * @method
   * @name getLocalidaddata
   * @description
   * Obtiene datos relacionados con localidades desde un archivo JSON.
   * 
   * @returns {Observable<unknown>} Un observable que emite los datos obtenidos.
   */
  getLocalidaddata(): Observable<unknown> {
    return this.http.get('assets/json/260906/estadolocalidad.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * @method
   * @name getData
   * @description
   * Obtiene datos relacionados con terceros desde un archivo JSON.
   * 
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de objetos `Catalogo`.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260906/terceros-relacionadoes.json');
  }

  /**
   * @method
   * @name obtenerFormaFarmaceuticaList
   * @description
   * Obtiene una lista de formas farmacéuticas desde un archivo JSON.
   * 
   * @returns {Observable<RespuestaCatalogos>} Un observable que emite una respuesta con los datos de formas farmacéuticas.
   */
  obtenerFormaFarmaceuticaList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/260906/seleccion.json');
  }

  /**
   * @method
   * @name obtenerEstadoList
   * @description
   * Obtiene una lista de estados desde un archivo JSON.
   * 
   * @returns {Observable<RespuestaCatalogos>} Un observable que emite una respuesta con los datos de estados.
   */
  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/260906/seleccion.json');
  }

  /**
   * @method
   * @name obtenerTablaDatos
   * @description
   * Obtiene datos de una tabla desde un archivo JSON.
   * 
   * @returns {Observable<RespuestaTabla>} Un observable que emite una respuesta con los datos de la tabla.
   */
  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/260906/tablaDatos.json');
  }

  /**
   * @method
   * @name obtenerMercanciasDatos
   * @description
   * Obtiene datos relacionados con mercancías desde un archivo JSON.
   * 
   * @returns {Observable<MercanciasTabla>} Un observable que emite una respuesta con los datos de mercancías.
   */
  obtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>('assets/json/260906/mercanciasDatos.json');
  }

  /**
   * @method
   * @name obtenerDatosDeSolicitud
   * @description
   * Obtiene los datos generales de la solicitud desde un archivo JSON.
   * 
   * @returns {Observable<DatosDeSolicitud>} Un observable que emite los datos de la solicitud.
   */
  obtenerDatosDeSolicitud(): Observable<DatosDeSolicitud> {
    return this.http
      .get<DatosDeSolicitud>('assets/json/260906/solicitud-datos.json')
      .pipe();
  }
}
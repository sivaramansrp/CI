import { DatosSociosTable, RepresentacionFederal } from '../modelos/datos-empresa.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  

export class DatosEmpresaService {

  /**
   * URL base para obtener los datos simulados desde archivos JSON.
   * @private
   * @type {string}
   */
  private assetsJsonUrl = '/assets/json/120601/';

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene los datos simulados para la tabla datosSocios.
   * 
   * @returns {Observable<DatosSociosTable[]>} Observable que emite los datos.
   */
  obtenerDatosTablaDeSocios(): Observable<DatosSociosTable[]> {
    return this.http.get<DatosSociosTable[]>(`${this.assetsJsonUrl}datosSocios-table.json`);
  }

  /**
   * Obtiene los datos del estado.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite los datos.
   */
  obtenerEstado(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.assetsJsonUrl}tipoDeEmpresa.json`);
  }

  /**
   * Obtiene datos de Representación Federal
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite los datos.
   */
  obtenerDatosDeRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.assetsJsonUrl}representacionFederal.json`);
  }

  /**
   * Obtener datos para la Tabla de Representación Federal
   * 
   * @returns {Observable<RepresentacionFederal[]>} Observable que emite los datos.
   */
  ObtenerTablaDeRepresentaciónFederal(): Observable<RepresentacionFederal[]> {
    return this.http.get<RepresentacionFederal[]>(`${this.assetsJsonUrl}representacionFederal-table.json`);
  }


}
import { CertificadosTablaDatos } from '../models/flora-fauna.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de obtener los datos de los certificados desde archivos JSON locales.
 * Este servicio realiza peticiones HTTP para cargar los datos necesarios para mostrar en las tablas.
 */
@Injectable({
  providedIn: 'root' // Indica que este servicio está disponible a nivel global en la aplicación.
})
export class CertificadosService {

  /**
   * Constructor del servicio. Recibe una instancia de HttpClient para realizar peticiones HTTP.
   * 
   * @param http Instancia de HttpClient para realizar las peticiones.
   */
  constructor(private http: HttpClient) { 
    //
  }

  /**
   * Método que obtiene los datos de los permisos de los certificados desde un archivo JSON.
   * Realiza una petición GET al archivo JSON 'permisos-certificados.json'.
   * 
   * @returns {Observable<CertificadosTablaDatos>} Observable con los datos de los permisos de los certificados.
   */
  getPermisoCertificadosDeTabla(): Observable<CertificadosTablaDatos> {
    return this.http.get<CertificadosTablaDatos>('assets/json/250102/permisos-certificados.json');
  }

  /**
   * Método que obtiene los datos de los certificados desde un archivo JSON.
   * Realiza una petición GET al archivo JSON 'certificados.json'.
   * 
   * @returns {Observable<CertificadosTablaDatos>} Observable con los datos de los certificados.
   */
  getCertificadosDeTabla(): Observable<CertificadosTablaDatos> {
    return this.http.get<CertificadosTablaDatos>('assets/json/250102/certificados.json');
  }
}

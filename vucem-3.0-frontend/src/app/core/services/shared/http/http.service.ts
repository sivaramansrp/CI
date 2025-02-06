import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { enviroment } from '../../../../../enviroments/enviroment';
/**
 * Este servicio se utiliza para realizar solicitudes HTTP y manejar la respuesta.
 */
@Injectable({
  providedIn: 'root'
})

export class HttpCoreService {
/**
 * Esta variable se utiliza para almacenar la URL del servidor.
 */
  url: string;
  /**
   * Constructor de la clase
   * @param http: Constructor de HttpClient
   */
  constructor(public http: HttpClient) {
    this.url = !enviroment.MOCK ? enviroment.URL_SERVER : '';
  }
  /**
   * Este método se utiliza para hacer una solicitud POST y manejar la respuesta.
   * @param apiRoute: Ruta de la API
   * @param body: Cuerpo de la solicitud
   * @returns respuesta
   * @example post('/save', {name: 'John'})
   */    
   post(apiRoute: string, body: any) {
    return this.http.post(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }
  /**
   * Este método se utiliza para hacer una solicitud GET y manejar la respuesta.
   * @param apiRoute: Ruta de la API
   * @returns respuesta
   * @example get('/get')
   * @example get('/get/1')
   */
  get(apiRoute: string) {
    return this.http.get(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() });
  }
  /**
   * Este método se utiliza para hacer una solicitud PUT y manejar la respuesta.
   * @param apiRoute: Ruta de la API
   * @param body: Cuerpo de la solicitud
   * @returns respuesta
   * @example put('/update', {name: 'John'})
   */
  put(apiRoute: string, body: any) {
    return this.http.put(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }
  /**
   * Este método se utiliza para hacer una solicitud DELETE y manejar la respuesta.
   * @param apiRoute: Ruta de la API
   * @returns respuesta
   * @example delete('/delete')
   */
  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() });
  }
  /**
   * Este método se utiliza para obtener los encabezados HTTP.
   * @returns HttpHeaders
   * @example getHttpHeaders()
   * @example getHttpHeaders().set('Content-Type', 'application/json')
   */
  getHttpHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    return headers;
  }
}
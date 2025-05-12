import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';

/**
 * This service is used to make http requests & handle the response.
 */
@Injectable({
  providedIn: 'root'
})

export class HttpCoreService {
/**
 * This variable is used to store the server URL.
 */
  url: string;
  /**
   * constructor of the class
   * @param http: HttpClient constructor
   */
  constructor(public http: HttpClient) {
    this.url = !enviroment.MOCK ? enviroment.URL_SERVER : '';
  }
  /**
   * This method is used to make a post request & handle the response.
   * @param apiRoute: API route
   * @param body: request body
   * @returns response
   * @example post('/save', {name: 'John'})
   */    
   post(apiRoute: string, body: any) {
    return this.http.post(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }
  /**
   * This method is used to make a get request & handle the response.
   * @param apiRoute: API route
   * @returns response
   * @example get('/get')
   * @example get('/get/1')
   */
  get(apiRoute: string) {
    return this.http.get(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() });
  }
  /**
   * This method is used to make a put request & handle the response.
   * @param apiRoute: API route
   * @param body: request body
   * @returns response
   * @example put('/update', {name: 'John'})
   */
  put(apiRoute: string, body: any) {
    return this.http.put(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }
  /**
   * This method is used to make a delete request & handle the response.
   * @param apiRoute: API route
   * @returns response
   * @example delete('/delete')
   */
  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() });
  }
  /**
   * This method is used to get the http headers.
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
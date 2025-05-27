import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

import { ENVIRONMENT } from '../../../../enviroments/enviroment';
import { Observable } from 'rxjs';

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
    this.url = !ENVIRONMENT.MOCK ? ENVIRONMENT.URL_SERVER : '';
  }
  /**
   * This method is used to make a post request & handle the response.
   * @param apiRoute: API route
   * @param body: request body
   * @returns response
   * @example post('/save', {name: 'John'})
   */    
   post<T>(apiRoute: string, body: T): Observable<object> {
    return this.http.post(`${this.url + apiRoute}`, body, { headers: HttpCoreService.getHttpHeaders() });
  }
  /**
   * This method is used to make a get request & handle the response.
   * @param apiRoute: API route
   * @returns response
   * @example get('/get')
   * @example get('/get/1')
   */
  get<T>(apiRoute: string): Observable<T> {
    return this.http.get<T>(`${this.url + apiRoute}`, { headers: HttpCoreService.getHttpHeaders() });
  }
  /**
   * This method is used to make a put request & handle the response.
   * @param apiRoute: API route
   * @param body: request body
   * @returns response
   * @example put('/update', {name: 'John'})
   */
  put<T>(apiRoute: string, body: T): Observable<T> {
    return this.http.put<T>(`${this.url + apiRoute}`, body, { headers: HttpCoreService.getHttpHeaders() });
  }
  /**
   * This method is used to make a delete request & handle the response.
   * @param apiRoute: API route
   * @returns response
   * @example delete('/delete')
   */
  delete<T>(apiRoute: string): Observable<T> {
    return this.http.delete<T>(`${this.url + apiRoute}`, { headers: HttpCoreService.getHttpHeaders() });
  }
  /**
   * This method is used to get the http headers.
   * @returns HttpHeaders
   * @example getHttpHeaders()
   * @example getHttpHeaders().set('Content-Type', 'application/json')
   */
  static getHttpHeaders(): HttpHeaders {
    const HEADERS: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    return HEADERS;
  }
}
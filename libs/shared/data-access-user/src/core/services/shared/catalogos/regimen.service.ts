import { Injectable } from '@angular/core';

import { API_GET_REGIMEN, API_GET_REGIMENES_CLASIFICACION, CLASIFICACION } from '../../../constants/api-constants';
import { CatalogosResponse } from '../../../models/shared/catalogo.model';
import { ENVIRONMENT } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegimenService {

  /**
    * URL base del servidor al que se realizarán las solicitudes relacionadas con aduanas.
    * Esta variable almacena la dirección del host para los servicios compartidos de catálogos.
    * Es de solo lectura y se inicializa en el constructor del servicio.
    */
   private readonly host: string;
 
   constructor(private http: HttpClient) {
     this.host = `${ENVIRONMENT.API_HOST}/api/`;
   }
 
  
   getRegimenes(): Observable<CatalogosResponse> {
     const ENDPOINT = `${this.host}${API_GET_REGIMEN}`;
 
     return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
       map((response) => {
         return response;
       }),
       catchError(() => {
         const ERROR = new Error(
           `Ocurrió un error al devolver la información ${ENDPOINT} `
         );
         return throwError(() => ERROR);
       })
     );
   }

     getRegimenesCve(cveRegimen: string): Observable<CatalogosResponse> {
       const ENDPOINT =
         `${this.host}` +
         API_GET_REGIMENES_CLASIFICACION.replace(CLASIFICACION, cveRegimen);
   
       return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
         map((response) => {
           return response;
         }),
         catchError(() => {
           const ERROR = new Error(
             `Ocurrió un error al devolver la información ${ENDPOINT} `
           );
           return throwError(() => ERROR);
         })
       );
     }

}

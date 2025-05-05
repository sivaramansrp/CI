import { Injectable } from '@angular/core';

import { AvisoValor, PermisoModel } from '../models/permiso-importacion.model';
 
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
 

/**
* Servicio que proporciona métodos para obtener datos relacionados con la exportación.
*/
@Injectable({
  providedIn: 'root'
})


export class PermisoPetroleoService {
    constructor(private http: HttpClient) {
        //constructor
      }
    obtenerTabla(): Observable<PermisoModel[]> {
        return this.http.get<PermisoModel[]>('assets/json/130302/petroleo.json');
      }

      getSolicitante(): Observable<AvisoValor> {
        return this.http.get<AvisoValor>('assets/json/130302/permiso.json');
        }
}
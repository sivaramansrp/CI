import { Injectable } from '@angular/core';
import { PermisoModel } from '../models/permiso-importacion.model';
 
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
}
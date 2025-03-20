/* eslint-disable sort-imports */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http:HttpClient) { 
    //constructor
  }

  obtenerEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260603/estado.json');
  }
}

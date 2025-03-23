import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  constructor(private http: HttpClient) {}

  obtenerAduanaDeIngreso(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('/assets/json/290101/aduana_de_ingreso.json');
  }

  // obtenerEstablecimiento(): Observable<RespuestaCatalogos> {
  //   return this.http.get<RespuestaCatalogos>('/assets/json/290101/establecimiento.json');
  // }
}

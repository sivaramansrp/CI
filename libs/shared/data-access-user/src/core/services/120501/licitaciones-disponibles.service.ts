import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RespuestaCatalogos } from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class LicitacionesDisponiblesService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('assets/json/120501/licitaciones-disponibles.json');
  }
  getEntidadfederativa(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120501/entidad-federativa.json');
  }
  getRepresentacionfederal(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120501/representacion-federal.json');
  }
}

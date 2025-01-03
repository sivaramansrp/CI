import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSolicitud } from '../../../models/5701/servicios-extraordinarios.model';
import {
  JSONResponse,
  RespuestaCatalogos,
} from '../../../models/5701/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  constructor(private http: HttpClient) {}

  url_server = 'https://dev.v30.ultrasist.net/api/json-auxiliar';

  getCatalogo(catalogo: number) {
    return this.http.get<JSONResponse>(`${this.url_server}/${catalogo}`);
  }

  getCatalogos(catalogo: string) {
    return this.http.get<RespuestaCatalogos>(`${this.url_server}/${catalogo}`);
  }
}

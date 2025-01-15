import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSolicitud } from '../../../models/5701/servicios-extraordinarios.model';
import { catalogoResponse } from '../../../models/5701/catalogos.model';
import {
  JSONResponse,
  RespuestaCatalogos,
} from '../../../models/5701/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  constructor(private http: HttpClient) {}

  urlServer = 'https://dev.v30.ultrasist.net/api';

  getCatalogo(catalogo: string) {
    return this.http.get<catalogoResponse[]>(`${this.urlServer}/${catalogo}`);
  }

  getCatalogos(catalogo: string) {
    return this.http.get<RespuestaCatalogos>(`${this.urlServer}/${catalogo}`);
  }


}

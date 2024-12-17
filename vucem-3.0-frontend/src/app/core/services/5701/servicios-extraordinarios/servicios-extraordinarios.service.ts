import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSolicitud } from '../../../models/5701/servicios-extraordinarios.model';
import { RespuestaCatalogos } from '../../../models/5701/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  constructor(private http: HttpClient) {}

  url_server = 'http://localhost:4200/assets/json/5701';

  getCatalogos(catalogo:string) {
    return this.http.get<RespuestaCatalogos>(
      `${this.url_server}/${catalogo}`,
    )
  }
}

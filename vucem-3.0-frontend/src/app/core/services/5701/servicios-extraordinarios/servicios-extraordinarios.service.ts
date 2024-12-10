import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSolicitud } from '../../../models/5701/servicios-extraordinarios.model';
import { RespuestaCatalogos } from '../../../models/5701/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  constructor(private http: HttpClient) {}

  urlServer = 'http://localhost:4200/assets/json/5701';

  getDatosGenerales() {
    return this.http.get<RespuestaSolicitud>(
      `${this.urlServer}/solicitud-servicio-extraordinario.json`,
    )
  }

  getCatalogoTiposSolicitud() {
    return this.http.get<RespuestaCatalogos>(
      `${this.urlServer}/cat-tipo-solicitud.json`,
    )
  }

  getCatalogoTipoSolicitudes() {
    return this.http.get<RespuestaCatalogos>(
      `${this.urlServer}/cat-tipo-documento.json`,
    )
  }
}

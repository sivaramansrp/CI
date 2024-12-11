import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSolicitud } from '../../../models/5701/servicios-extraordinarios.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  constructor(private http: HttpClient) {}

  urlServer = 'http://localhost:4200/assets/json/5701';

  getDatosGenerales() {
    return this.http.get<RespuestaSolicitud>(
      `${this.urlServer}/solicitud-servicio-extraordinario.json`,
    )
  }
}

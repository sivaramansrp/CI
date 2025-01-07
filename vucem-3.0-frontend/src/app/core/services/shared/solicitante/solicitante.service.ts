import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '../../../models/5701/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  constructor(private http: HttpClient) {}

  // url_server = 'http://localhost:4200/assets/json/5701';
  url_server = 'https://dev.v30.ultrasist.net/api/json-auxiliar';

  getDatosGenerales(id: number) {
    return this.http.get<JSONResponse>(
      `${this.url_server}/${id}`
    );
  }
}

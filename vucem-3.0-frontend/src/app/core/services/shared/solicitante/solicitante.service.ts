import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '../../../models/5701/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  constructor(private http: HttpClient) {}

  urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';

  getDatosGenerales(id: number) {
    return this.http.get<JSONResponse>(
      `${this.urlServer}/${id}`
    );
  }
}

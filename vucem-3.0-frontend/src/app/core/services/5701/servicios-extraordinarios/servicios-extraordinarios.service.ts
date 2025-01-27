import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '../../../models/shared/catalogos.model';
import { enviroment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) {}
  obtenerTramite( id: number ) {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`);
  }
}

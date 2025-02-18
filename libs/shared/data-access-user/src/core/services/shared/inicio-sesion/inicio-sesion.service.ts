import { Login, TokenResponse } from '../../../models/shared/inicio-sesion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './../../../../../../../../apps/aga/src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class InicioSesionService {
  urlServer = enviroment.URL_SERVER;

  constructor(private http: HttpClient) {}

  obtenerToken(body: Login) {
    return this.http.post<TokenResponse>(`${this.urlServer}/login`, body);
  }
}

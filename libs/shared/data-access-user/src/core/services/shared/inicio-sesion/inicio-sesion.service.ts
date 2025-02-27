import { Login, TokenResponse } from 'libs/shared/data-access-user/src/core/models/shared/inicio-sesion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';

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

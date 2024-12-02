import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  constructor(private http: HttpClient) {}

  urlServer = 'http://localhost:4200/assets/json/5701/solicitud-servicio-extraordinario.json';

  getDatosGenerales() {
    return this.http.get(
      `${this.urlServer}`,
    )
  }
}

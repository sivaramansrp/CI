import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  

export class AutorizacionDeRayosXService {


  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }

  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/banco-options.json');
  }

  getTipoOperacion() : Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/tipo-operacion.json');
  }

  getFinalidad() : Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/finalidad.json');
  }
}
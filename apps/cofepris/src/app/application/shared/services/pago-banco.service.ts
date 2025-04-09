import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagoBancoService {
  /**
   * Constructor de la clase PagoBancoService.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(public http: HttpClient) {
    // Constructor de la clase PagoBancoService
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260501/banco-options.json');
  }
}

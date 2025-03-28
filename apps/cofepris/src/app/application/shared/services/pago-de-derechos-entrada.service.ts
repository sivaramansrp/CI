
/**
 * Servicio para la gestión del pago de derechos.
 * Proporciona métodos para obtener datos relacionados con el pago de derechos.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Servicio que se provee en el ámbito de la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class PagoDeDerechosEntradaService {

  /**
   * Constructor del servicio.
   * Inyecta el cliente HTTP para realizar peticiones.
   * 
   * @param http Cliente HTTP para realizar peticiones.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos relacionados con el pago de derechos desde un archivo JSON local.
   * 
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260402/banco.json');
  }
}

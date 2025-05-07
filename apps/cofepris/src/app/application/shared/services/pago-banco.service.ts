import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudPagoBancoState } from '../estados/stores/pago-banco.store';
import { TramitePagoBancoQuery } from '../estados/queries/pago-banco.query';

@Injectable({
  providedIn: 'root',
})
export class PagoBancoService {
  /**
   * Constructor de la clase PagoBancoService.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(public http: HttpClient,private query: TramitePagoBancoQuery) {
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
  
/**
 * Recupera el estado actual de `SolicitudPagoBanco` como un observable.
 *
 * @returns Un `Observable` que emite el estado actual de `SolicitudPagoBancoState`.
 */
 getSolicitudPagoBancoState(): Observable<SolicitudPagoBancoState> {
     return this.query.selectSolicitud$;
   }
}

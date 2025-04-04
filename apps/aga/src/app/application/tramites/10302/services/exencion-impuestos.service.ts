import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Tramite10302Store} from '../estados/tramite10302.store'
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RespuestaMercancia } from '../models/exencion-impuestos.model';

/**
 * Servicio para obtener datos relacionados con importadores y exportadores.
 */
@Injectable({
  providedIn: 'root',
})

export class ExencionImpuestosService {
  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes.
   * @param store Store de Akita para gestionar el estado.
   */
  constructor(private http: HttpClient, private store: Tramite10302Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
   * @returns Observable con la respuesta del catálogo de aduanas.
   */
  getAduana(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10302/aduanaIngresara.json');
  }

  getTipoDeMercancia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10302/tipo-de-mercancia.json');
  }

  getCondicionMercancia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10302/condicion-mercancia.json');
  }

  getUnidadMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10302/unidad-medida.json');
  }

  getAno() {
    return this.http.get<RespuestaCatalogos>('assets/json/10302/ano.json');
  }
  
  getPais(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10302/pais.json');
  }

  agregarMercancias(): Observable<RespuestaMercancia> {
    return this.http.get<RespuestaMercancia>(`assets/json/10302/mercanciaDatos.json`);
  }
}

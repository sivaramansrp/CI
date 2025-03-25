import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Servicio para obtener datos relacionados con importadores y exportadores.
 */
@Injectable({
  providedIn: 'root',
})
export class ImportadorExportadorService {
  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes.
   * @param store Store de Akita para gestionar el estado.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  /**
   * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
   * @returns Observable con la respuesta del catálogo de aduanas.
   */
  getAduanaIngresara(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10301/aduanaIngresara.json'
    );
  }

  /**
   * Obtiene el catálogo de años.
   * @returns Observable con la respuesta del catálogo de años.
   */
  getAno(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10301/ano.json');
  }

  /**
   * Obtiene el catálogo de condiciones.
   * @returns Observable con la respuesta del catálogo de condiciones.
   */
  getCondicion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10301/condicion.json'
    );
  }

  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10301/pais.json');
  }
}

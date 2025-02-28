import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '../../models/shared/catalogos.model';

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
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
   * @returns Observable con la respuesta del catálogo de aduanas.
   */
  getAduanaIngresara() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10301/aduanaIngresara.json'
    );
  }

  /**
   * Obtiene el catálogo de años.
   * @returns Observable con la respuesta del catálogo de años.
   */
  getAno() {
    return this.http.get<RespuestaCatalogos>('assets/json/10301/ano.json');
  }

  /**
   * Obtiene el catálogo de condiciones.
   * @returns Observable con la respuesta del catálogo de condiciones.
   */
  getCondicion() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10301/condicion.json'
    );
  }

  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais() {
    return this.http.get<RespuestaCatalogos>('assets/json/10301/pais.json');
  }

  /**
   * Obtiene el catálogo de tipos de documentos.
   * @returns Observable con la respuesta del catálogo de tipos de documentos.
   */
  getTipoDocumento() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10301/tipodocumento.json'
    );
  }
}

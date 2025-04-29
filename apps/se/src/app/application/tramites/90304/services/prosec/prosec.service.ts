import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProsecService {

  /**
   * Constructor del servicio.
   * @param http - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene los datos del documentos seleccionados.
   * @returns Observable con los datos del documentos seleccionados.
   */
  obtenerDocumentosSeleccionados(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/90304/documentos-seleccionados.json');
  }
}

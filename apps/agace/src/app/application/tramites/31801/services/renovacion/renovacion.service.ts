import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ManifiestosRespuesta, RenovacionRespuesta } from '../../models/renovacion.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

/**
 * Servicio para gestionar la renovación de un trámite.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que representa el servicio de renovación.
 * Proporciona métodos para obtener datos relacionados con la renovación.
 */
export class RenovacionService {

  /**
   * Constructor del servicio.
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(
    private http: HttpClient
  ) { 
    // Constructor vacío, se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los datos del documentos seleccionados.
   * @returns Observable con los datos del documentos seleccionados.
   */
  obtenerDocumentosSeleccionados(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/31801/documentos-seleccionados.json');
  }

  /**
   * Obtiene los datos del renovacion.
   * @returns Observable con los datos del renovacion.
   */
  obtenerRenovacionDatos(): Observable<RenovacionRespuesta> {
    return this.http.get<RenovacionRespuesta>('assets/json/31801/renovacion-datos.json');
  }

  /**
   * Obtiene la lista de manifiestos desde un archivo JSON.
   * 
   * @returns Observable con la respuesta de los manifiestos.
   */
  getManifiestos(): Observable<ManifiestosRespuesta> {
    return this.http.get<ManifiestosRespuesta>('assets/json/31801/manifiestos.json');
  }
}

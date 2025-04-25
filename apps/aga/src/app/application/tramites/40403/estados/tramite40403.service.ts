import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CAATRespuesta } from '../models/atencion-de-renovacion.model';

/**
 * Servicio para gestionar la atención a la renovación del trámite 40403.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Clase que representa el servicio de atención a la renovación del trámite 40403.
 */
export class Tramite40403Service {
  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes a la API o cargar recursos.
   */
  constructor(
    private http: HttpClient
  ) {
    // Constructor vacío, se utiliza para inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de tipos de CAAT aéreo desde un archivo JSON local.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
   */
  getTipoDeCaatAerea(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40403/tipo-caat-aereo.json');
  }

  /**
   * Obtiene el catálogo de códigos de transportación aérea desde un archivo JSON local.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
   */
  geTideCodTransportacionAerea(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40403/codigo.json');
  }

  /**
   * Busca una solicitud utilizando el valor de `claveFolioCAAT` proporcionado.
   * @returns Un observable que emite un objeto de tipo `CAATRespuesta`.
   */
  buscarSolicitudPorCAATe(): Observable<CAATRespuesta> {
    return this.http.get<CAATRespuesta>('/assets/json/40403/caat.json');
  }
}
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar los medios de transporte.
 * 
 * Este servicio proporciona métodos para obtener datos relacionados con los medios de transporte
 * desde un archivo JSON alojado en los activos de la aplicación.
 * @providedIn `root`
 */
@Injectable({
  providedIn: 'root',
})
export class MediodetransporteService {
  
  /**
   * URL del archivo JSON que contiene los datos de medios de transporte.
   * @type {string}
   */
  private readonly url = './assets/json/230101/mediodetransporte.json';

  /**
   * Constructor del servicio MediodetransporteService.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // no hacer nada
  }

  /**
   * @descripcion Obtiene una lista de medios de transporte desde el servidor.
   * @retorna Un observable que emite un arreglo de objetos de tipo `Catalogo`.
   */
  getMedioDeTransporte(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }
}

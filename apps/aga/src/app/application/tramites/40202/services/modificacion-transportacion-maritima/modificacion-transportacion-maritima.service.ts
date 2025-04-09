import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCaatTabla } from '../../models/modificacion-transportacion-maritima.model';

/**
 * Servicio para la gestión de datos relacionados con la transportación marítima.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que representa el servicio de transportación marítima.
 * Este servicio se encarga de realizar peticiones HTTP para obtener datos relacionados con la transportación marítima.
 */
export class ModificacionTransportacionMaritimaService {

  /**
   * Constructor del servicio TransportacionMaritimaService.
   * @param http - Instancia de HttpClient para realizar peticiones HTTP.
   * @description El constructor inyecta la dependencia HttpClient para realizar peticiones HTTP.
   */
  constructor(
    private http: HttpClient
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Obtiene el catálogo de empresas CAAT.
   * @returns Observable<RespuestaCatalogos>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de empresas CAAT.
   */
  obtenerBuscarEmpresaCaat(): Observable<RespuestaCaatTabla> {
    return this.http.get<RespuestaCaatTabla>('assets/json/40202/buscar-empresa-caat.json');
  }
}

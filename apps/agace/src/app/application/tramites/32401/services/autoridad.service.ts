import { CapturarElTextoLibre } from '../models/datos-tramite.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequerimientoOpcions } from '../models/datos-tramite.model';
import { RespuestaContenedor } from '../models/datos-tramite.model';
/**
 * Servicio para interactuar con los datos relacionados con la autoridad.
 * Proporciona métodos para obtener y gestionar listas de trámites, aduanas y solicitudes.
 */
@Injectable({
  /** Define el ámbito del servicio como raíz. */
  providedIn: 'root',
})
export class AutoridadService {
  /**
   * Constructor del servicio.
   * Inyecta el cliente HTTP para realizar solicitudes.
   * @param http Cliente HTTP para la comunicación con el servidor.
   */
  constructor(private http: HttpClient) {
    // Constructor vacío, se puede agregar lógica adicional si es necesario.
  }

  /**
   * Obtiene la lista de trámites desde un archivo JSON.
   * @returns Observable con los datos del catálogo de trámites.
   */
  obtenerTramiteLista(): Observable<CatalogosSelect> {
    return this.http.get<CatalogosSelect>(
      `assets/json/32401/tipo-de-tramite.json`
    );
  }

  /**
   * Obtiene la lista de aduanas desde un archivo JSON.
   * @returns Observable con los datos del catálogo de aduanas.
   */
  obtenerAduanaLista(): Observable<CatalogosSelect> {
    return this.http.get<CatalogosSelect>(
      `assets/json/32401/tipo-de-requerimiento.json`
    );
  }

  /**
   * Agrega una solicitud y obtiene información desde un archivo JSON.
   * @returns Observable con los datos del contenedor relacionados con la solicitud.
   */
  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(
      `assets/json/32401/contenedorLista.json`
    );
  }

  /**
   * Método para obtener los datos de captura de texto libre desde un archivo JSON.
   * Realiza una solicitud HTTP GET para recuperar la información.
   * @returns Observable que emite los datos de CapturarElTextoLibre.
   */
  agregarCapturarElTextoLibre(): Observable<CapturarElTextoLibre> {
    return this.http.get<CapturarElTextoLibre>(
      `assets/json/32401/capturar-el-texto-libre.json`
    );
  }

  /**
   * Realiza una petición HTTP GET para obtener las opciones de requerimiento
   * desde un archivo JSON local ubicado en la ruta especificada.
   *
   * @returns Un observable que emite un arreglo de objetos `RequerimientoOpcions`.
   */
  agregarRequerimientoOpcions(): Observable<RequerimientoOpcions[]> {
    return this.http.get<RequerimientoOpcions[]>(
      `assets/json/32401/requerimiento-opcions.json`
    );
  }
}

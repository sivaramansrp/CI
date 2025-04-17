import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

import { PermisosVigentesRespuesta, PersonasNotificarRespuesta, TitularDetalleRespuesta } from '../../models/suspension-permiso.model';

/**
 * Servicio para gestionar la suspensión de permisos.
 * @class SuspensionPermisoService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para gestionar la suspensión de permisos.
 */
export class SuspensionPermisoService {

   /**
   * Constructor del servicio.
   * @param http - Servicio HTTP para realizar peticiones.
   */
   constructor(
    private http: HttpClient
  ) { 
    // Constructor vacío
  }

  /**
   * Obtiene los datos del documentos seleccionados.
   * @returns Observable con los datos del documentos seleccionados.
   */
  obtenerDocumentosSeleccionados(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/140216/documentos-seleccionados.json');
  }

  /**
   * Obtiene los datos de la tabla de permisos vigentes.
   * @returns Observable con los datos de la tabla de permisos vigentes.
   */
  obtenerPermisosVigentes(): Observable<PermisosVigentesRespuesta> {
    return this.http.get<PermisosVigentesRespuesta>('assets/json/140216/permisos-vigentes.json');
  }

  /**
   * Obtiene los datos del detalle del titular.
   * @returns Observable con los datos del detalle del titular.
   */
  obtenerDetalleTitular(): Observable<TitularDetalleRespuesta> {
    return this.http.get<TitularDetalleRespuesta>('assets/json/140216/detalle-titular.json');
  }

  /**
   * Obtiene los datos del personal a notificar.
   * @returns Observable con los datos de las personas a notificar.
   */
  obtenerPersonasNotificar(): Observable<PersonasNotificarRespuesta> {
    return this.http.get<PersonasNotificarRespuesta>('assets/json/140216/personas-notificar.json');
  }
}

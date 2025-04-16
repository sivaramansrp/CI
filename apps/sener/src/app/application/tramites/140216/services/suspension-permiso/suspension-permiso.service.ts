import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
import { PermisosVigentesRespuesta } from '../../models/suspension-permiso.model';

@Injectable({
  providedIn: 'root'
})
export class SuspensionPermisoService {

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
    return this.http.get<RespuestaCatalogos>('assets/json/140216/documentos-seleccionados.json');
  }

  /**
   * Obtiene los datos de la tabla de permisos vigentes.
   * @returns Observable con los datos de la tabla de permisos vigentes.
   */
  buscarPermisosVigentes(): Observable<PermisosVigentesRespuesta> {
    return this.http.get<PermisosVigentesRespuesta>('assets/json/140216/permisos-vigentes.json');
  }
}

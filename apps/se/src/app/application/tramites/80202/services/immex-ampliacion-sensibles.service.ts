
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
import { PROC_80202 } from '../servers/api-routes';

/**
 * Service for managing IMMEX Ampliacion Sensibles data
 * @class ImmexAmpliacionSensiblesService
 * @description Handles the business logic for IMMEX Ampliacion Sensibles operations
 */
@Injectable({
  providedIn: 'root',
})
export class ImmexAmpliacionSensiblesService {
  constructor(
    private readonly http: HttpClient,
    public httpService: HttpCoreService
  ) {}

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: any): Observable<any> {
    return this.httpService.post<any>(PROC_80202.GUARDAR, { body: body });
  }
}

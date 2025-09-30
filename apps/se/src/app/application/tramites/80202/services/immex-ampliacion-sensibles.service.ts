
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
import { PROC_80202 } from '../servers/api-routes';

/**
 * @service ImmexAmpliacionSensiblesService
 * @description Servicio para gestionar la lógica de negocio de IMMEX Ampliación Sensibles.
 * @author Ultrasist
 * @date 2025-09-30
 */
@Injectable({
  providedIn: 'root',
})
export class ImmexAmpliacionSensiblesService {
  /** Cliente HTTP para llamadas directas. */
  constructor(
    private readonly http: HttpClient,
    /** Servicio HTTP core para peticiones generales. */
    public httpService: HttpCoreService
  ) { }

  /** Envía los datos de la solicitud mediante POST. */
  guardarDatosPost(body: any): Observable<any> {
    return this.httpService.post<any>(PROC_80202.GUARDAR, { body: body });
  }
}

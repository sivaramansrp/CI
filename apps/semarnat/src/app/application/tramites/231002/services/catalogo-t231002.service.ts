import {
  API_GET_IMMEX,
  API_GET_MATERIAS_BITACORA,
  API_GET_MATERIA_ID,
} from '../../../core/server/api-router';
import { Catalogo, ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ImmexResponse,
  SimpleCatalogoResponse,
} from '../../231001/models/catalogo-response';
import { Injectable } from '@angular/core';
import { MateriaResiduo } from '../models/materia-residuo.model';
import { Observable } from 'rxjs';
import { TRAMITE_ID } from '../constantes/aviso-retorno.enum';

@Injectable({ providedIn: 'root' })
export class CatalogoT231002Service {
  constructor(private http: HttpClient) {}

  /**
   * Host base de la API (se obtiene de la configuración de entorno).
   */
  urlServer = `${ENVIRONMENT.API_HOST}/api/`;

  /**
   * Obtiene los datos de IMMEX por RFC.
   * @param rfc RFC del solicitante.
   * @returns Observable con los datos de IMMEX.
   */
  obtenerDatosImmexByRfc(
    rfc: string
  ): Observable<SimpleCatalogoResponse<ImmexResponse[]>> {
    const URL = `${this.urlServer}${API_GET_IMMEX(TRAMITE_ID, rfc)}`;
    return this.http.get<SimpleCatalogoResponse<ImmexResponse[]>>(URL);
  }

  /**
   * Obtiene los datos de materias primas por número de bitácora.
   * @param noBitacora Número de bitácora.
   * @param rfc RFC del solicitante.
   * @returns Observable con los datos de materias primas.
   */
  obtenerMateriasPrimasPorNoBitacora(
    noBitacora: string,
    rfc: string
  ): Observable<SimpleCatalogoResponse<Catalogo[]>> {
    const PARAMS = new HttpParams().set('bitacora', noBitacora);
    const URL = `${this.urlServer}${API_GET_MATERIAS_BITACORA(
      rfc,
      TRAMITE_ID
    )}`;
    return this.http.get<SimpleCatalogoResponse<Catalogo[]>>(URL, {
      params: PARAMS,
    });
  }

  /**
   * Obtiene una materia prima por su ID.
   * @param materiaId ID de la materia prima.
   * @returns Observable con los datos de la materia prima.
   */
  obtenerMateriaPrimaPorId(
    materiaId: string
  ): Observable<SimpleCatalogoResponse<MateriaResiduo>> {
    const URL = `${this.urlServer}${API_GET_MATERIA_ID(materiaId, TRAMITE_ID)}`;
    return this.http.get<SimpleCatalogoResponse<MateriaResiduo>>(URL);
  }
}

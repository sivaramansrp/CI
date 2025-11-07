import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { map, Observable } from 'rxjs';
import { FRACCION_DESCRIPCION, RFC_BUSCAR_REPRESENTANTE_LEGAL, UNIDAD_MEDIDA } from '../../servers/api-route';

/**
 * @description
 * Servicio compartido registrado en el inyector raíz de Angular.
 * Proporciona una instancia única (singleton) accesible en toda la aplicación.
 * Ideal para lógica reutilizable, gestión de estado o comunicación entre componentes.
 */

@Injectable({
  providedIn: 'root'
})

export class Shared2605Service {

  /**
 * @description
 * Constructor del servicio `Shared2605Service`.
 * Se ejecuta al momento de crear la instancia del servicio.
 * Ideal para inicializar propiedades, configurar dependencias o preparar el estado interno.
 */
  constructor(private _http: HttpClient) { }

  getRepresentanteLegala(body: Record<string, unknown>, idProcedimiento: string): Observable<JSONResponse> {
    return this._http.post<JSONResponse>(RFC_BUSCAR_REPRESENTANTE_LEGAL(idProcedimiento), body).pipe(
      map((response) => response)
    );
  }

  getFraccionDescripcion(clave: string, idTipoTramite: string): Observable<JSONResponse> {
    return this._http.get<JSONResponse>(FRACCION_DESCRIPCION(clave, idTipoTramite)).pipe(
      map((response) => response)
    );
  }

  getUnidad(cveFraccion: string, idTipoTramite: string): Observable<JSONResponse> {
    return this._http.get<JSONResponse>(UNIDAD_MEDIDA(cveFraccion, idTipoTramite)).pipe(
      map((response) => response)
    );
  }

}

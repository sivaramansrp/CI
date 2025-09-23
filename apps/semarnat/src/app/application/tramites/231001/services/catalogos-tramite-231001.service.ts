import {
  API_GET_CAPITULO_FRACCION,
  API_GET_FRACCIONES_ARANCELARIAS,
  API_GET_IMMEX,
  API_GET_PARTIDAS_FRACCION,
  API_GET_SUBPARTIDAS_FRACCION,
  API_GET_UNIDAD_MEDIDA,
  CVE_CAPITULO_FRACCION,
  CVE_PARTIDA_FRACCION,
  CVE_SUBPARTIDA_FRACCION,
  GET_ADUANAS,
  TRAMITE,
} from '../../../constantes/231001/api-constants';

import { Catalogo, ENVIRONMENT } from '@libs/shared/data-access-user/src';
import {
  ImmexResponse,
  SimpleCatalogoResponse,
} from '../models/catalogo-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogosTramite231001Service {
  urlServer = ENVIRONMENT.API_HOST;
  constructor(private httpClient: HttpClient) {}

  getDatosImmex(
    rfc: string
  ): Observable<SimpleCatalogoResponse<ImmexResponse[]>> {
    const URL = `${this.urlServer}/api/${API_GET_IMMEX}/${rfc}`;
    return this.httpClient.get<SimpleCatalogoResponse<ImmexResponse[]>>(URL);
  }

  getCapitulos(): Observable<SimpleCatalogoResponse<Catalogo[]>> {
    const URL = `${this.urlServer}/api/${API_GET_CAPITULO_FRACCION}`;
    return this.httpClient.get<SimpleCatalogoResponse<Catalogo[]>>(URL);
  }

  getPartidas(
    cveCapituloFraccion: string
  ): Observable<SimpleCatalogoResponse<Catalogo[]>> {
    const URL = `${this.urlServer}/api/${API_GET_PARTIDAS_FRACCION.replace(
      CVE_CAPITULO_FRACCION,
      cveCapituloFraccion
    )}`;
    return this.httpClient.get<SimpleCatalogoResponse<Catalogo[]>>(URL);
  }

  getSubPartidas(
    cveCapituloFraccion: string,
    cvePartidaFraccion: string
  ): Observable<SimpleCatalogoResponse<Catalogo[]>> {
    const URL = `${this.urlServer}/api/${API_GET_SUBPARTIDAS_FRACCION.replace(
      CVE_CAPITULO_FRACCION,
      cveCapituloFraccion
    ).replace(CVE_PARTIDA_FRACCION, cvePartidaFraccion)}`;
    return this.httpClient.get<SimpleCatalogoResponse<Catalogo[]>>(URL);
  }

  getFraccionesArancelarias(
    cveCapituloFraccion: string,
    cvePartidaFraccion: string,
    cveSubpartidaFraccion: string
  ): Observable<SimpleCatalogoResponse<Catalogo[]>> {
    const URL = `${
      this.urlServer
    }/api/${API_GET_FRACCIONES_ARANCELARIAS.replace(
      CVE_CAPITULO_FRACCION,
      cveCapituloFraccion
    )
      .replace(CVE_PARTIDA_FRACCION, cvePartidaFraccion)
      .replace(CVE_SUBPARTIDA_FRACCION, cveSubpartidaFraccion)}`;
    return this.httpClient.get<SimpleCatalogoResponse<Catalogo[]>>(URL);
  }

  getUnidadMedida(
    tipoTramite: string
  ): Observable<SimpleCatalogoResponse<Catalogo[]>> {
    const URL = `${this.urlServer}/api/${API_GET_UNIDAD_MEDIDA.replace(
      TRAMITE,
      tipoTramite
    )}`;
    return this.httpClient.get<SimpleCatalogoResponse<Catalogo[]>>(URL);
  }

  getAduanas(): Observable<SimpleCatalogoResponse<Catalogo[]>> {
    const URL = `${this.urlServer}/api/${GET_ADUANAS}`;
    return this.httpClient.get<SimpleCatalogoResponse<Catalogo[]>>(URL);
  }
}

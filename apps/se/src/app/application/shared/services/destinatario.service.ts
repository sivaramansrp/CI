import { CATALOGO_MEDIO_TRANSPORTE, CATALOGO_PAISES, COMUN_URL, Catalogo, CatalogoServices } from '@libs/shared/data-access-user/src';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

/**
 * Servicio para gestionar las solicitudes relacionadas con los catálogos y datos del trámite 110201.
 */
@Injectable({
  providedIn: 'root',
})
export class DestinatarioService {


  host: string;
  tramite: string = '110202';

  constructor(private http: HttpClient, private catalogoServices: CatalogoServices) {
    this.host = `${COMUN_URL.BASE_URL}`
  }

  getPaisDestino(tramite: string, paisDestino: string): Observable<any[]> {
    return this.catalogoServices
      .paisesCatalogo(tramite, paisDestino)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  getTransporte(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_MEDIO_TRANSPORTE(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }


}

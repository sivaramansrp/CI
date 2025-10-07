import { COMUN_URL, Catalogo, CatalogoServices } from '@libs/shared/data-access-user/src';
import { Observable ,map } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar las solicitudes relacionadas con los catálogos y datos del trámite 110201.
 */
@Injectable({
  providedIn: 'root',
})
export class DestinatarioService {
  host: string;

  constructor(private catalogoServices: CatalogoServices) {
    this.host = `${COMUN_URL.BASE_URL}`
  }

  getPaisDestino(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.paisesCatalogo(tramite).pipe(
        map(res => res?.datos ?? [])
      );
  }

  getTransporte(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.catalogoMedioTransporte(tramite).pipe(
        map(res => res?.datos ?? [])
      );
  }

}

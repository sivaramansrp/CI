import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite240122State } from '../../estados/tramite240122Store.store';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private readonly http:HttpClient) { }

  /**
   * @description
   * Obtiene el estado inicial del trámite 240122 desde un archivo JSON local.
   *
   * @returns Un observable que emite el estado inicial del trámite 240122.
   *
   * @memberof SolicitudService
   */
  getPermisoExtraordinario(): Observable<Tramite240122State> {
    return this.http.get<Tramite240122State>('assets/json/240122/createInitialState.json');
  }
}

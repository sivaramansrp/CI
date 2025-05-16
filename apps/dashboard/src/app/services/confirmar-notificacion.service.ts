import { CatalogoResponse } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AcuseResolucion,
  Documento,
} from '../models/confirmar-notificacion.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmarNotificacionService {
  constructor(public http: HttpClient) {}

  getAcuseReciboDatos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(
      'assets/json/confirmar-notificacion/acuseDeRecibo.json'
    );
  }

  getFolioDatos(): Observable<AcuseResolucion> {
    return this.http.get<AcuseResolucion>(
      'assets/json/confirmar-notificacion/confirmar-notificacion.json'
    );
  }
}

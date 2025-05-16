import {
  AcusesYResoluciones,
  BotonDeAccion,
} from '../../models/shared/subsecuentes.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubsecuentesService {
  constructor(public http: HttpClient) {}

  getAcusesYResolucionesDatos(): Observable<AcusesYResoluciones> {
    return this.http.get<AcusesYResoluciones>(
      '/assets/json/subsecuentes/acusesYResolucionesDatos.json'
    );
  }
  getButtonesAcciones(): Observable<BotonDeAccion[]> {
    return this.http.get<BotonDeAccion[]>(
      '/assets/json/subsecuentes/BotonDeAccion.json'
    );
  }
}

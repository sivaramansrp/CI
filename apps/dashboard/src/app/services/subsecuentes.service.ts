import { AcusesYResoluciones } from '../models/subsecuentes.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

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
}

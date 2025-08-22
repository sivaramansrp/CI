import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepresentanteLegal } from '../../models/303/representante-legal.model';

@Injectable({
  providedIn: 'root'
})
export class Tramite303Service {

  constructor(private http: HttpClient) { }

  /** Método para buscar un representante legal por su RFC */
  buscarFisicaPorRFC(rfc: string): Observable<RepresentanteLegal | undefined> {
    return this.http
      .get<RepresentanteLegal[]>(`/assets/json/303/representante-legal.json`)
      .pipe(map(list => list.find(t => t.rfc === rfc)));
  }
}

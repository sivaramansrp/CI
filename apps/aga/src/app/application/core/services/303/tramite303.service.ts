import { Observable, map } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notificadores } from '../../models/303/notificadores.model';
import { RepresentanteLegal } from '../../models/303/representante-legal.model';

@Injectable({
  providedIn: 'root'
})
export class Tramite303Service {

  /**
   * Constructor del servicio Tramite303Service.
   * @param http HttpClient para realizar peticiones HTTP.
   */
  constructor(private http: HttpClient) { }

  /** Método para buscar un representante legal por su RFC */
  buscarFisicaPorRFC(rfc: string): Observable<RepresentanteLegal | undefined> {
    return this.http
      .get<RepresentanteLegal[]>(`/assets/json/303/representante-legal.json`)
      .pipe(map(list => list.find(t => t.rfc === rfc)));
  }

  /**
   * Consulta los notificadores.
   * @returns Observable con la lista de notificadores.
   */
  consultaNotificadores(): Observable<Notificadores[]> {
    return this.http.get<Notificadores[]>(`/assets/json/303/notificadores.json`);
  }

  consultaBanco(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`/assets/json/303/cat-banco.json`);
  }
}

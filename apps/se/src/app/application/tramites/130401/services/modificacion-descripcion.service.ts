
import { ArancelariaLista, PartidasLista, SolicitudLista } from '../models/modificacion-descripcion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModificacionDescripcionService {
  constructor(private http: HttpClient) {
    // Constructor del servicio.
  }
  obtenerPartidas(): Observable<PartidasLista> {
    return this.http
      .get<PartidasLista>('assets/json/130401/partidas.json');
  }
  obtenerarancelaria(): Observable<ArancelariaLista> {
    return this.http
      .get<ArancelariaLista>('assets/json/130401/arancelaria.json');
  }
  obtenerSolicitud(): Observable<SolicitudLista> {
    return this.http
      .get<SolicitudLista>('assets/json/130401/solicitud.json');
  }

}
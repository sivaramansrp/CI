import { Destinatario } from '../models/destinatario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudModificacionPermisoSalidaTerritorioService {

  constructor(private http: HttpClient) { 
    // Constructor
  }
  obtenerDestinatarioListo(): Observable<Destinatario[]> {
    return this.http
      .get<Destinatario[]>('../../../assets/json/261401/destinatario-mock.json')
      .pipe();
  }
}

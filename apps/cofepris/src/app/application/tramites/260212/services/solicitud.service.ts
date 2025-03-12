import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitudModel } from '../models/permiso-maquila.models';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'assets/json/260212/solicitud.json';

  constructor(private http: HttpClient) { }


  getSolicitudes(): Observable<solicitudModel[]> {
    return this.http.get<solicitudModel[]>('assets/json/260212/solicitud.json');
  }
}

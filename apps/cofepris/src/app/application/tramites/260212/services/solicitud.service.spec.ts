import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Solicitud {
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = '/api/solicitudes';

  constructor(private http: HttpClient) {}

  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }

  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }

  actualizarSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/${solicitud.id}`, solicitud);
  }

  eliminarSolicitud(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`);
  }
}

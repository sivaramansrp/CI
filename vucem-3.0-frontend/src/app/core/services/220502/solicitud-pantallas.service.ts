import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Servicio para obtener los datos de la solicitud */
@Injectable({
  providedIn: 'root',
})
/** Servicio para obtener los datos de la solicitud */
export class SolicitudPantallasService {
  /** URL para obtener los datos de la solicitud */
  private dataUrl = 'assets/json/220502/solicitud-pantallas-mock-data.json'; 

  /** Constructor para inyectar el servicio HttpClient */
  constructor(public http: HttpClient) {
    /** Llamar al método para obtener los datos */
    this.getData()
  }

  /** Método para obtener los datos de la solicitud 
   * @returns Observable<object>
  */
  getData(): Observable<object> {
    return this.http.get<object>(this.dataUrl);
  }
}

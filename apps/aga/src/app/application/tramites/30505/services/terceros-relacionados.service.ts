import { FusionDatos, TercerosRelacionados } from '../../../core/models/30505/aviso-modificacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'any'
})
export class TercerosRelacionadosService {
  /**
   * Constructor del servicio.
   * 
   * @param http - Cliente HTTP utilizado para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) {
     // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los datos del programa a cancelar desde un archivo JSON local.
   * 
   * @returns Observable que emite los datos del programa a cancelar.
   */
  obtenerDatos(): Observable<TercerosRelacionados> {
    return this.http.get<TercerosRelacionados>(`assets/json/30505/aviso.json`);
  }

  obtenerDatosPersona(rfc: string): Observable<FusionDatos> {
    return this.http.get<FusionDatos>(`assets/json/30505/fusion.json`, { params: { rfc } });
  }

}
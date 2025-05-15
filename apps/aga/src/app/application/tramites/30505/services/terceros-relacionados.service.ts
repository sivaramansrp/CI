import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TercerosRelacionados } from '../models/aviso-modificacion.model';


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
    return this.http.get<TercerosRelacionados>(`assets/json/30505/Terceros.json`);
  }
}
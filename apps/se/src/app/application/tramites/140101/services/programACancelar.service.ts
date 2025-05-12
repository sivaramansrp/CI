import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProgramaACancelar} from '../../../shared/models/programa-cancelar.model';
// Decorador Injectable que permite que este servicio sea inyectable en cualquier módulo.
/**
 * Servicio para gestionar las operaciones relacionadas con el programa a cancelar.
 * 
 * Este servicio permite obtener los datos del programa a cancelar desde un archivo JSON local.
 * 
 * @providedIn 'any' - Define que este servicio puede ser inyectado en cualquier módulo.
 */
@Injectable({
  providedIn: 'any'
})
export class ProgramaACancelarService {
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
  obtenerDatos(): Observable<ProgramaACancelar> {
    return this.http.get<ProgramaACancelar>(`assets/json/140101/Programa.json`);
  }
}
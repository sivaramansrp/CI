import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar las operaciones relacionadas con la retirada de la autorización de donaciones.
 */
@Injectable({
  providedIn: 'root',
})
export class CancelacionDonacionesService {
  /**
   * Constructor de la clase.
   * @param http Cliente HTTP para realizar peticiones a servicios externos.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para manejar las renovaciones de muestras de mercancías.
 * 
 * @remarks
 * Este servicio proporciona métodos para interactuar con la API relacionada con las renovaciones de muestras de mercancías.
 */
@Injectable({
  providedIn: 'root',
})
export class registroSolicitudImmexService {

  /**
   * Constructor del servicio registroSolicitudImmexService.
   * 
   * @param httpClient - Cliente HTTP inyectado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
       // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

}

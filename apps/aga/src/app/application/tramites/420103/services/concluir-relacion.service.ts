import { DetallesDelMercancia } from '@libs/shared/data-access-user/src/core/models/420103/concluir-relacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con la retirada de la autorización de donaciones.
 */
@Injectable({
  providedIn: 'root',
})
export class ConcluirRelacionService {
  /**
   * Constructor de la clase.
   * @param http Cliente HTTP para realizar peticiones a servicios externos.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los detalles de la mercancía relacionados con la solicitud.
   * @returns Un observable que emite un objeto del tipo `DetallesDelMercancia`.
   */
  getDetallesDelMercanciaDatos(): Observable<DetallesDelMercancia> {
    return this.http.get<DetallesDelMercancia>(
      'assets/json/420103/concluir-relacion-datos.json'
    );
  }
}
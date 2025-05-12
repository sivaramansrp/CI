import { Catalogo } from '@libs/shared/data-access-user/src';
import { DetallesDelMercancia } from '@libs/shared/data-access-user/src/core/models/11105/detalles-del-merchancia.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con la retirada de la autorización de donaciones.
 */
@Injectable({
  providedIn: 'root',
})
export class RetiradaDeLaAutorizacionDeDonacionesService {
  /**
   * Constructor de la clase.
   * @param http Cliente HTTP para realizar peticiones a servicios externos.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
   * @returns Un observable que emite un arreglo de objetos del tipo `Catalogo`.
   */
  getAduanaIngresara(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/11105/aduana-ingresara.json');
  }

  /**
   * Obtiene los detalles de la mercancía relacionados con la solicitud.
   * @returns Un observable que emite un objeto del tipo `DetallesDelMercancia`.
   */
  getDetallesDelMercanciaDatos(): Observable<DetallesDelMercancia> {
    return this.http.get<DetallesDelMercancia>(
      'assets/json/11105/detalles-del-mercancia-datos.json'
    );
  }
}
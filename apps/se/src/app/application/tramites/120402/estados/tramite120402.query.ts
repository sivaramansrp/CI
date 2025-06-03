import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
import { Tramite120402State } from './tramite120402.store';
import { Tramite120402Store } from './tramite120402.store';

/**
 * Servicio de consulta para el estado del trámite 120402.
 * 
 * Esta clase extiende de `Query` de Akita y permite acceder de forma reactiva
 * al estado del trámite 120402 almacenado en `Tramite120402Store`.
 */
@Injectable({ providedIn: 'root' })
export class Tramite120402Query extends Query<Tramite120402State> {

  /**
   * Observable que emite el estado completo del trámite 120402.
   * 
   * @returns Observable del estado completo (`Tramite120402State`).
   */
  get selectSolicitud$(): Observable<Tramite120402State> {
    return this.select((state) => state);
  }

  /**
   * Crea una nueva instancia de Tramite120402Query.
   * 
   * @param tramiteStore - Instancia del store que contiene el estado del trámite 120402.
   */
  constructor(protected tramiteStore: Tramite120402Store) {
    super(tramiteStore);
  }
}

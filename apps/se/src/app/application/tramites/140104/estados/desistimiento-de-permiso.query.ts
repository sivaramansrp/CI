import { CuposDisponiblesDatos } from '../models/cancelacion-de-certificados.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite140104State } from './tramite140104.store';
import { Tramite140104Store } from './tramite140104.store';

/**
 * Consulta (Query) para el manejo del estado relacionado con el trámite 140104.
 * 
 * Esta clase extiende de `Query` y proporciona selectores para acceder al estado
 * gestionado por `Tramite140104Store`. Está decorada con `@Injectable` para su
 * inyección a nivel raíz.
 * 
 * @example
 * // Selecciona el estado completo del trámite
 * tramite140104Query.selectTramite$.subscribe(state => { ... });
 */
@Injectable({ providedIn: 'root' })
export class Tramite140104Query extends Query<Tramite140104State> {
  // Constructor que inyecta el store correspondiente.
  constructor(protected override store: Tramite140104Store) {
    super(store);
  }

 /**
     * Selector para obtener el trámite completo del estado.
     */
  selectTramite$ = this.select(state => state);
}
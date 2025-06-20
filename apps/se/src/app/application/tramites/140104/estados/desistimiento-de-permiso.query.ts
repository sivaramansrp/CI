import { CuposDisponiblesDatos } from '../models/cancelacion-de-certificados.model';
import { DesistimientoStore } from './desistimiento-de-permiso.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Consulta (Query) para el manejo del estado relacionado con el trámite 140104.
 * 
 * Esta clase extiende de `Query` y proporciona selectores para acceder al estado
 * gestionado por `DesistimientoStore`. Está decorada con `@Injectable` para su
 * inyección a nivel raíz.
 * 
 * @example
 * // Selecciona el estado completo del trámite
 * DesistimientoQuery.selectTramite$.subscribe(state => { ... });
 */
@Injectable({ providedIn: 'root' })
export class DesistimientoQuery extends Query<CuposDisponiblesDatos> {
  // Constructor que inyecta el store correspondiente.
  constructor(protected override store: DesistimientoStore) {
    super(store);
  }

 /**
     * Selector para obtener el trámite completo del estado.
     */
  selectTramite$ = this.select(state => state);
}
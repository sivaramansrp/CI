import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite230501Query } from '../../estados/queries/tramite230501Query.query';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';
/**
 * @component TercerosRelacionadosVistaComponent
 * @description Componente de solo lectura que muestra las tablas de terceros relacionados
 * (fabricantes, destinatarios finales, proveedores y facturadores).
 * Consume observables del store para renderizar los datos en la vista mediante el componente
 * `TercerosRelacionadosComponent`.
 */
@Component({
  selector: 'app-terceros-relacionados-vista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terceros-relacionados-vista.component.html',
  styleUrl: './terceros-relacionados-vista.component.scss',
})
export class TercerosRelacionadosVistaComponent {
  /**
   * @property {Subject<void>} destroy$
   * Subject para cancelar suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * @constructor
   * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
   *
   * @param tramiteStore - Store que gestiona el estado de los datos del trámite.
   * @param tramiteQuery - Servicio de consulta que expone observables para leer los datos del store.
   */
  constructor(
    private tramiteStore: Tramite230501Store,
    private tramiteQuery: Tramite230501Query
  ) {}
}
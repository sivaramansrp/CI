/**
 * @fileoverview
 * El `PagoDeDerechosContenedoraComponent` es un componente de Angular diseñado para gestionar la funcionalidad relacionada con el pago de derechos.
 * Este componente utiliza el componente `PagoDeDerechosComponent` y se comunica con el estado del trámite 260213 a través del store `Tramite260213Store`.
 * 
 * @module PagoDeDerechosContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos del formulario de pago de derechos en el store del trámite.
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260213Store } from '../../../estados/tramite260213Store.store';

/**
 * @component
 * @name PagoDeDerechosContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `PagoDeDerechosComponent` 
 * para gestionar la funcionalidad relacionada con el pago de derechos. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260213Store`.
 *
 * @selector app-pago-de-derechos-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./pago-de-derechos-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./pago-de-derechos-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - PagoDeDerechosComponent: Componente compartido para gestionar la funcionalidad del pago de derechos.
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})
export class PagoDeDerechosContenedoraComponent {
  /**
   * @property {boolean} formularioDeshabilitado
   * @description
   * Indica si el formulario de pago de derechos está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {PagoDerechosFormState} pagoDerechos
   * @description
   * Estado actual del formulario de pago de derechos, obtenido del store del trámite.
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260213Store` para gestionar el estado del trámite.
   * Inicializa la propiedad `pagoDerechos` con el valor actual del store.
   * 
   * @param {Tramite260213Store} tramiteStore - Store que administra el estado del trámite 260213.
   */
  constructor(public tramiteStore: Tramite260213Store) {
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * @method updatePagoDerechos
   * @description
   * Actualiza los datos del formulario de pago de derechos en el store del trámite.
   * 
   * @param {PagoDerechosFormState} event - Estado actualizado del formulario de pago de derechos.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * const nuevoEstadoPago: PagoDerechosFormState = {
   *   monto: 1000,
   *   fechaPago: '2023-10-01',
   *   referencia: 'ABC123',
   * };
   * this.updatePagoDerechos(nuevoEstadoPago);
   * ```
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }
}
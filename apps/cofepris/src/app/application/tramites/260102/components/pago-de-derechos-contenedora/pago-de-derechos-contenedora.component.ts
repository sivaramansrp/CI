import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';

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
   * Indica si el formulario está deshabilitado. Por defecto es `false`.
   */
  @Input()
  formularioDeshabilitado: boolean = false;
  public pagoDerechos: PagoDerechosFormState;
  constructor(public tramiteStore: Tramite260102Store) {
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * Actualiza la información de pago de derechos en el store del trámite.
   *
   * Este método toma un objeto `PagoDerechosFormState` que contiene los datos actualizados
   * del formulario de pago de derechos y llama al método `updatePagoDerechos` del `tramiteStore`
   * para persistir los cambios.
   *
   * @param event Un objeto `PagoDerechosFormState` con los datos actualizados del formulario de pago.
   * @returns void.
   *
   * @example
   * ```typescript
   * const pagoActualizado: PagoDerechosFormState = {
   * // ... datos del formulario
   * };
   * this.updatePagoDerechos(pagoActualizado);
   * ```
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }
}

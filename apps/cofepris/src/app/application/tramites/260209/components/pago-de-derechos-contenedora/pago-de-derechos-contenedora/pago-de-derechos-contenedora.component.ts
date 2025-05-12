import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../../constants/destinados-donacio.enum';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260209Store } from '../../../estados/tramite260209Store.store';

/**
 * @component PagoDeDerechosContenedoraComponent
 * @description Componente contenedor que utiliza el componente `PagoDeDerechosComponent`
 * para gestionar la funcionalidad relacionada con el pago de derechos.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260209Store`.
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
   * @property {PagoDerechosFormState} pagoDerechos
   * @description Estado actual del formulario de pago de derechos, obtenido del store del trámite.
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * Identificador único del procedimiento.
   * Esta propiedad es de solo lectura y se inicializa con el valor constante `ID_PROCEDIMIENTO`.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260209Store` para gestionar el estado del trámite.
   * Inicializa la propiedad `pagoDerechos` con el valor actual del store.
   * @param tramiteStore - Store que administra el estado del trámite 260209.
   */
  constructor(public tramiteStore: Tramite260209Store) {
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * @method updatePagoDerechos
   * @description Actualiza los datos del formulario de pago de derechos en el store del trámite.
   * @param {PagoDerechosFormState} event - Estado actualizado del formulario de pago de derechos.
   * @returns {void} Este método no retorna ningún valor.
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }
}

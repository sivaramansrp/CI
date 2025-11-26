import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ID_PROCEDIMIENTO } from '../../../constants/medicamentos-destinados-uso.enum';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260208Store } from '../../../estados/tramite260208Store.store';

/**
 * @component PagoDeDerechosContenedoraComponent
 * @description Componente contenedor que utiliza el componente `PagoDeDerechosComponent`
 * para gestionar la funcionalidad relacionada con el pago de derechos.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260208Store`.
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
   * Indica si el formulario está deshabilitado. Por defecto es `false`.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {PagoDeDerechosComponent} pagoDeDerechosComponent
   * @description Referencia al componente hijo `PagoDeDerechosComponent` para acceder a sus métodos públicos.
   */
  @ViewChild(PagoDeDerechosComponent)
  pagoDeDerechosComponent!: PagoDeDerechosComponent;

  /**
   * @property {PagoDerechosFormState} pagoDerechos
   * @description Estado actual del formulario de pago de derechos, obtenido del store del trámite.
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * @property {string} idProcedimiento
   * @description Identificador del procedimiento.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @constructor
   * @description Inyecta el store `Tramite260208Store` para gestionar el estado del trámite.
   * Inicializa la propiedad `pagoDerechos` con el valor actual del store.
   * @param tramiteStore - Store que administra el estado del trámite 260208.
   */
  constructor(
    public tramiteStore: Tramite260208Store,
    private consultaQuery: ConsultaioQuery
  ) {
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * @method updatePagoDerechos
   * @description Actualiza los datos del formulario de pago de derechos en el store del trámite.
   * @param {PagoDerechosFormState} event - Estado actualizado del formulario de pago de derechos.
   * @returns {void} No retorna ningún valor.
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }

  /**
   * @method validarContenedor
   * @description
   * Valida el formulario contenido en el componente hijo `PagoDeDerechosComponent`.
   * Retorna `true` si el formulario es válido, de lo contrario `false`.
   * @returns {boolean} Estado de validación del formulario.
   */
  validarContenedor(): boolean {
    return (
      this.pagoDeDerechosComponent?.formularioSolicitudValidacion() ?? false
    );
  }
}

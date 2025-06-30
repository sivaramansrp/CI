import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ID_PROCEDIMIENTO } from '../../../constants/medicamentos-contengan.enum';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260304Store } from '../../../estados/tramite260304Store.store';

/**
 * @component PagoDeDerechosContenedoraComponent
 * @description
 * Componente contenedor responsable de gestionar la funcionalidad relacionada con el pago de derechos,
 * haciendo uso del componente `PagoDeDerechosComponent`. Interactúa con el estado global del trámite
 * a través del store `Tramite260304Store` para mostrar y actualizar los datos correspondientes al pago.
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
   * @input
   * @description
   * Indica si el formulario debe estar deshabilitado. Cuando es `true`, los controles del formulario estarán inactivos y no permitirán la edición por parte del usuario.
   * @type {boolean}
   */
   @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {PagoDerechosFormState} pagoDerechos
   * @description
   * Estado actual del formulario de pago de derechos, obtenido del estado global del trámite.
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * @property {string} idProcedimiento
   * @description
   * Identificador único del procedimiento, utilizado para asociar el pago de derechos al trámite correspondiente.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260304Store` para gestionar el estado del trámite.
   * Inicializa la propiedad `pagoDerechos` con el valor actual almacenado en el store.
   * 
   * @param tramiteStore Store que administra el estado del trámite 260304.
   */
  constructor(public tramiteStore: Tramite260304Store) {
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * @method updatePagoDerechos
   * @description
   * Actualiza en el store el estado del formulario de pago de derechos con los valores recibidos.
   * 
   * @param {PagoDerechosFormState} event Estado actualizado del formulario de pago de derechos.
   * @returns {void} Este método no retorna ningún valor.
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }
}
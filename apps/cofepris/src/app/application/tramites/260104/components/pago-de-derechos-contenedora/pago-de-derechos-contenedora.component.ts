import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';

/**
 * Componente `PagoDeDerechosContenedoraComponent`.
 * 
 * Este componente es responsable de manejar la lógica relacionada con el formulario
 * de pago de derechos dentro del trámite 260104. Utiliza un estado compartido a través
 * de `Tramite260104Store` para gestionar los datos del formulario.
 * 
 * @selector `app-pago-de-derechos-contenedora`
 * @standalone Este componente es independiente y puede ser utilizado sin un módulo específico.
 * @imports Incluye los módulos `CommonModule` y `PagoDeDerechosComponent`.
 * @templateUrl Define la plantilla HTML asociada al componente.
 * @styleUrl Define los estilos SCSS asociados al componente.
 */
export class PagoDeDerechosContenedoraComponent {
  /**
   * Representa el estado actual del formulario de pago de derechos.
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * Constructor del componente.
   * 
   * @param tramiteStore Servicio de estado compartido para gestionar los datos del trámite 260104.
   */
  constructor(public tramiteStore: Tramite260104Store) {
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * Actualiza el estado del formulario de pago de derechos en el almacén compartido.
   * 
   * @param event Nuevo estado del formulario de pago de derechos.
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }
}


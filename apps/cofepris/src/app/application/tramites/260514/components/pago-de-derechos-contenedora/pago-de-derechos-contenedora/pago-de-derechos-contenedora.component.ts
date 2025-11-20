import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosBancoComponent } from '../../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';

/**
 * @component PagoDeDerechosContenedoraComponent
 * @description Componente contenedor que utiliza el componente `PagoDeDerechosBancoComponent`
 * para gestionar la funcionalidad relacionada con el pago de derechos.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260210Store`.
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosBancoComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})
export class PagoDeDerechosContenedoraComponent {
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260514;

   /**
     * Emite el estado de validez del formulario.
     * Se envía un valor booleano cada vez que cambia la validez del formulario.
     * Permite comunicar al componente padre si el formulario es válido o no.
     */
     formValidityChange:boolean = false;
     /**
     * Actualiza el estado local de validez del formulario.
     * Este método recibe el valor emitido por el componente hijo.
     * Se utiliza para saber si el formulario es válido o no desde el componente principal.
     */
     onFormValidityChange(isValid: boolean):void {
      this.formValidityChange = isValid;
    }
}

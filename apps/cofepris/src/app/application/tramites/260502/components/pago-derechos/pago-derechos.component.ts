import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosBancoComponent } from '../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';

@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosBancoComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {
   /**
   * Emite el estado de validez del formulario.
   * Se envía un valor booleano cada vez que cambia la validez del formulario.
   * Permite comunicar al componente padre si el formulario es válido o no.
   */
   @Output() formValidityChange = new EventEmitter<boolean>();
   /**
   * Actualiza el estado local de validez del formulario.
   * Este método recibe el valor emitido por el componente hijo.
   * Se utiliza para saber si el formulario es válido o no desde el componente principal.
   */
   onFormValidityChange(isValid: boolean):void {
    this.formValidityChange.emit(isValid);
  }
}

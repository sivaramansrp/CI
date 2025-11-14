import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';

@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {
  idProcedimiento:number = 260516;
      
      @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponent!: PagoDeDerechosComponent;
        /**
         * @property {PagoDerechosFormState} pagoDerechos
         * @description Estado actual del formulario de pago de derechos, obtenido del store del trámite.
         */
        public pagoDerechos!: PagoDerechosFormState;
    
        formularioDeshabilitado: boolean = true;
  
          /**
           * Validates the "pago de derechos" form when a button is clicked.
           *
           * Calls the pagoDeDerechosComponent.formularioSolicitudValidacion() helper
           * and returns true when that helper indicates the form is valid.
           *
           * @returns {boolean} True if the form is valid; otherwise false.
           *
           * @public
           * @compodoc
           *
           * @example
           * if (this.validOnButtonClick()) {
           *   // proceed with submission
           * } else {
           *   // handle validation errors
           * }
           */
          validOnButtonClick(): boolean {
            return (
            this.pagoDeDerechosComponent?.formularioSolicitudValidacion() ?? false
          );
          }
}

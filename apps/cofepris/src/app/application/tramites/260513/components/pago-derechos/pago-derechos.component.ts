import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';

/**
 * Componente que muestra la sección de Pago de Derechos.
 * Esta sección es común para todos los trámites.
 */
@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {
   idProcedimiento:number = 260513;
    
    @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponent!: PagoDeDerechosComponent;
      /**
       * @property {PagoDerechosFormState} pagoDerechos
       * @description Estado actual del formulario de pago de derechos, obtenido del store del trámite.
       */
      public pagoDerechos!: PagoDerechosFormState;
  
      formularioDeshabilitado: boolean = true;

       validarContenedor(): boolean {
    return (
      this.pagoDeDerechosComponent?.formularioSolicitudValidacion() ?? false
    );
  }
    
}

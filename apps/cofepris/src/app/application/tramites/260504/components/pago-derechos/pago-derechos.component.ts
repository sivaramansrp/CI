import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PagoDeDerechosBancoComponent } from '../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';

/**
 * Componente `PagoDerechosComponent`
 * 
 * Este componente es responsable de gestionar la interfaz de usuario para el pago de derechos.
 * Es un componente independiente (`standalone`) que utiliza el módulo común de Angular (`CommonModule`)
 * y el componente `PagoDeDerechosBancoComponent` para mostrar información relacionada con los pagos.
 */
@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosBancoComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {
  // Aquí puedes agregar propiedades, métodos y lógica adicional para el componente.
}

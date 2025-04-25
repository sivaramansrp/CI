import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PagoDeDerechosBancoComponent } from '../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';

/**
 * Componente `PagoDerechosComponent`.
 *
 * Este componente representa la sección de pago de derechos en la aplicación.
 * Es un componente independiente que utiliza el módulo común de Angular (`CommonModule`)
 * y el componente `PagoDeDerechosBancoComponent` para gestionar la funcionalidad relacionada
 * con los pagos.
 *
 * @selector app-pago-derechos
 * @templateUrl ./pago-derechos.component.html
 * @styleUrl ./pago-derechos.component.scss
 */
@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosBancoComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {}

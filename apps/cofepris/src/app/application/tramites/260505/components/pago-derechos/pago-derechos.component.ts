import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PagoDeDerechosBancoComponent } from '../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';

/**
 * Componente que muestra la sección de Pago de Derechos.
 * Esta sección es común para todos los trámites.
 */
@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosBancoComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {}

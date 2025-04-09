import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';

@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.css',
})
export class PagoDeDerechosContenedoraComponent {}

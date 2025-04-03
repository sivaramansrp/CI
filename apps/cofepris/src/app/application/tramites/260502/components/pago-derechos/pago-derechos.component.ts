import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosBancoComponent } from "../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component";

@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosBancoComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {}

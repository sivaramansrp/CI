import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aviso-de-renovacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aviso-de-renovacion.component.html',
  styleUrls: ['./aviso-de-renovacion.component.css'],
})
export class AvisoDeRenovacionComponent {
  /**
   * Lista de bancos disponibles.
   */
  bancos: string[] = ['Banco A', 'Banco B', 'Banco C'];

  /**
   * Datos del formulario de pago de derechos.
   */
  pagoDerechos = {
    claveReferencia: '',
    numeroOperacion: '',
    cadenaDependencia: '',
    banco: '',
    llavePago: '',
    fechaPago: '',
    importePago: '',
  };

  /**
   * Maneja el envío del formulario de pago de derechos.
   */
  submitPagoDerechos(): void {
    console.log('Datos de pago enviados:', this.pagoDerechos);
    // Aquí puedes agregar la lógica para enviar los datos al backend.
  }
}

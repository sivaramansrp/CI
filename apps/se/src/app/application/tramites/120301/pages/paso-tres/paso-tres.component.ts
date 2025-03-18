/**
 * @component PasoTresComponent
 * @description Este componente es responsable de manejar el tercer paso del trámite.
 * Incluye la lógica para obtener la firma y navegar a la página de acuse.
 * 
 * @import { Component, Input } from '@angular/core';
 * @import { Router } from '@angular/router';
 */

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {

  constructor(private router: Router) {
    // Constructor logic can be added here if needed
  }

  /**
   * @method obtieneFirma
   * @description Obtiene la firma y navega a la página de acuse si la firma es válida.
   * @param {string} ev - La firma obtenida.
   */
  obtieneFirma(ev: string) {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
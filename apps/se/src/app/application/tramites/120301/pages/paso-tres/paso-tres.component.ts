/**
 * @component PasoTresComponent
 * @description
 * Componente responsable de manejar el tercer paso del trámite 120301.
 * Incluye la lógica para obtener la firma y navegar a la página de acuse.
 *
 * @example
 * <app-paso-tres></app-paso-tres>
 *
 * @method obtieneFirma
 * @param {string} ev - La firma obtenida.
 * @description Obtiene la firma y navega a la página de acuse si la firma es válida.
 *
 * @see Router
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente para el paso tres del trámite 120301.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Obtiene la firma y navega a la página de acuse si la firma es válida.
   * @param {string} ev - La firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
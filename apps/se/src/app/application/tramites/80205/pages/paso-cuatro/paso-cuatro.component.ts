import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @fileoverview Componente para el cuarto paso del asistente.
 * Este componente maneja la lógica y la presentación del cuarto paso del asistente,
 * incluyendo la obtención de la firma y la navegación a la página de acuse.
 * @component PasoCuatroComponent --80205
 * @selector app-paso-cuatro
 * @templateUrl ./paso-cuatro.component.html
 */
@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
})
export class PasoCuatroComponent {
  /**
   * Constructor del componente.
   * @constructor
   * @param {Router} router - Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {}

  /**
   * Obtiene la firma y navega a la página de acuse si la firma es válida.
   * @method obtieneFirma
   * @param {string} ev - Evento que contiene la firma.
   */
  obtieneFirma(ev: string) {
    const firma: string = ev;
    if (firma) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
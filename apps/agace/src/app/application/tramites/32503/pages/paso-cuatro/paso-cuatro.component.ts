import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrl: './paso-cuatro.component.scss',
  standalone: true,
  imports: [CommonModule, FirmaElectronicaComponent],
})
export class PasoCuatroComponent {
  /**
   * @constructor
   * @description
   * Constructor que inyecta `Router` para la navegación.
   *
   * @param {Router} router - Servicio de Angular para manejar la navegación.
   * @access public
   */
  constructor(private router: Router) {
    // Constructor
  }

  /**
   * @method obtieneFirma
   * @description
   * Método que maneja la obtención de la firma electrónica.
   * Si la firma es válida, navega a la página de acuse.
   *
   * @param {string} ev - Evento que contiene la firma electrónica.
   * @returns {void}
   * @access public
   */
  obtieneFirma(ev: string): void {
    const FIRMA = ev;
    if (FIRMA) {
      this.router.navigate(['aviso-traslado/acuse']);
    }
  }
}
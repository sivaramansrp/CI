import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente para el paso tres del trámite 301.
 * Este componente se utiliza para mostrar el paso donde se solicita la firma electrónica.
 */
@Component({
  selector: 'paso-tres',
  standalone: true,
  templateUrl: './paso-tres.component.html',
  imports: [FirmaElectronicaComponent, CommonModule]
})
export class PasoTresComponent {
  /**
   * Constructor del componente.
   * @param router Servicio de Angular para la navegación entre rutas.
   */
  constructor(private router: Router) {}

  /**
   * Recibe la firma electrónica y redirige a la página de acuse si la firma es válida.
   * @param ev Cadena que representa la firma electrónica obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['temporal-contenedores/acuse']);
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente que representa el paso cuatro del trámite.
 * Gestiona la obtención de la firma y la navegación a la página de acuse.
 */
@Component({
  selector: 'paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrl: './paso-cuatro.component.scss'
})
export class PasoCuatroComponent {
  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento para navegar entre páginas.
   */
  constructor(private router: Router) {}

  /**
   * Método para manejar la obtención de la firma.
   * Si se recibe una firma válida, redirige a la página de acuse.
   * @param ev Firma recibida como cadena de texto.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']); // Navegación a la página de acuse
    }
  }
}

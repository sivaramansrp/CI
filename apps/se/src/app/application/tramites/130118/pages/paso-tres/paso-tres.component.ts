import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente para gestionar el paso tres del trámite.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento.
   */
  constructor(private router: Router) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
     * Maneja el evento para obtener la firma y realiza acciones adicionales.
     * @param ev - La cadena de texto que representa la firma obtenida.
     */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}

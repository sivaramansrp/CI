import { Component } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Componente que representa el segundo paso del formulario o asistente (wizard).
 * - selector: Etiqueta personalizada que se usará para incluir este componente en el HTML.
 * - templateUrl: Ruta al archivo de plantilla HTML correspondiente a este paso.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {
  /**
   * Constructor del componente.
   * @param router Router para la navegación.
   */
  constructor(private router: Router) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método para obtener la firma y navegar a la página de acuse.
   * @param ev Firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
// 130118

import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente que representa el segundo paso del formulario o asistente (wizard).
 * 
 * Este componente es el encargado de gestionar la segunda etapa del asistente de formulario. 
 * Permite a los usuarios completar un paso en el proceso y navegar a la siguiente etapa.
 * 
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
   * 
   * Este constructor se utiliza para la inyección de dependencias, en este caso el router
   * que permitirá la navegación a otras páginas de la aplicación.
   * 
   * @param router Router para la navegación.
   */
  constructor(private router: Router) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método para obtener la firma y navegar a la página de acuse.
   * 
   * Este método maneja la firma obtenida y, si es válida, redirige al usuario a la página de acuse.
   * 
   * @param ev Firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Si la firma es válida, navega a la página de acuse.
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }

}

import { Component } from '@angular/core';

/**
 * PasoCuatroComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
})
export class PasoCuatroComponent {

/**
  * Maneja el evento para obtener la firma y realiza acciones adicionales.
  * @param ev - La cadena de texto que representa la firma obtenida.
  * @return {void}
  */
  public obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
  }
}

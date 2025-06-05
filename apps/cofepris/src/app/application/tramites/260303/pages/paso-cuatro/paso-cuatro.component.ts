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

  // Variable para almacenar la firma obtenida
  public firma: string = '';
  
  /**
   * Método para actualizar la variable 'firma' con el valor recibido.
   * @param ev - Cadena de texto que representa la firma obtenida
   */
  public obtieneFirma(ev: string): void {
    this.firma = ev;
  }
}

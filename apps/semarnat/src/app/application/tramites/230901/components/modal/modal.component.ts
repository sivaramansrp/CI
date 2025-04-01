import { Component } from '@angular/core';

/**
 * Componente que representa un modal reutilizable en la aplicación.
 * Este componente se utiliza para mostrar contenido en una ventana emergente.
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'], // Fixed typo: changed `styleUrl` to `styleUrls`
})
export class ModalComponent {
  /**
   * Constructor del componente ModalComponent.
   * Actualmente no realiza ninguna acción.
   */
  constructor() {
    // No se realiza ninguna acción aquí.
  }
}
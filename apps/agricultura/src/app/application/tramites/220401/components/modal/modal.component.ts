import { Component, Input } from '@angular/core';

/**
 * Decorador que define el componente ModalComponent.
 * Este componente se utiliza para mostrar un modal en la aplicación.
 * 
 * @selector app-modal
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
   /**
   * Propiedad que indica si el modal está activo o no.
   * Esta propiedad se puede pasar desde un componente padre utilizando la decoración @Input.
   * 
   * @property {boolean} active
   * @default false
   */
 @Input() active = false;
}

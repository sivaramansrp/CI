import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-agregar-archivo',
  templateUrl: './agregar-archivo.component.html',
  styleUrl: './agregar-archivo.component.scss',
  standalone: true,
  imports: [],
})
export class AgregarArchivoComponent {
  @Input() label1: string = 'Carga por archivo'; 
  @Input() label2: string = 'Agregar'; 

  @Output() archivoAction = new EventEmitter<void>();  
  @Output() agregarAction = new EventEmitter<void>();


  /**
   * Handles the click event for the archivo (file) action.
   * Emits the archivoAction event.
   */
  onArchivoClick() {
    this.archivoAction.emit();
  }

  /**
   * @comdoc
   * Handles the click event for adding an item.
   * Emits the `agregarAction` event to notify parent components.
   */
  onAgregarClick() {
    this.agregarAction.emit();
  }
}

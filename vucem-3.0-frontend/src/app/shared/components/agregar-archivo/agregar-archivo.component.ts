import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'agregar-archivo',
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


  onArchivoClick() {
    this.archivoAction.emit();
  }

  onAgregarClick() {
    this.agregarAction.emit();
  }
}

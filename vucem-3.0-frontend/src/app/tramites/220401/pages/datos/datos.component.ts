import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { DatosDelComponent } from './datos-del/datos-del.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantalla-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss',
  standalone: true,
  imports: [
      CommonModule,
      SolicitudComponent,
      DatosDelComponent,
  ]
})
export class DatosComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}

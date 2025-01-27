import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { DatosDelComponent } from './datos-del/datos-del.component';
import { CommonModule } from '@angular/common';
import { CombinacionRequeridaComponent } from './combinacion-requerida/combinacion-requerida.component';
import { TercerosRelacionadosComponent } from './terceros-relacionados/terceros-relacionados.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pantalla-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss',
  standalone: true,
  imports: [
      CommonModule,
      SolicitudComponent,
      DatosDelComponent,
      CombinacionRequeridaComponent,
      TercerosRelacionadosComponent,
      ReactiveFormsModule
  ]
})
export class DatosComponent {
  indice: number = 4;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}

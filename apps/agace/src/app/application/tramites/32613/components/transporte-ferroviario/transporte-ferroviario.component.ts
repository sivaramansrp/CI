import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosComunesTresComponent } from '../../../../shared/components/datos-comunes-tres/datos-comunes-tres.component';
import { SeccionDinamica } from '@libs/shared/data-access-user/src/core/models/shared/seccion-dinamica.model';
import { SeccionDinamicaComponent } from '../../../../shared/components/seccion-dinamica/seccion-dinamica.component';

@Component({
  selector: 'app-transporte-ferroviario',
  standalone: true,
  imports: [
    CommonModule,
    SeccionDinamicaComponent,
    DatosComunesTresComponent
  ],
  templateUrl: './transporte-ferroviario.component.html',
  styleUrl: './transporte-ferroviario.component.scss',
})
export class TransporteFerroviarioComponent {
  public transporteSecciones: SeccionDinamica[] = [
    {
      titulo: 'Section 1',
      componentClase: DatosComunesTresComponent
    },
    {
      titulo: 'Section 2',
      componentClase: DatosComunesTresComponent
    }
  ];
}

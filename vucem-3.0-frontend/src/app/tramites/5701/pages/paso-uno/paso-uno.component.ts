import { Component } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { CommonModule } from '@angular/common';
import { ServiciosExtraordinariosModule } from '../../servicios-extraordinarios.module';
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  pasos: Array<string> = PASOS;
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}

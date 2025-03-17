import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { SolicitarDocumentosEvaluacionComponent } from '../solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';

@Component({
  selector: 'app-requerimiento-informacion',
  standalone: true,
  imports: [CommonModule, CapturarRequerimientoComponent, SolicitarDocumentosEvaluacionComponent],
  templateUrl: './requerimiento-informacion.component.html',
  styleUrl: './requerimiento-informacion.component.scss',
})
export class RequerimientoInformacionComponent {
/**
   * Índice de la pestaña seleccionada
   */
indice: number = 1;
 /**
   * Método para seleccionar la pestaña
   * @param i indica el número de la pestaña seleccionada
   */
 seleccionaTab(i: number): void {
  this.indice = i;
}

}

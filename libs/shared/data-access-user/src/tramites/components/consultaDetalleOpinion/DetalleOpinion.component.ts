import { BodyTablaOpinion, HeaderTablaOpinion } from '../../../core/models/shared/consulta-generica.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONSULTA_OPINIONES } from '../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-detalle-opinion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './DetalleOpinion.component.html',
  styleUrl: './DetalleOpinion.component.css',
})
export class DetalleOpinionComponent {
  solicitudForm!: FormGroup;
  opinionForm!: FormGroup;
    
  constructor(
      private fb: FormBuilder
    ) {
      // Componente para consulta de opinion
    }
    /**
     * Implementación para la tabla de opiniones.
     *
     */
    readonly encabezadoTablaOpiones : HeaderTablaOpinion[] = CONSULTA_OPINIONES.encabezadoTablaOpinion;  
    readonly datosTablaOpiniones: BodyTablaOpinion[] = CONSULTA_OPINIONES.datosTablaOpinion;

    /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfOpinion(url: string): void {
    window.open(url, '_blank');
  }
}
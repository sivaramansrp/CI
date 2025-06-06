
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AvisoComponent } from '../../components/aviso/aviso.component';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';

/**
 * Componente PasoUnoComponent
 * 
 * Este componente representa el primer paso de un flujo o formulario.
 * Incluye la lógica para cambiar entre pestañas o secciones mediante un índice.
 * 
 * Componentes utilizados:
 * - SolicitanteComponent: Componente que permite capturar o mostrar datos del solicitante.
 * - AvisoComponent: Componente que muestra avisos o notificaciones relevantes.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [CommonModule, SolicitanteComponent, AvisoComponent],
  standalone: true,
})
export class PasoUnoComponent {
    /**
   * Método para cambiar el índice actual.
   * Permite navegar entre diferentes pestañas o secciones.
   * 
   * @param i - Nuevo índice seleccionado.
   */
    indice: number = 1;

  /**
   * Índice actual del paso o pestaña seleccionada.
   * Se usa para mostrar u ocultar secciones del componente.
   */
   seleccionaTab(i: number): void {
    this.indice = i;
  }
}

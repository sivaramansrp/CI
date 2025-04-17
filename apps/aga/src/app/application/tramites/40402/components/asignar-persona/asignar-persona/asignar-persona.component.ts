import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonaFisicaComponent } from '../persona-fisica/persona-fisica.component';
import { PersonaMoralComponent } from '../persona-moral/persona-moral.component';

/**
 * Componente para asignar CAAT marítimo.
 */
@Component({
  selector: 'app-asignar-persona',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    PersonaFisicaComponent,
    PersonaMoralComponent,
  ],
  templateUrl: './asignar-persona.component.html',
  styleUrl: './asignar-persona.component.css',
})
export class AsignarPersonaComponent {
  /**
   * Cadena que representa el aviso de privacidad simplificado.
   * Este aviso es utilizado para informar a los usuarios sobre el manejo de sus datos personales.
   */
  // TEXTOS = EMPRESA_MARITIMA_REQUERIDA;

  /**
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  // infoAlert = 'alert-info';

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}

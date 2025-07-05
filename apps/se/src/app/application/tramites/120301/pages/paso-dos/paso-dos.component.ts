/**
 * Componente responsable de manejar el segundo paso del trámite 120301.
 * Incluye la lógica para obtener y gestionar los tipos de documentos y los documentos seleccionados.
 *
 * @example <app-paso-dos></app-paso-dos>
 *
 * @see TEXTOS
 */
import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

  /**
   * Constantes de textos utilizados en el componente.
   */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  /**
   * Constantes de textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;
}
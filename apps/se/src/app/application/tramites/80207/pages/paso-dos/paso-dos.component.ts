import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/texto.enum';


/**
 * @fileoverview Componente para la gestión del paso dos.
 * Este componente maneja la lógica y la presentación del segundo paso del proceso,
 * incluyendo la inicialización de textos y la gestión de los controles del formulario.
 * @module pasoDos --80207
 */

/**
 * Componente para la gestión del paso dos.
 * @class PasoDosComponent --80207
 */

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})

export class PasoDosComponent {
 /**
   * Textos de requisitos.
   * @property {string} TEXTOS
   */
  TEXTOS = TEXTOS_REQUISITOS;

}

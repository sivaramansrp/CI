import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

/**
 * @fileoverview Componente para el segundo paso del asistente.
 * Este componente maneja la lógica y la presentación del segundo paso del asistente.
 * @component PasoDosComponent --80205
 * @selector app-paso-dos
 * @templateUrl ./paso-dos.component.html
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {
  /**
   * Obtener el valor de la instrucción e inicializar la variable.
   * @property {any} TEXTOS
   */
  TEXTOS = TEXTOS;
}
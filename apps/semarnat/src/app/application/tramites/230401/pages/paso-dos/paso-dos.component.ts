/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../enum/pantallas-constante.enum';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {
  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS_REQUISITOS
   */
  TEXTOS = TEXTOS_REQUISITOS;
}

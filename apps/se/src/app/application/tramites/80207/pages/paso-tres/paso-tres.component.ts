import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from 'libs/shared/data-access-user/src/tramites/constantes/80207/texto.enum';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
 /**
   * Objeto con las instrucciones.
   * @property {string} TEXTOS - Instrucciones para el usuario. --80207
   */
  TEXTOS = TEXTOS_REQUISITOS.INSTRUCCIONES;
}

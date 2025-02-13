import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../../../shared/constantes/issuance-extension-modification.enum';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})
export class PasoDosComponent {
  /**
   * @property {object} TEXTOS_REQUISITOS - para definir un objeto a partir de archivos constantes. --220201
   */
  TEXTOS = TEXTOS_REQUISITOS;
}

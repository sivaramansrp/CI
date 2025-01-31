import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  /**
   * @property {object} TEXTOS - para definir un objeto a partir de archivos constantes. --220201
   */
  TEXTOS: object = TEXTOS;
}

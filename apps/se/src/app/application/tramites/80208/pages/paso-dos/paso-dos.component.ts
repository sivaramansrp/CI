
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/texto.enum';

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoDosComponent
 * @selector app-paso-dos
 * @templateUrl ./paso-dos.component.html
 * @styleUrls ./paso-dos.component.scss
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss']
})
export class PasoDosComponent {

  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS_REQUISITOS - Textos para los requisitos del certificado zoosanitario.
   */
  TEXTOS = TEXTOS_REQUISITOS;

}
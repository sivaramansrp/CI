import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/220202/fitosanitario.enums';

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
   * @property {object} TEXTOS_REQUISITOS - Textos para los requisitos del certificado zoosanitario. --220201
   */
  TEXTOS = TEXTOS_REQUISITOS;

}
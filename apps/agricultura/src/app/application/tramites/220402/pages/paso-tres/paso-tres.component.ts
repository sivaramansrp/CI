import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoTresComponent
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 * @styleUrls ./paso-tres.component.scss --220201
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
export class PasoTresComponent {

  /**
   * Objeto con las instrucciones.
   * @property {string} TEXTOS - Instrucciones para el usuario. --220201
   */
  TEXTOS: string = TEXTOS?.INSTRUCCIONES;

}
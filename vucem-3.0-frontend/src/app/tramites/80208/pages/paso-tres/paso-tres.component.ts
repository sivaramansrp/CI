import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoTresComponent
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 * @styleUrls ./paso-tres.component.scss 
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
export class PasoTresComponent {

  /**
   * Objeto con las instrucciones.
   * @property {string} TEXTOS - Instrucciones para el usuario. 
   */
  TEXTOS: string = TEXTOS?.INSTRUCCIONES;

}
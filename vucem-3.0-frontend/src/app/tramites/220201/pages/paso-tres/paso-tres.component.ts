import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220201
 * Establecer el índice del subtítulo
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  /**
   * @property {string} TEXTOS - para definir un objeto a partir de archivos constantes. --220201
   */
  TEXTOS: string = TEXTOS?.INSTRUCCIONES;
}

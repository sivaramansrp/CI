import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../../../shared/constantes/certificado-zoosanitario.enum';
/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220201
 * Establecer el índice del subtítulo
 */
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

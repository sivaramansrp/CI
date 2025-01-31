import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
/**
 * This component is shown in PasaDos
 */
@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  /**
   * Obtener el valor de la instrucción e inicializar la variable
   */
  TEXTOS = TEXTOS;

  constructor() {}

  ngOnInit() {}
}

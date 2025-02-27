import { Component } from '@angular/core';
import { TEXTOS } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';

/**
 * @fileoverview Componente para el tercer paso del asistente.
 * Este componente maneja la lógica y la presentación del tercer paso del asistente.
 * @component PasoTresComponent --80205
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 * @styleUrls ./paso-tres.component.scss
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  
})
export class PasoTresComponent {
  /**
   * Obtener el valor de la instrucción e inicializar la variable.
   * @property {any} TEXTOS
   */
  TEXTOS = TEXTOS;
}
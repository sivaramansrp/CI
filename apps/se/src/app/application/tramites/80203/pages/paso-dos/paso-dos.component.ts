/**
 * @component PasoDosComponent
 * @description Este componente es responsable de manejar el segundo paso del trámite.
 * Incluye la lógica para obtener y gestionar los tipos de documentos y los documentos seleccionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { TEXTOS } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
 */

import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
})
export class PasoDosComponent {
  /**
   * @property {any} TEXTOS - Constantes de textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;
}
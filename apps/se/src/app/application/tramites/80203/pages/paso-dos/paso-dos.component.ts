/**
 * @component PasoDosComponent
 * @description
 * Componente responsable de manejar el segundo paso del trámite IMMEX.
 * Este paso incluye la lógica para obtener y gestionar los tipos de documentos y los documentos seleccionados.
 *
 * @import { Component } from '@angular/core}
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
   * @property {any} TEXTOS
   * @description Constantes de textos utilizadas en el componente, relacionadas con los mensajes e instrucciones del trámite.
   */
  TEXTOS = TEXTOS;
}
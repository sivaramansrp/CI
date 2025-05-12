/**
 * @component PasoDosComponent
 * @description Este componente es responsable de manejar el segundo paso del trámite.
 * 
 * @import { Component } from '@angular/core';
 * @import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
 */

import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/prosec.module';


@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})
export class PasoDosComponent {

  /**
   * @property {any} TEXTOS - Constantes de textos utilizados en el componente.
   */
  TEXTOS = TEXTOS_REQUISITOS;

}
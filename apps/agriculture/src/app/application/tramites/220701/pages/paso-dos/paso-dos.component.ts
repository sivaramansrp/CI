/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable */
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
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { AlertComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { AnexarDocumentosComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component";

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
  standalone: true,
  imports: [TituloComponent, AlertComponent, AnexarDocumentosComponent]
})
export class PasoDosComponent {
  /**
   * @property {any} TEXTOS - Constantes de textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;
}
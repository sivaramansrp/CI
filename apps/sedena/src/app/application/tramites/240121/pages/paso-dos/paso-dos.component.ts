import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';
/**
 * @component PasoDosComponent
 * @description
 * Componente encargado de mostrar y gestionar la información correspondiente al paso dos del flujo del trámite.
 * Utiliza constantes definidas en el módulo de acceso a datos del usuario para mostrar textos estáticos en la plantilla.
 */
@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
})
export class PasoDosComponent {
  /**
   * @property {any} TEXTOS
   * @description
   * Constantes de textos utilizadas en la plantilla del componente.
   * Estas constantes pueden incluir títulos, descripciones, instrucciones, etc.
   *
   * @see TEXTOS desde @ng-mf/data-access-user
   */
  TEXTOS = TEXTOS;
}

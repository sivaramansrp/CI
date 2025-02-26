import { AlertComponent } from "@ng-mf/data-access-user";
import { Component } from '@angular/core';
import { TEXTO_REQUISITOS } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'app-requisitos-necesarios',
  templateUrl: './requisitos-necesarios.component.html',
  styleUrl: './requisitos-necesarios.component.scss',
  imports: [TituloComponent, AlertComponent],
  standalone: true,
})
export class RequisitosNecesariosComponent {

  /**
   * Objeto con las instrucciones.
   * @property {string} textConfig
   */
  textConfig = TEXTO_REQUISITOS;
}

import { AlertComponent } from "libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { AnexarDocumentosComponent } from "libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component";
import { Component } from '@angular/core';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { TEXTOS } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  standalone: true,
  imports: [TituloComponent, AlertComponent, AnexarDocumentosComponent],
})
export class PasoDosComponent {
  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS_REQUISITOS
   */
  TEXTOS = TEXTOS;
  

}
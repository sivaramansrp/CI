import { Component } from '@angular/core';
import { AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { TEXTOS_REQUISITOS } from '../../../220201/constantes/certificado-zoosanitario.enum';


@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [
    AnexarDocumentosComponent,
    TituloComponent,
    AlertComponent
  ],
  templateUrl: './PasoDos.component.html',
})
export class PasoDosComponent {
  /**
  * @property {any} TEXTOS
  * @description
  * Constantes de textos utilizados en el componente para mostrar los requisitos y mensajes de ayuda en el paso dos del trámite PROSEC.
  * Estos textos se obtienen desde el archivo de constantes y son utilizados en la plantilla para la visualización dinámica de la información.
  */
  TEXTOS = TEXTOS_REQUISITOS;
}

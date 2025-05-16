
/**
 * compo doc
 * @component PasoDosComponent
 * @description
*/
import { AlertComponent, AnexarDocumentosComponent, TEXTOS, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * @nombre PasoDosComponent
 * @descripcion Componente que representa el segundo paso de un proceso.
 * Este componente es independiente (standalone) y utiliza varios componentes compartidos.
 */
@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [
    CommonModule, 
    TituloComponent,
    AnexarDocumentosComponent, 
    AlertComponent,
  ],
  templateUrl: './paso-dos.component.html', 
})
export class PasoDosComponent {
  /**
   * @prop {any} TEXTOS - Contiene constantes de texto utilizadas en la UI.
   */
  TEXTOS = TEXTOS;
}

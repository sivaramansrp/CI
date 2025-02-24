import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { AnexarDocumentosComponent } from "../../../../shared/components/anexar-documentos/anexar-documentos.component";
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../../../shared/constantes/certificado-zoosanitario.enum';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";

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
  TEXTOS = TEXTOS_REQUISITOS;

}

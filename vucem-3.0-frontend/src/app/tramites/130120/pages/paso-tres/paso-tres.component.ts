import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { AnexarDocumentosComponent } from "../../../../shared/components/anexar-documentos/anexar-documentos.component";
import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
  standalone: true,
  imports: [TituloComponent, AlertComponent, AnexarDocumentosComponent],
})
export class PasoTresComponent {

  /**
   * Objeto con las instrucciones.
   * @property {string} TEXTOS
   */
  TEXTOS: string = TEXTOS?.INSTRUCCIONES;

}

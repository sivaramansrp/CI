import { AlertComponent } from "libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { AnexarDocumentosComponent } from "libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component";
import { Component } from '@angular/core';
import { TEXTOS } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

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
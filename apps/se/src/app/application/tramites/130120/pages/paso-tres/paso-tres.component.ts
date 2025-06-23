import { AlertComponent } from "@ng-mf/data-access-user";
import { AnexarDocumentosComponent } from "@ng-mf/data-access-user";
import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { TEXTOS } from '../../constants/permiso-importacion-modification.enum';
import { TituloComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
  standalone: true,
  imports: [CommonModule ,TituloComponent, AlertComponent, AnexarDocumentosComponent],
})
export class PasoTresComponent {

  /**
   * Objeto con las instrucciones.
   * @property {string} TEXTOS
   */
  TEXTOS: string = TEXTOS?.INSTRUCCIONES;

}
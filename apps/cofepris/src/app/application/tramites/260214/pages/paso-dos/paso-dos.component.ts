
import { AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constants/pasos.enum';


@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule,AlertComponent, TituloComponent, AnexarDocumentosComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.css',
})
export class PasoDosComponent {
    /**
   * Obtener el valor de la instrucción e inicializar la variable
   */
    TEXTOS = TEXTOS_REQUISITOS;
}

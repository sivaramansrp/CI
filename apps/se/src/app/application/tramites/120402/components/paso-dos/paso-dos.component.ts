import { AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule, AnexarDocumentosComponent, AlertComponent, TituloComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
   /**
     * Obtener el valor de la instrucción e inicializar la variable
     */
    TEXTOS = TEXTOS;
}

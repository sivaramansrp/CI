import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AlertComponent, AnexarDocumentosComponent, TEXTOS, TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule, AnexarDocumentosComponent, AlertComponent, TituloComponent],
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {
TEXTOS = TEXTOS;
}

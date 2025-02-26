import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from 'libs/shared/data-access-user/src/tramites/constantes/certificado-zoosanitario.enum';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  TEXTOS = TEXTOS_REQUISITOS;
}

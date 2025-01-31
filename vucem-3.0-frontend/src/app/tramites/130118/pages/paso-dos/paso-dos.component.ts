import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  TEXTOS = TEXTOS;
}

import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../../../shared/constantes/issuance-extension-modification.enum';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})
export class PasoDosComponent {
  TEXTOS = TEXTOS_REQUISITOS;

}

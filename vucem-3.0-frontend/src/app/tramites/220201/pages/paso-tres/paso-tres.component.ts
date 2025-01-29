import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  TEXTOS = TEXTOS;
}

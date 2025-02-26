import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from 'libs/shared/data-access-user/src/tramites/constantes/certificado-zoosanitario.enum';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  TEXOS = TEXTOS_REQUISITOS.ADJUNTAR;
}

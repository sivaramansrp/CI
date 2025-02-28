import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS_80202 } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  TEXOS = TEXTOS_REQUISITOS_80202.ADJUNTAR;
}

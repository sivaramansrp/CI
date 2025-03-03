import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
 
})
export class PasoTresComponent {
  TEXOS = TEXTOS.ADJUNTAR;
}

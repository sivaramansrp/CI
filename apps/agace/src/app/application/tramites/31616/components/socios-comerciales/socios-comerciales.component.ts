import { Component } from '@angular/core';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';

@Component({
  selector: 'app-socios-comerciales',
  standalone: true,
  imports: [InputRadioComponent],
  templateUrl: './socios-comerciales.component.html',
  styleUrl: './socios-comerciales.component.css'
})
export class SociosComercialesComponent {
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
}

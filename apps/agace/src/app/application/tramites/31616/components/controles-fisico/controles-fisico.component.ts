import { Component } from '@angular/core';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';

@Component({
  selector: 'app-controles-fisico',
  standalone: true,
  imports: [InputRadioComponent],
  templateUrl: './controles-fisico.component.html',
  styleUrl: './controles-fisico.component.css'
})
export class ControlesFisicoComponent {
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
}

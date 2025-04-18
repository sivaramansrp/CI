import { Component } from '@angular/core';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';

@Component({
  selector: 'app-seguridad-fisica',
  standalone: true,
  imports: [InputRadioComponent],
  templateUrl: './seguridad-fisica.component.html',
  styleUrl: './seguridad-fisica.component.css'
})
export class SeguridadFisicaComponent {

    opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

}

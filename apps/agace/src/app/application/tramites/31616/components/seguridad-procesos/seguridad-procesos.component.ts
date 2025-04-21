import { Component } from '@angular/core';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';


@Component({
  selector: 'app-seguridad-procesos',
  standalone: true,
  imports: [InputRadioComponent],
  templateUrl: './seguridad-procesos.component.html',
  styleUrl: './seguridad-procesos.component.css'
})
export class SeguridadProcesosComponent {
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
}

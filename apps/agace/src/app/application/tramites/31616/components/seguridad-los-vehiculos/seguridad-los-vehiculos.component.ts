import { Component } from '@angular/core';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';

@Component({
  selector: 'app-seguridad-los-vehiculos',
  standalone: true,
  imports: [InputRadioComponent],
  templateUrl: './seguridad-los-vehiculos.component.html',
  styleUrl: './seguridad-los-vehiculos.component.css',
})
export class SeguridadLosVehiculosComponent {
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
}

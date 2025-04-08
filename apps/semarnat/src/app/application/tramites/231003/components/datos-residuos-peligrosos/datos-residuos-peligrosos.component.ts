import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { RadioOpcion,SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model'
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';
const RADIO_OPCIONES = rawData as SolicitudJson;

@Component({
  selector: 'app-datos-residuos-peligrosos',
  standalone: true,
  imports: [CommonModule,
      TituloComponent,
      ReactiveFormsModule,InputRadioComponent],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.css',
})
export class DatosResiduosPeligrososComponent {
  datosResiduospPeligrosos!: FormGroup;

  radioOptions: RadioOpcion[] = RADIO_OPCIONES.radioOptions;
}

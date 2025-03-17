import {FormGroup,ReactiveFormsModule} from '@angular/forms';
import { Component } from '@angular/core';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-de-la-solicitude',
  standalone: true,
  imports: [TituloComponent,ReactiveFormsModule],
  templateUrl: './datos-de-la-solicitude.component.html',
  styleUrl: './datos-de-la-solicitude.component.scss'
})
export class DatosDeLaSolicitudeComponent {

    /**
     * Representa el formulario del componente.
     * Se espera que esta propiedad sea del tipo 'FormGroup'.
     *
     * @property {FormGroup} formulario - El formulario del componente.
     */
    public formulario!: FormGroup;

}

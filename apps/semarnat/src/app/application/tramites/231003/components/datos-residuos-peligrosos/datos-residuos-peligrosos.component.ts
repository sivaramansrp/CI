import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-residuos-peligrosos',
  standalone: true,
  imports: [CommonModule,
      TituloComponent,
      ReactiveFormsModule],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.css',
})
export class DatosResiduosPeligrososComponent {
  datosResiduospPeligrosos!: FormGroup;
}

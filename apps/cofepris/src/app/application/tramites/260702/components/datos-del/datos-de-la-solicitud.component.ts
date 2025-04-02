import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.css',
})
export class DatosdelasolicitudComponent {

  dataDeLaSolicitudForm!: FormGroup;

}

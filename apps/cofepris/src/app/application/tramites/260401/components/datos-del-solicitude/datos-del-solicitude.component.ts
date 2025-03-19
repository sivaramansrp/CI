import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PropietarioComponent } from '../propietario/propietario.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-del-solicitude',
  standalone: true,
  imports: [CommonModule,PropietarioComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './datos-del-solicitude.component.html',
  styleUrl: './datos-del-solicitude.component.scss',
})
export class DatosDelSolicitudeComponent {}

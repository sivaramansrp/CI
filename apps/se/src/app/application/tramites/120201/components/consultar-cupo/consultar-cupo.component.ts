import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-consultar-cupo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './consultar-cupo.component.html',
  styleUrl: './consultar-cupo.component.css',
})
export class ConsultarCupoComponent {}

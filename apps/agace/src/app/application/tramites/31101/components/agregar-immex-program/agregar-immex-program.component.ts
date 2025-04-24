import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-immex-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-immex-program.component.html',
  styleUrl: './agregar-immex-program.component.scss',
})
export class AgregarImmexProgramComponent {}

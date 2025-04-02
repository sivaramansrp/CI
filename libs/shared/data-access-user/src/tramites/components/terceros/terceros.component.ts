import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONSTANTES } from '../../../core/enums/constantes-alertas.enum';
import { CommonModule } from '@angular/common';
import { PersonaTerceros } from '../../../core/models/shared/datos-generales.model';
import { TituloComponent } from '../titulo/titulo.component';

@Component({
  selector: 'terceros',
  templateUrl: './terceros.component.html',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, FormsModule, TituloComponent],
  styleUrl: './terceros.component.scss',
})
export class TercerosComponent {
    @Input({required: true}) tabindex!: number;

  public FormPersona: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: [
      '',
      [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)],
    ],
  });

  personas: PersonaTerceros[] = [];


  constructor(
    private fb: FormBuilder,
  ) {}


  agregaPersona(): void {
    if (this.personas.length < 5 && this.FormPersona.valid) {
      const datos = this.FormPersona.value;
      this.personas.push(datos);
      this.FormPersona.reset();
    } else {
     // Lógica de inicialización si es necesario
    }
  }

  eliminar(i: number):void {
    this.personas.splice(i, 1);
  }
}

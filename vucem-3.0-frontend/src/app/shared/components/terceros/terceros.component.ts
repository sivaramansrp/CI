import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONSTANTES } from '../../constantes/servicios-extraordinarios.enum';
import { PersonaTerceros } from '../../../core/models/5701/servicios-extraordinarios.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TercerosComponent {
  @Input({ required: true }) tabindex!: number;

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
  ) { }


  agregaPersona(): void {
    if (this.personas.length < 5 && this.FormPersona.valid) {
      const datos = this.FormPersona.value;
      this.personas.push(datos);
      this.FormPersona.reset();
    } else {
      console.log(
        'No puede agregar mas de cinco personas o el formato de la dirección correo no es valido'
      );
    }
  }

  eliminar(i: number) {
    this.personas.splice(i, 1);
  }
}

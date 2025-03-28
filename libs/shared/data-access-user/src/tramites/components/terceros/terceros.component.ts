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

  /**
   * Agrega una persona al arreglo `personas` si el formulario es válido y hay menos de 5 personas.
   * Resetea el formulario después de agregar.
   * Si no se cumplen las condiciones, se dispara un modal de confirmación.
   *
   * @returns {void} No retorna ningún valor.
   */
  agregaPersona(): void {
    if (this.personas.length < 5 && this.FormPersona.valid) {
      const DATOS = this.FormPersona.value;
      this.personas.push(DATOS);
      this.FormPersona.reset();
    } else {
      // Aqui se dispara un modal de confirmacion
    }
  }

  /**
   * Elimina una persona de la lista en el índice especificado.
   * @param i - Índice de la persona a eliminar.
   * @returns void
   */
  eliminar(i: number): void {
    this.personas.splice(i, 1);
  }
}

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export const FECHA_INICIO = {
  labelNombre: 'Fecha inicial',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

@Component({
  selector: 'app-bandeja-pendientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent],
  templateUrl: './bandeja-pendientes.component.html',
  styleUrl: './bandeja-pendientes.component.scss',
})
export class BandejaPendientesComponent {

  public FormBusqueda!: FormGroup;
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  public fechaFinalInput: InputFecha = FECHA_FINAL;

  public constructor(
    protected readonly formBuilder: FormBuilder,
  ) {
    this.FormBusqueda = this.inicializaFormulario();
  }

  /**
   * Método para crear el formulario y sus campos
   * @returns Un form group con los campos necesarios
   */
  private inicializaFormulario(): FormGroup {
    const CAMPOS_FORMULARIO = {
      folio: [],
      fechaInicial: [],
      fechaFinal: [],
    };
    return this.formBuilder.group(CAMPOS_FORMULARIO);
  }

  public cambioFechaInicio(nuevo_valor: string) {
    this.FormBusqueda.get('fechaInicio')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaInicio')?.markAsUntouched();
  }

  public cambioFechaFinal(nuevo_valor: string) {
    this.FormBusqueda.get('fechaFinal')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaFinal')?.markAsUntouched();
  }
}

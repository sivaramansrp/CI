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
  templateUrl: './acuses-y-resoluciones.component.html',
  styleUrl: './acuses-y-resoluciones.component.scss',
})
export class AcusesYResolucionesComponent {

   public acusesYResolucionesFormGroup!: FormGroup;
    public fechaInicioInput: InputFecha = FECHA_INICIO;
    public fechaFinalInput: InputFecha = FECHA_FINAL;
  
    public constructor(
      protected readonly formBuilder: FormBuilder,
    ) {
      this.acusesYResolucionesFormGroup = this.inicializaFormulario();
    }
  
    /**
     * Método para crear el formulario y sus campos
     * @returns Un form group con los campos necesarios
     */
    private inicializaFormulario(): FormGroup {
      const CAMPUS_FORMULARIO = {
        folio: [],
        fechaInicial: [],
        fechaFinal: [],
      };
      return this.formBuilder.group(CAMPUS_FORMULARIO);
    }
  
    public cambioFechaInicio(nuevo_valor: string) {
      this.acusesYResolucionesFormGroup.get('fechaInicio')?.setValue(nuevo_valor);
      this.acusesYResolucionesFormGroup.get('fechaInicio')?.markAsUntouched();
    }
  
    public cambioFechaFinal(nuevo_valor: string) {
      this.acusesYResolucionesFormGroup.get('fechaFinal')?.setValue(nuevo_valor);
      this.acusesYResolucionesFormGroup.get('fechaFinal')?.markAsUntouched();
    }

}

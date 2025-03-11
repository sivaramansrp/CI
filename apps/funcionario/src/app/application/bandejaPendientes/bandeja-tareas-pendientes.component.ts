import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputFecha, InputFechaComponent } from "@ng-mf/data-access-user";

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
  selector: 'app-bandeja-tareas-pendientes',
  templateUrl: './bandeja-tareas-pendientes.component.html',
  styleUrl: './bandeja-tareas-pendientes.component.scss',
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent],
  standalone: true,
})
export class BandejaTareasPendientesComponent {

  public FormBusqueda!: FormGroup;
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  public fechaFinalInput: InputFecha = FECHA_FINAL;
  
  public readonly tareasPendientesList = [
    {
      tbodyData: ['--','--','--','--','--'],
    }
  ];

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
    const camposFomulario = {
      folio: [],
      fechaInicial: [],
      fechaFinal: [],
    };
    return this.formBuilder.group(camposFomulario);
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

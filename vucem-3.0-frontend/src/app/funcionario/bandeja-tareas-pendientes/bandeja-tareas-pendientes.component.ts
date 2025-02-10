import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { InputFecha } from '../../core/models/shared/components.model';

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
  templateUrl: './bandeja-tareas-pendientes.component.html',
  styleUrl: './bandeja-tareas-pendientes.component.scss'
})
export class BandejaTareasPendientesComponent {

  public FormBusqueda!: FormGroup;
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  public fechaFinalInput: InputFecha = FECHA_FINAL;
  
  public readonly tableColumns: string[] = [
    'Folio trámite',
    'Tipo de trámite',
    'Nombre de la tarea',
    'Fecha de asignación',
    'Estado de trámite',
  ];

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

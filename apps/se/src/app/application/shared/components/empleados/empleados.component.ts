import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import {
  DIRECTOS,
  FECHA_DE_CEDULA,
  FECHA_DE_FIRMA,
  FECHA_FIN_VIGENCIA,
} from '../../constants/empleados.enum';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {
  empleadosForm!: FormGroup;
  disableRazonSocial: boolean = true;
  cedulasOptions = [];
  directosTablaSeleccion = TablaSeleccion.CHECKBOX;
  directosEncabezado = DIRECTOS;
  directosDatos = [];
  fetchaDeCedula = FECHA_DE_CEDULA;
  fetchaDeFirma = FECHA_DE_FIRMA;
  fetchaFinVigencia = FECHA_FIN_VIGENCIA;
  constructor(public fb: FormBuilder) {
    this.createEmpleadosForm();
  }

  createEmpleadosForm(): void {
    this.empleadosForm = this.fb.group({
      totalDeEmpleados: [''],
      directos: [''],
      cedulaDeCuotas: [''],
      fechaDeCedula: [''],
      indirectos: [''],
      contrato: [''],
      objetoDelContratoDelServicio: [''],
      fechaFirma: [''],
      fechaFinVigencia: [''],
      rfc: [''],
      razonSocial: [''],
    });
  }
}

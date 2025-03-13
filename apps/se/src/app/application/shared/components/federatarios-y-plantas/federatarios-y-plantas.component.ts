import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  AlertComponent,
  CatalogoSelectComponent,
  InputFechaComponent,
} from '@ng-mf/data-access-user';
import { FECHA_DE_PAGO } from '../../enum/federatarios-y-plantas.enum';
import { InputFecha } from '@ng-mf/data-access-user';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import {
  FederatariosEncabezado,
  FederatariosYPlantasConfiguration,
} from '../../models/federatarios-y-plantas.model';

@Component({
  selector: 'app-federatarios-y-plantas',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    AlertComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    FormsModule,
  ],
  templateUrl: './federatarios-y-plantas.component.html',
  styleUrl: './federatarios-y-plantas.component.css',
})
export class FederatariosYPlantasComponent {
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  estadoOptions: [] = [];

  //
  @Input() federatariosDatos: FederatariosEncabezado[] = [];

  @Input()
  federatariosConfig!: FederatariosYPlantasConfiguration<FederatariosEncabezado>;

  public federatariosFormGroup!: FormGroup;

  constructor() {
    this.initFederatariosFormGroup();
  }
  initFederatariosFormGroup(): void {
    this.federatariosFormGroup = new FormGroup({
      nombre: new FormControl('', Validators.required),
      fechaInicioInput: new FormControl(''),
      primerApellido: new FormControl(''),
      segundoApellido: new FormControl(''),
      numeroDeActa: new FormControl(''),
      numeroDeNotaria: new FormControl(''),
      estado: new FormControl(''),
      estadoOptions: new FormControl(''),
    });
  }
}

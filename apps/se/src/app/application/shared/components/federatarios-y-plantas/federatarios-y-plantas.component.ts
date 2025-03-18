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
  PlantasDisponibles,
  PlantasImmex,
  TEXTO_DE_ALERTA,
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
  styleUrl: './federatarios-y-plantas.component.scss',
})
export class FederatariosYPlantasComponent {
  @Input()
  federatariosConfig!: FederatariosYPlantasConfiguration<FederatariosEncabezado>;
  @Input()
  plantasDisponiblesConfig!: FederatariosYPlantasConfiguration<PlantasDisponibles>;
  @Input() plantasImmexConfig!: FederatariosYPlantasConfiguration<PlantasImmex>;

  @Input() federatariosDatos!: FederatariosEncabezado[];

  @Input() plantasDisponiblesDatos!: PlantasDisponibles[];
  @Input() plantasImmexDatos!: PlantasImmex[];

  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  estadoOptions: [] = [];

  public textodAlerta = TEXTO_DE_ALERTA;
  //

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

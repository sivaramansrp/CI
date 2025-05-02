import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  INFORMACION_DESCRPCION_CUPO,
  INPUT_FECHA_FIN_CUPO,
  INPUT_FECHA_INICIO_CUPO,
} from '../../constantes/expedicion-certificados-frontera.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-descripcion-cupo',
  standalone: true,
  imports: [
    TituloComponent,
    InputFechaComponent,
    ReactiveFormsModule,
    FormasDinamicasComponent,
  ],
  templateUrl: './descripcion-cupo.component.html',
  styleUrl: './descripcion-cupo.component.scss',
})
export class DescripcionCupoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  FECHA_INICIO_CUPO = INPUT_FECHA_INICIO_CUPO;
  FECHA_FIN_CUPO = INPUT_FECHA_FIN_CUPO;
  public informacionFormData = INFORMACION_DESCRPCION_CUPO;
  public descripcionCupoForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    //
  }

  ngOnInit(): void {
    this.establecerDescripcionCupoFormGroup();
  }

  establecerDescripcionCupoFormGroup(): void {
    this.descripcionCupoForm = this.fb.group({
      regimenAduanero: new FormControl({ value: '', disabled: true }),
      descripcionProducto: new FormControl({ value: '', disabled: true }),
      clasificacionSubProducto: new FormControl({ value: '', disabled: true }),
      unidadMedida:new FormControl({ value: '', disabled: true }),
      fechaInicioCupo: new FormControl({ value: '', disabled: true }),
      fechaFinCupo: new FormControl({ value: '', disabled: true }),
      mecanismoAsignacion: new FormControl({ value: '', disabled: true }),
      tratadoAcuerdo:new FormControl({ value: '', disabled: true }),
      fraccionesArancelarias: new FormControl({ value: '', disabled: true }),
      paises: new FormControl({ value: '', disabled: true }),
      observaciones: new FormControl({ value: '', disabled: true }),
      fundamento:new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

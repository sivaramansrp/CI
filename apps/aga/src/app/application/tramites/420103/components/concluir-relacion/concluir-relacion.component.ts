import {
  AlertComponent,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrosslistComponent,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TableComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';
import { DATOS_CONCLUIR_RELACION } from '../../constantes/concluir-relacion.enum';
import { DetallesDelMercancia } from '@libs/shared/data-access-user/src/core/models/420103/concluir-relacion.model';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-concluir-relacion',
  templateUrl: './concluir-relacion.component.html',
  styleUrls: ['./concluir-relacion.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    TableComponent,
    AlertComponent,
    CrosslistComponent,
    InputRadioComponent,
    FormsModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputFechaComponent
  ],
})
export class ConcluirRelacionComponent implements OnInit, OnDestroy {


  concluirRelacionForm!: FormGroup;


  TablaSeleccion = TablaSeleccion;


  configuracionTablaDatos: DetallesDelMercancia[] = [];

  configuracionTabla: ConfiguracionColumna<DetallesDelMercancia>[] = [
    {
      encabezado: DATOS_CONCLUIR_RELACION.REGISTRO_FEDERAL,
      clave: (item: DetallesDelMercancia) => item.registroFederal,
      orden: 1,
    },
    {
      encabezado: DATOS_CONCLUIR_RELACION.DENOMINACION_RAZON_SOCIAL,
      clave: (item: DetallesDelMercancia) => item.denominacionRazonSocial,
      orden: 2,
    },
    {
      encabezado: DATOS_CONCLUIR_RELACION.NORMA,
      clave: (item: DetallesDelMercancia) => item.norma,
      orden: 3,
    },
    {
      encabezado: DATOS_CONCLUIR_RELACION.FECHA_INICIO_RELACION,
      clave: (item: DetallesDelMercancia) => item.fechaInicioRelacion,
      orden: 4,
    },

  ];


  configuracionFechaInicial: InputFecha = {
    labelNombre: 'Fecha inicial',
    required: false,
    habilitado: false,
  };
  configuracionfechaFinal: InputFecha = {
    labelNombre: 'Fecha inicial',
    required: false,
    habilitado: false,
  };



  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(

    private fb: FormBuilder,
    private concluirRelacionService: ConcluirRelacionService,
  ) {

  }

  fecha: FormControl = new FormControl('');

  ngOnInit(): void {
    this.concluirRelacion();
  }

  concluirRelacion(): void {
    this.concluirRelacionForm = this.fb.group({
      rfc: new FormControl(''),
      fechaInicial: new FormControl(''),
      fechaFinal: new FormControl(''),
    });
  }

  buscarConcluirRelacionDatos(): void {
    this.concluirRelacionService
      .getDetallesDelMercanciaDatos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos: DetallesDelMercancia) => {
        this.configuracionTablaDatos = [datos];
      });
  }

  onFechaFinVigenciaChange(date: string): void {
    this.concluirRelacionForm.patchValue({
      fechaInicioVigencia: date,
    });
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

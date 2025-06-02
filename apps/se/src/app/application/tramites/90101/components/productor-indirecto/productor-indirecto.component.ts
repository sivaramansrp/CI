/**
 * @component ProductorIndirectoComponent
 * @description Este componente es responsable de manejar los datos del productor indirecto.
 * Incluye la lógica para obtener y gestionar los datos del productor, así como los catálogos relacionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup } from '@angular/forms';
 * @import { PRODUCTORCOLUMNS } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
 * @import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
 */

import { AutorizacionProsecStore, ProsecState } from '../../estados/autorizacion-prosec.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { CommonModule } from '@angular/common';
import { FilaProductos } from '../../models/prosec.module';
import { ProsecService } from '../../services/prosec.service';
import { TablaSeleccion } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-productor-indirecto',
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ProductorIndirectoComponent implements OnInit, OnDestroy {

  /**
   * @property {FormGroup} productorIndirecto - El grupo de formularios para capturar los datos del productor indirecto.
   */
  productorIndirecto!: FormGroup;

  TablaSeleccion = TablaSeleccion;
  
  productorDato: FilaProductos[] = [];

  esFormularioSoloLectura: boolean = false;

  productorColumnsConfiguracion : ConfiguracionColumna<FilaProductos>[] = [
    { encabezado: 'Registro federal de contribuyentes', 
      clave: (fila) => fila.contribuyentes, 
      orden: 1 },
    {
      encabezado: 'Denominación o razón social',
      clave: (fila) => fila.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Correo',
      clave: (fila) => fila.Correo,
      orden: 3,
    },
  ];
  
  private destroyNotifier$: Subject<void> = new Subject();

  private productorState!: ProsecState

  constructor(
    private readonly fb: FormBuilder, 
    private ProsecService: ProsecService,
    private AutorizacionProsecStore: AutorizacionProsecStore,
    private AUtorizacionProsecQuery: AUtorizacionProsecQuery,
     private consultaQuery: ConsultaioQuery
  ) {
    this.productorIndirecto = this.fb.group({
      contribuyentes: [''],
    });
  }

  ngOnInit(): void {
    this.AUtorizacionProsecQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.productorState = state as ProsecState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.recuperarDatos();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
        }
      )
    ).subscribe();
  }

  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.productorIndirecto.disable();
    }
    else {
      this.productorIndirecto.enable();
    } 
  }

  initActionFormBuild(): void {
    this.productorIndirecto = this.fb.group({
      contribuyentes: [
        this.productorState.contribuyentes
      ]
    })
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof AutorizacionProsecStore
  ): void {
    const VALOR = form.get(campo)?.value as unknown;
    (this.AutorizacionProsecStore[metodoNombre] as (value: unknown) => void)(
      VALOR
    );
  }

  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('productor.json').subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.productorDato = response as FilaProductos[];
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
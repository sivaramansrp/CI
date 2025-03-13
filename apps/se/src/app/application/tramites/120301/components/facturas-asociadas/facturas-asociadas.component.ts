/**
 * @component formularioAsociacionFactura
 * @description Este componente es responsable de manejar las facturas asociadas.
 * Incluye un formulario para capturar los datos de las facturas y tablas para mostrar las facturas disponibles y asociadas.
 * 
 * @import { Component, OnInit } from '@angular/core';
 * @import { CommonModule } from '@angular/common';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
 * @import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 */

import { AsociadasTableColumns, CapturarColumns } from '../../models/elegibilidad-de-textiles.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElegibilidadDeTextilesStore, TextilesState } from '../../estados/elegibilidad-de-textiles.store';

import { 
  ConfiguracionColumna, 

  SeccionLibQuery,

  SeccionLibState, 

  SeccionLibStore, 

  TablaDinamicaComponent, 

  TablaSeleccion
 } from '@ng-mf/data-access-user';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject,delay, map, takeUntil,tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-facturas-asociadas',
  templateUrl: './facturas-asociadas.component.html',
  styleUrls: ['./facturas-asociadas.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TableComponent,
    TablaDinamicaComponent
  ]
})
export class FormularioAsociacionFacturaComponent implements OnInit, OnDestroy {
  
  formularioAsociacionFactura!: FormGroup;
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para los datos del certificado de registro.
   */
  ConstanciaDelRegistro!: FormGroup;

  private destroyNotifier$: Subject<void> = new Subject();
  
  private facturasState!: TextilesState;
  
  private seccionState!: SeccionLibState

  TablaSeleccion = TablaSeleccion;

  /**
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
   */
  tableColumns: ConfiguracionColumna<CapturarColumns>[] = [
        { encabezado: 'Número de la factura', 
          clave: (fila) => fila.NumeroDeLaFactura, 
          orden: 1 },
        {
          encabezado: 'Razón social',
          clave: (fila) => fila.RazonSocial,
          orden: 2,
        },
        {
          encabezado: 'Domicilio',
          clave: (fila) => fila.Domicilio,
          orden: 3,
        },
        {
          encabezado: 'Fecha de expedición de la factura',
          clave: (fila) => fila.FechaExpedicionFactura,
          orden: 4,
        },
        {
          encabezado: 'Cantidad total',
          clave: (fila) => fila.CantidadTotal,
          orden: 5,
        },
        {
          encabezado: 'Cantidad disponible',
          clave: (fila) => fila.CantidadDisponible,
          orden: 6,
        },
        {
          encabezado: 'Unidad de medida',
          clave: (fila) => fila.UnidadMedida,
          orden: 7,
        },
        {
          encabezado: 'Valor en dólares',
          clave: (fila) => fila.ValorDolares,
          orden: 8,
        },
      ];

  /**
   * @property {string[]} asociadastableColumns - Array de encabezados de columnas de la tabla de facturas asociadas.
   */

  asociadastableColumns: ConfiguracionColumna<AsociadasTableColumns>[] = [
    { 
      encabezado: 'Candidad asociada', 
      clave: (fila) => fila.CandidadAsociada, 
      orden: 1 
    },
    { 
      encabezado: 'Número de la factura', 
      clave: (fila) => fila.NumeroDeLaFactura, 
      orden: 2 
    },
    {
      encabezado: 'Razón social',
      clave: (fila) => fila.RazonSocial,
      orden: 3,
    },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.Domicilio,
      orden: 4,
    },
    {
      encabezado: 'Fecha de expedición de la factura',
      clave: (fila) => fila.FechaExpedicionFactura,
      orden: 5,
    },
    {
      encabezado: 'Cantidad total',
      clave: (fila) => fila.CantidadTotal,
      orden: 6,
    },
    {
      encabezado: 'Cantidad disponible',
      clave: (fila) => fila.CantidadDisponible,
      orden: 7,
    },
  ];

  /**
   * @property {any[]} facturasDisponible - Array de datos de facturas disponibles.
   */
  facturasDisponible: CapturarColumns[] = [];

  /**
   * @property {any[]} facturasAsociadas - Array de datos de facturas asociadas.
   */
  facturasAsociadas: AsociadasTableColumns[] = [];

  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private elegibilidadTextilesService: ElegibilidadTextilesService
  ) {
    // Constructor logic can be added here if needed
   }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de las facturas.
   */
  ngOnInit(): void {
    
    this.seccionQuery.selectSeccionState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.seccionState = seccionState;
            })
          )
          .subscribe();
        this.ElegibilidadDeTextilesQuery.selectTextile$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((state) => {
              this.facturasState = state as TextilesState;
            })
          )
          .subscribe();
          this.initActionFormBuild();
          this.recuperarDatos();
          this.recuperarDatosAsociadas();

    this.formularioAsociacionFactura.statusChanges
          .pipe(
            takeUntil(this.destroyNotifier$),
            delay(10),
            tap((_value) => {
              if (this.formularioAsociacionFactura.valid) {
                this.ElegibilidadDeTextilesStore.setFormaValida([
                  ...this.facturasState.formaValida,
                  { id: 1, descripcion: "Valida" }])
              }
            })
          )
          .subscribe();
      this.seccionStore.establecerFormaValida([false]);
      if(this.facturasState.formaValida && this.facturasState.formaValida[0] && this.facturasState.formaValida[0].descripcion === 'AllValida'){
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([true])
      }
      else{
        this.seccionStore.establecerFormaValida([false]);
      }
  }
  initActionFormBuild(): void {
    this.formularioAsociacionFactura = this.fb.group({
      cantidadFacturas: [this.facturasState.cantidadFacturas, [Validators.required]],
    });
  }

  /**
   * @method fetchData
   * @description Obtiene los datos de las facturas disponibles y asociadas desde el servicio.
   */
  recuperarDatos(): void {
    this.elegibilidadTextilesService.obtenerTablaDatos<CapturarColumns>('facturasDisponible.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (response) => {
          this.facturasDisponible = response as CapturarColumns[]
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }}
    );
  }
  recuperarDatosAsociadas(): void {
    this.elegibilidadTextilesService.obtenerTablaDatos<AsociadasTableColumns>('facturas-asociadas.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (response) => {
          this.facturasAsociadas = response as AsociadasTableColumns[]
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }}
    );
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ElegibilidadDeTextilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }

  /**
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
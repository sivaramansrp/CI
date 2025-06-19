/**
 * @component FormularioAsociacionFacturaComponent
 * @description Este componente es responsable de manejar las facturas asociadas.
 * Incluye un formulario para capturar los datos de las facturas y tablas para mostrar las facturas disponibles y asociadas.
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject, delay, map, takeUntil, tap } from 'rxjs';

import {
  ConfiguracionColumna,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import { VALIDO } from '../../constantes/elegibilidad-de-textiles.enums';

import {
  AsociadasTableColumns,
  CapturarColumns,
} from '../../models/elegibilidad-de-textiles.model';

import {
  ElegibilidadDeTextilesStore,
  TextilesState,
} from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';


@Component({
  selector: 'app-facturas-asociadas',
  templateUrl: './facturas-asociadas.component.html',
  styleUrls: ['./facturas-asociadas.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
})
export class FormularioAsociacionFacturaComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input()
  formularioDeshabilitado: boolean = false;
  /**
   * @property {FormGroup} formularioAsociacionFactura - El grupo de formularios para capturar los datos de las facturas asociadas.
   */
  formularioAsociacionFactura!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para los datos del certificado de registro.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {Subject<void>} destroyNotifier$ - Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} facturasState - Estado actual de las facturas.
   */
  private facturasState!: TextilesState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {TablaSeleccion} TablaSeleccion - Configuración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @property {ConfiguracionColumna<CapturarColumns>[]} tableColumns - Configuración de las columnas de la tabla de facturas disponibles.
   */
  tableColumns: ConfiguracionColumna<CapturarColumns>[] = [
    {
      encabezado: 'Número de la factura',
      clave: (fila) => fila.numeroDeLaFactura,
      orden: 1,
    },
    {
      encabezado: 'Razón social',
      clave: (fila) => fila.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.domicilio,
      orden: 3,
    },
    {
      encabezado: 'Fecha de expedición de la factura',
      clave: (fila) => fila.fechaExpedicionFactura,
      orden: 4,
    },
    {
      encabezado: 'Cantidad total',
      clave: (fila) => fila.cantidadTotal,
      orden: 5,
    },
    {
      encabezado: 'Cantidad disponible',
      clave: (fila) => fila.cantidadDisponible,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (fila) => fila.unidadMedida,
      orden: 7,
    },
    {
      encabezado: 'Valor en dólares',
      clave: (fila) => fila.valorDolares,
      orden: 8,
    },
  ];

  /**
   * @property {ConfiguracionColumna<AsociadasTableColumns>[]} asociadastableColumns - Configuración de las columnas de la tabla de facturas asociadas.
   */
  asociadastableColumns: ConfiguracionColumna<AsociadasTableColumns>[] = [
    {
      encabezado: 'Candidad asociada',
      clave: (fila) => fila.candidadAsociada,
      orden: 1,
    },
    {
      encabezado: 'Número de la factura',
      clave: (fila) => fila.numeroDeLaFactura,
      orden: 2,
    },
    {
      encabezado: 'Razón social',
      clave: (fila) => fila.razonSocial,
      orden: 3,
    },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.domicilio,
      orden: 4,
    },
    {
      encabezado: 'Fecha de expedición de la factura',
      clave: (fila) => fila.fechaExpedicionFactura,
      orden: 5,
    },
    {
      encabezado: 'Cantidad total',
      clave: (fila) => fila.cantidadTotal,
      orden: 6,
    },
    {
      encabezado: 'Cantidad disponible',
      clave: (fila) => fila.cantidadDisponible,
      orden: 7,
    },
  ];

  /**
   * @property {CapturarColumns[]} facturasDisponible - Array de datos de facturas disponibles.
   */
  facturasDisponible: CapturarColumns[] = [];

  /**
   * @property {AsociadasTableColumns[]} facturasAsociadas - Array de datos de facturas asociadas.
   */
  facturasAsociadas: AsociadasTableColumns[] = [];

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store para manejar el estado de elegibilidad de textiles.
   * @param {ElegibilidadDeTextilesQuery} ElegibilidadDeTextilesQuery - Query para consultar el estado de elegibilidad de textiles.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar el estado de la sección.
   * @param {ElegibilidadTextilesService} elegibilidadTextilesService - Servicio para manejar la lógica de elegibilidad de textiles.
   */
  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private elegibilidadTextilesService: ElegibilidadTextilesService
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
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
              { id: 1, descripcion: 'Valida' },
            ]);
          }
        })
      )
      .subscribe();
    this.seccionStore.establecerFormaValida([false]);
    if (
      this.facturasState.formaValida &&
      this.facturasState.formaValida[0] &&
      this.facturasState.formaValida[0].descripcion === VALIDO
    ) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    } else {
      this.seccionStore.establecerFormaValida([false]);
    }
    if (this.formularioDeshabilitado) {
      this.formularioAsociacionFactura.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos de las facturas asociadas.
   */
  initActionFormBuild(): void {
    this.formularioAsociacionFactura = this.fb.group({
      cantidadFacturas: [
        this.facturasState.cantidadFacturas,
        [Validators.required],
      ],
      cantidadFacturasTotal: [
        { value: this.facturasState.cantidadFacturasTotal, disabled: true },
      ],
      metrosCuadradosEquivalentes: [
        {
          value: this.facturasState.metrosCuadradosEquivalentes,
          disabled: true,
        },
      ],
    });
  }

  /**
   * @method recuperarDatos
   * @description Obtiene los datos de las facturas disponibles desde el servicio.
   */
  recuperarDatos(): void {
    this.elegibilidadTextilesService
      .obtenerTablaDatos<CapturarColumns>('facturasDisponible.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          this.facturasDisponible = response as CapturarColumns[];
        },
      });
  }

  /**
   * @method recuperarDatosAsociadas
   * @description Obtiene los datos de las facturas asociadas desde el servicio.
   */
  recuperarDatosAsociadas(): void {
    this.elegibilidadTextilesService
      .obtenerTablaDatos<AsociadasTableColumns>('facturas-asociadas.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          this.facturasAsociadas = response as AsociadasTableColumns[];
        },
      });
  }

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo.
   * @param {keyof ElegibilidadDeTextilesStore} metodoNombre - El método del store a invocar.
   */
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
   * @method ngOnDestroy
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
